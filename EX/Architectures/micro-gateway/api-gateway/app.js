const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// On ne parse pas le body JSON ici (app.use(express.json())), 
// car le proxy doit faire passer le flux de requêtes brut (raw stream)
// vers les microservices en dessous qui s'occuperont de le parser.

// --- Routage vers le Menu Service (Port 3002) ---
app.use(
  ['/menu', '/order', '/orders'], // pour ces routes envoie au menu-service
  createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true  // change l'origine de la requete : envoie localhost:3002 au lieu de localhost:3000
  })
);

// --- Routage vers le Wallet Service (Port 3001) ---
app.use(
  '/add-solde', // pour cette route envoie au wallet-service
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
  })
);

// Route d'accueil / Health Check de l'API Gateway
app.get('/', (req, res) => {
  res.send('API Gateway en ligne sur le port 3000 !');
});

app.listen(PORT, () => {
  console.log(`[API Gateway] running on http://localhost:${PORT}`);
  console.log(` -> /menu, /order, /orders redirigés vers le Menu Service (3002)`);
  console.log(` -> /add-solde redirigé vers le Wallet Service (3001)`);
});
