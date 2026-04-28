const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./database");
const { producer } = require("./kafka");

const router = express.Router();

router.post("/more-gemmes", (req, res) => {
  const { playerId, amount } = req.body;
  if (!playerId || amount === undefined) {
    return res.status(400).json({ error: "playerId et amount sont requis" });
  }

  const info = db.prepare('UPDATE players SET gems = gems + ? WHERE id = ?').run(amount, playerId);
  if (info.changes === 0) return res.status(404).json({ error: "Joueur non trouvé" });

  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(playerId);
  res.json({ success: true, message: `${amount} gemmes ajoutées`, newBalance: player.gems });
});

// Achat asynchrone (Choreography avec Kafka)
router.post("/buy", async (req, res) => {
  const { playerId, itemId } = req.body;

  const player = db.prepare('SELECT * FROM players WHERE id = ?').get(playerId);
  if (!player) return res.status(404).json({ error: "Joueur non trouvé" });

  const orderId = uuidv4();
  db.prepare('INSERT INTO orders (id, playerId, itemId, status) VALUES (?, ?, ?, ?)').run(orderId, playerId, itemId, 'PENDING');

  // Émission de l'événement vers Kafka
  await producer.send({
    topic: 'order.created',
    messages: [{ value: JSON.stringify({ orderId, playerId, itemId }) }]
  });

  // Réponse immédiate au client (le reste se fait en asynchrone)
  res.status(202).json({
    message: "Demande d'achat prise en compte.",
    orderId,
    status: 'PENDING',
    checkUrl: `/orders/${orderId}`
  });
});

router.get("/orders/:id", (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: "Commande non trouvée" });
  res.json(order);
});

module.exports = router;
