const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// --- Routage vers le Menu Service (Port 3002) ---
app.use(createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathFilter: ['/menu', '/order', '/orders', '/menu-health'],
  pathRewrite: { '^/menu-health': '/health' }
}));

// --- Routage vers le Wallet Service (Port 3001) ---
app.use(createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathFilter: ['/add-solde', '/wallet-health'],
  pathRewrite: { '^/wallet-health': '/health' }
}));

app.get('/', (req, res) => {
  res.send('API Gateway en ligne sur le port 3000 !');
});

app.listen(PORT, () => {
  console.log(`[API Gateway] running on http://localhost:${PORT}`);
});
