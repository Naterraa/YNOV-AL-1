const express = require("express");
const axios = require("axios");
const db = require("./db");
const CircuitBreaker = require("opossum");

const app = express();
app.use(express.json());

const WALLET_SERVICE_URL = "http://localhost:3001";

const circuitBreakerOptions = {
  timeout: 3000, // Si la requête prend plus de 3s, échec
  errorThresholdPercentage: 50, // Ouvre le circuit après 50% d'échecs
  resetTimeout: 10000 // Attendre 10s avant de retenter (demi-ouvert)
};

// Fonction qui fait l'appel HTTP vers wallet-service
const debitWallet = async (userId, amount) => {
  return await axios.post(`${WALLET_SERVICE_URL}/debit`, { userId, amount });
};
// circuit breaker pour gérer les erreurs de wallet-service
// essai 3 fois avant d'ouvrir le circuit
// si le circuit est ouvert, on bloque les requêtes pendant 10s
const debitWalletBreaker = new CircuitBreaker(debitWallet, circuitBreakerOptions);

// Logs optionnels pour voir l'état du circuit
debitWalletBreaker.on('open', () => console.log(`[CircuitBreaker] debitWallet: OPEN`));
debitWalletBreaker.on('halfOpen', () => console.log(`[CircuitBreaker] debitWallet: HALF-OPEN`));
debitWalletBreaker.on('close', () => console.log(`[CircuitBreaker] debitWallet: CLOSED`));

app.get("/menu", (req, res) => {
  try {
    const menus = db.prepare('SELECT * FROM menus').all();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/order", async (req, res) => {
  const { userId, menuId } = req.body;

  if (!userId || !menuId) {
    return res.status(400).json({ error: "userId et menuId sont requis" });
  }

  try {
    // 1. Vérifier le produit localement
    const menu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId);
    if (!menu) {
      return res.status(404).json({ error: "Plat non trouvé" });
    }

    if (menu.stock <= 0) {
      return res.status(400).json({ error: "Plat en rupture de stock" });
    }

    // 2. Appeler le wallet-service pour tenter de débiter l'étudiant via Circuit Breaker
    try {
      await debitWalletBreaker.fire(userId, menu.price);
    } catch (err) {
      // Gérer les erreurs spécifiques renvoyées par le wallet-service (400 ou 404)
      if (err.response) {
        if (err.response.status === 404) {
          return res.status(404).json({ error: "Utilisateur non trouvé (Wallet Service)" });
        }
        if (err.response.status === 400) {
          return res.status(400).json({ error: "Solde insuffisant (Wallet Service)" });
        }
      }
      return res.status(500).json({ error: "Erreur de communication avec le Wallet Service : " + err.message });
    }

    // 3. Si le débit réussit, décrémenter le stock et confirmer la commande
    db.prepare('UPDATE menus SET stock = stock - 1 WHERE id = ?').run(menuId);
    db.prepare('INSERT INTO orders (userId, menuId) VALUES (?, ?)').run(userId, menuId);

    const updatedMenu = db.prepare('SELECT * FROM menus WHERE id = ?').get(menuId);

    res.json({
      success: true,
      message: "Commande réussie",
      purchasedMenu: menu.name,
      remainingStock: updatedMenu.stock
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`[Menu Service] running on port ${PORT}`);
});
