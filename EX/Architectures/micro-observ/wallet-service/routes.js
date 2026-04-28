const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/health", (req, res) => {
  try {
    db.prepare('SELECT 1').get();
    req.log.info("Health check OK");
    res.json({ status: "OK", service: "wallet-service", db: "connected" });
  } catch (error) {
    req.log.error("Health check failed", { error: error.message });
    res.status(500).json({ status: "ERROR", service: "wallet-service", error: error.message });
  }
});

router.post("/add-solde", (req, res) => {
  const { userId, solde } = req.body;
  
  if (!userId || solde === undefined) {
    req.log.warn("Tentative d'ajout de solde invalide");
    return res.status(400).json({ error: "userId et solde sont requis" });
  }

  const info = db.prepare('UPDATE users SET solde = solde + ? WHERE id = ?').run(solde, userId);
  
  if (info.changes === 0) {
    req.log.warn(`Ajout refusé : Utilisateur ${userId} non trouvé`);
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  req.log.info(`${solde} ajoutés au solde de l'utilisateur ${userId}`);
  res.json({ success: true, message: `Solde ajouté`, newBalance: user.solde });
});

module.exports = router;
