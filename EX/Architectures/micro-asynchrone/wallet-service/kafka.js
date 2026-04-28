const kafka = require("../shared/kafka");
const { Partitioners } = require('kafkajs');
const db = require("./db");

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'wallet-group' });

async function initKafka() {
  await producer.connect();
  await consumer.connect();
  
  // SAGA - ETAPE 2 : Le Wallet Service écoute la réservation du menu
  await consumer.subscribe({ topic: 'order.item_reserved', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`[Wallet Service] Reçu event Kafka: ${topic}`, data);

      if (topic === 'order.item_reserved') {
        const { orderId, userId, menuId, price } = data;
        
        // Transaction SQLite pour vérifier de façon sûre le solde et le déduire
        const processPayment = db.transaction((id, amount) => {
          const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
          
          if (!user) {
            throw new Error('USER_NOT_FOUND');
          }
          if (user.solde < amount) {
            throw new Error('INSUFFICIENT_FUNDS');
          }
          
          // Déduction du solde
          db.prepare('UPDATE users SET solde = solde - ? WHERE id = ?').run(amount, id);
          return user;
        });

        try {
          // Tentative de paiement
          processPayment(userId, price);
          
          // SAGA - SUCCÈS : Si on arrive ici, l'argent a été débité. On avertit le Menu Service.
          await producer.send({
            topic: 'order.payment_completed',
            messages: [{ value: JSON.stringify({ orderId, menuId }) }]
          });
          console.log(`[Wallet Service] Paiement réussi pour la commande ${orderId}.`);
          
        } catch (error) {
          // SAGA - ÉCHEC : L'utilisateur n'existe pas ou n'a pas assez d'argent.
          // On avertit le Menu Service pour qu'il annule la réservation (compensation).
          await producer.send({
            topic: 'order.payment_failed',
            messages: [{ value: JSON.stringify({ orderId, menuId, reason: error.message }) }]
          });
          console.log(`[Wallet Service] Paiement refusé pour la commande ${orderId} : ${error.message}`);
        }
      }
    },
  });
}

module.exports = { initKafka, producer };
