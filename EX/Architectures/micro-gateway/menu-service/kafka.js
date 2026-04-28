const kafka = require("../shared/kafka");
const { Partitioners } = require('kafkajs');
const db = require("./db");

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'menu-group' });

async function initKafka() {
  const admin = kafka.admin();
  await admin.connect();
  
  // Création de tous les topics nécessaires pour la Saga
  await admin.createTopics({
    topics: [
      { topic: 'order.item_reserved' },   // Émis par Menu Service quand le plat est mis de côté
      { topic: 'order.payment_completed' }, // Émis par Wallet Service quand le paiement réussit
      { topic: 'order.payment_failed' }     // Émis par Wallet Service quand le solde est insuffisant
    ]
  });
  await admin.disconnect();

  await producer.connect();
  await consumer.connect();
  
  // SAGA - ETAPE 3 : Le Menu Service écoute les réponses du Wallet Service
  await consumer.subscribe({ topic: 'order.payment_completed', fromBeginning: false });
  await consumer.subscribe({ topic: 'order.payment_failed', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`[Menu Service] Reçu event Kafka: ${topic}`, data);

      if (topic === 'order.payment_completed') {
        const { orderId } = data;
        
        // SAGA - SUCCÈS : Le paiement est validé, on passe la commande en SUCCESS.
        // Le stock a déjà été décrémenté à l'étape 1, donc on n'a rien de plus à faire.
        db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('SUCCESS', orderId);
        console.log(`[Menu Service] SAGA TERMINEE : Commande ${orderId} validée avec succès.`);
      }

      if (topic === 'order.payment_failed') {
        const { orderId, menuId, reason } = data;
        
        // SAGA - COMPENSATION : Le paiement a échoué (ex: pas assez d'argent).
        // Il faut annuler notre réservation de l'étape 1 en remettant le plat en stock !
        db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(`FAILED_${reason}`, orderId);
        db.prepare('UPDATE menus SET stock = stock + 1 WHERE id = ?').run(menuId);
        
        console.log(`[Menu Service] SAGA COMPENSATION : Paiement échoué pour la commande ${orderId}. Restockage du plat ${menuId}.`);
      }
    },
  });
}

module.exports = { initKafka, producer };
