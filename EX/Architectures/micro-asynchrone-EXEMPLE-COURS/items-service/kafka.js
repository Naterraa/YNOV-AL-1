const kafka = require("../shared/kafka");
const { Partitioners } = require('kafkajs');
const db = require("./database");

// le service est à la fois producteur et consommateur (inter services)
// On crée une paritionLegacy car on a pas de clé d'envoi : Legacy Partitioner distribute les messages de manière séquentielle sur les partitions.
// On a besoin d'un groupId pour grouper les consumers.
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'items-group' });

async function initKafka() {
  // admin pour créer les topics
  const admin = kafka.admin();
  await admin.connect();

  // Les topics utiles
  await admin.createTopics({
    topics: [
      { topic: 'order.created' },
      { topic: 'order.item_reserved' },
      { topic: 'order.item_failed' },
      { topic: 'order.payment_completed' },
      { topic: 'order.payment_failed' }
    ]
  });
  await admin.disconnect();

  await producer.connect();
  await consumer.connect();

  // ce micro service écoute : 
  // - order.created : pour réserver un objet
  // - order.payment_failed : pour annuler une réservation
  // fromBeginning: false : on ne veut pas recevoir les messages qui ont été envoyés avant que le consumer démarre.
  await consumer.subscribe({ topic: 'order.created', fromBeginning: false });
  await consumer.subscribe({ topic: 'order.payment_failed', fromBeginning: false });

  // pour chaque message reçu
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`[Items Service] Reçu event: ${topic}`, data);

      // Si order.created, on réserve un objet
      if (topic === 'order.created') {
        const { orderId, playerId, itemId } = data;

        // Utilisation d'une transaction pour vérifier et réserver le stock
        const reserveItem = db.transaction((id) => {
          const item = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
          if (!item) throw new Error('ITEM_NOT_FOUND');
          if (item.stock <= 0) throw new Error('OUT_OF_STOCK');

          db.prepare('UPDATE items SET stock = stock - 1 WHERE id = ?').run(id);
          return item;
        });

        try {
          const item = reserveItem(itemId);
          // envoie d'un message à order.item_reserved pour que le joueur puisse payer
          // il sera capté par players-service qui est à l'écoute de ce topic
          await producer.send({
            topic: 'order.item_reserved',
            messages: [{ value: JSON.stringify({ orderId, playerId, itemId, price: item.price }) }]
          });
          console.log(`[Items Service] Réservation de l'objet ${itemId} réussie pour l'ordre ${orderId}.`);
        } catch (error) {
          await producer.send({
            topic: 'order.item_failed',
            messages: [{ value: JSON.stringify({ orderId, reason: error.message }) }]
          });
          console.log(`[Items Service] Réservation échouée pour l'ordre ${orderId}: ${error.message}`);
        }
      }

      if (topic === 'order.payment_failed') {
        // Rollback (Saga Compensation) : le joueur n'avait pas assez d'argent, on remet le stock
        const { itemId, orderId } = data;
        db.prepare('UPDATE items SET stock = stock + 1 WHERE id = ?').run(itemId);
        console.log(`[Items Service] Rollback: objet ${itemId} restocké suite à l'échec de paiement pour ${orderId}.`);
      }
    },
  });
}

module.exports = { initKafka, producer };
