const kafka = require("../shared/kafka");
const { Partitioners } = require('kafkajs');
const db = require("./database");

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'players-group' });

async function initKafka() {
  const admin = kafka.admin();
  await admin.connect();
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

  await consumer.subscribe({ topic: 'order.item_reserved', fromBeginning: false });
  await consumer.subscribe({ topic: 'order.item_failed', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log(`[Players Service] Reçu event: ${topic}`, data);

      if (topic === 'order.item_reserved') {
        const { orderId, playerId, itemId, price } = data;
        const player = db.prepare('SELECT * FROM players WHERE id = ?').get(playerId);

        if (player && player.gems >= price) {
          // Paiement réussi
          db.prepare('UPDATE players SET gems = gems - ? WHERE id = ?').run(price, playerId);
          db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('SUCCESS', orderId);

          await producer.send({
            topic: 'order.payment_completed',
            messages: [{ value: JSON.stringify({ orderId, itemId }) }]
          });
          console.log(`[Players Service] Achat ${orderId} validé avec succès.`);
        } else {
          // Fonds insuffisants
          db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('FAILED_INSUFFICIENT_FUNDS', orderId);
          await producer.send({
            topic: 'order.payment_failed',
            messages: [{ value: JSON.stringify({ orderId, itemId, reason: 'Fonds insuffisants' }) }]
          });
          console.log(`[Players Service] Achat ${orderId} échoué : Fonds insuffisants.`);
        }
      }

      // Si order.item_failed, on met à jour le statut de la commande générée
      if (topic === 'order.item_failed') {
        const { orderId, reason } = data;
        db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(`FAILED_${reason}`, orderId);
        console.log(`[Players Service] Achat ${orderId} échoué : ${reason}`);
      }
    },
  });
}

module.exports = { initKafka, producer };
