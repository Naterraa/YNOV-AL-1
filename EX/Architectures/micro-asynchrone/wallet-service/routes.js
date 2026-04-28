const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/add-solde", (req, res) => {
  const { userId, solde } = req.body;
  
  if (!userId || solde === undefined) {
    return res.status(400).json({ error: "userId et solde sont requis" });
  }

  const info = db.prepare('UPDATE users SET solde = solde + ? WHERE id = ?').run(solde, userId);
  
  if (info.changes === 0) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  res.json({ success: true, message: `Solde ajouté`, newBalance: user.solde });
});

module.exports = router;
