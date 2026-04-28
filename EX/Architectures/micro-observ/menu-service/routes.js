const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");
const { producer } = require("./kafka");

const router = express.Router();

router.get("/health", (req, res) => {
  try {
    db.prepare('SELECT 1').get();
    req.log.info("Health check OK");
    res.json({ status: "OK", service: "menu-service", db: "connected" });
  } catch (error) {
    req.log.error("Health check failed", { error: error.message });
    res.status(500).json({ status: "ERROR", service: "menu-service", error: error.message });
  }
});

// Affiche les plats
router.get("/menu", (req, res) => {
  const menus = db.prepare('SELECT * FROM menus').all();
  req.log.info("Récupération de tous les menus");
  res.json(menus);
});

// Achat asynchrone (Choreography Saga avec Kafka)
router.post("/order", async (req, res) => {
  const { userId, menuId } = req.body;
  req.log.info(`Demande de commande reçue: utilisateur ${userId}, plat ${menuId}`);

  if (!userId || !menuId) {
    req.log.warn("Tentative de commande invalide : champs manquants");
    return res.status(400).json({ error: "userId et menuId sont requis" });
  }

  // Vérifier le produit localement
  const menu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId);
  if (!menu) {
    req.log.warn(`Commande refusée : Plat ${menuId} non trouvé`);
    return res.status(404).json({ error: "Plat non trouvé" });
  }

  if (menu.stock <= 0) {
    req.log.warn(`Commande refusée : Plat ${menuId} en rupture de stock`);
    return res.status(400).json({ error: "Plat en rupture de stock" });
  }

  const orderId = uuidv4();

  // SAGA - ETAPE 1 : 
  // On réserve le plat IMMÉDIATEMENT localement (pour éviter qu'un autre l'achète entre temps)
  db.prepare('UPDATE menus SET stock = stock - 1 WHERE id = ?').run(menuId);
  db.prepare('INSERT INTO orders (id, userId, menuId, status) VALUES (?, ?, ?, ?)').run(orderId, userId, menuId, 'PENDING');

  // Émission de l'événement vers Kafka pour prévenir le Wallet Service de prélever l'argent
  await producer.send({
    topic: 'order.item_reserved',
    messages: [
      { 
        value: JSON.stringify({ orderId, userId, menuId, price: menu.price }),
        headers: { 'x-correlation-id': req.correlationId } 
      }
    ]
  });

  req.log.info(`SAGA ETAPE 1 : Plat ${menuId} réservé pour order ${orderId}. Evénement envoyé.`);

  // Réponse immédiate au client (le reste se fait en asynchrone via Kafka)
  res.status(202).json({
    message: "Commande en cours de traitement asynchrone.",
    orderId,
    status: 'PENDING',
    checkUrl: `/orders/${orderId}`
  });
});

// Permet de consulter l'état de la commande asynchrone
router.get("/orders/:id", (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) {
    req.log.warn(`Consultation de commande : ${req.params.id} non trouvée`);
    return res.status(404).json({ error: "Commande non trouvée" });
  }
  req.log.info(`Consultation de commande : ${req.params.id}`);
  res.json(order);
});

module.exports = router;
