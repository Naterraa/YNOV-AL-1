const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { v4: uuidv4 } = require('uuid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// ============================================================
// SWAGGER - Configuration de la documentation de l'API
// ============================================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cantine - Gateway',
      version: '1.0.0',
      description: `Documentation de l'API Gateway de la Cantine.
      
Ce gateway centralise toutes les requêtes vers les microservices :
- **Menu Service** (port 3002) : gestion des plats et des commandes
- **Wallet Service** (port 3001) : gestion du solde des utilisateurs

Les commandes suivent un pattern **Saga Asynchrone** via Kafka.
Un **Correlation ID** est automatiquement généré pour chaque requête et propagé à travers tous les services.`
    },
    servers: [{ url: 'http://localhost:3000', description: 'API Gateway (local)' }],
    tags: [
      { name: 'Menu', description: 'Gestion des plats du menu' },
      { name: 'Commandes', description: 'Gestion des commandes (Saga Kafka)' },
      { name: 'Wallet', description: 'Gestion du solde utilisateur' },
      { name: 'Health', description: 'Vérification de l\'état des services' }
    ]
  },
  // On documente les routes directement ici dans ce fichier
  apis: ['./api-gateway/app.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour l'interface graphique Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'API Cantine - Docs'
}));

// ============================================================
// MIDDLEWARE - Correlation ID
// ============================================================

// Pour chaque requête, on génère un correlation ID unique
// Ce même ID sera transmis à tous les microservices pour tracer la requête
app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// ============================================================
// ROUTES - Proxy vers les microservices
// ============================================================

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
  res.json({
    message: 'API Gateway Cantine en ligne !',
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.listen(PORT, () => {
  console.log(`[API Gateway] running on http://localhost:${PORT}`);
  console.log(`[API Gateway] Swagger docs: http://localhost:${PORT}/api-docs`);
});

// ============================================================
// SWAGGER JSDoc - Définition des routes (annotations)
// ============================================================

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Récupérer la liste des plats
 *     description: Retourne tous les plats disponibles au menu avec leur stock et leur prix.
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Liste des plats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Poulet rôti"
 *                   price:
 *                     type: number
 *                     example: 8.50
 *                   stock:
 *                     type: integer
 *                     example: 10
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Passer une commande (Asynchrone - Saga Kafka)
 *     description: |
 *       Lance une commande de repas. La réponse est **immédiate (202 Accepted)** mais le traitement est asynchrone.
 *       
 *       **Flux de la Saga :**
 *       1. Le Menu Service réserve le plat et émet `order.item_reserved` vers Kafka.
 *       2. Le Wallet Service débite le solde et émet `order.payment_completed` (ou `order.payment_failed`).
 *       3. Le Menu Service met à jour le statut final de la commande.
 *       
 *       Utilisez `GET /orders/{id}` pour suivre l'avancement.
 *     tags: [Commandes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, menuId]
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'utilisateur qui commande
 *                 example: 1
 *               menuId:
 *                 type: integer
 *                 description: ID du plat à commander
 *                 example: 1
 *     responses:
 *       202:
 *         description: Commande acceptée et en cours de traitement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Commande en cours de traitement asynchrone."
 *                 orderId:
 *                   type: string
 *                   example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *                 status:
 *                   type: string
 *                   example: "PENDING"
 *                 checkUrl:
 *                   type: string
 *                   example: "/orders/a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *       400:
 *         description: Paramètres manquants ou plat en rupture de stock
 *       404:
 *         description: Plat non trouvé
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Vérifier le statut d'une commande
 *     description: Retourne l'état actuel d'une commande asynchrone.
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la commande
 *         example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *     responses:
 *       200:
 *         description: Détails de la commande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 menuId:
 *                   type: integer
 *                   example: 1
 *                 status:
 *                   type: string
 *                   enum: [PENDING, SUCCESS, FAILED_INSUFFICIENT_FUNDS, FAILED_USER_NOT_FOUND]
 *                   example: "SUCCESS"
 *       404:
 *         description: Commande non trouvée
 */

/**
 * @swagger
 * /add-solde:
 *   post:
 *     summary: Ajouter du solde à un utilisateur
 *     description: Crédite le compte d'un utilisateur pour lui permettre de passer des commandes.
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, solde]
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID de l'utilisateur à créditer
 *                 example: 1
 *               solde:
 *                 type: number
 *                 description: Montant à ajouter au solde
 *                 example: 20.00
 *     responses:
 *       200:
 *         description: Solde mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Solde ajouté"
 *                 newBalance:
 *                   type: number
 *                   example: 45.50
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /menu-health:
 *   get:
 *     summary: Vérifier l'état du Menu Service
 *     description: Vérifie que le Menu Service et sa base de données SQLite sont opérationnels.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service en bonne santé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 service:
 *                   type: string
 *                   example: "menu-service"
 *                 db:
 *                   type: string
 *                   example: "connected"
 *       500:
 *         description: Service en erreur
 */

/**
 * @swagger
 * /wallet-health:
 *   get:
 *     summary: Vérifier l'état du Wallet Service
 *     description: Vérifie que le Wallet Service et sa base de données SQLite sont opérationnels.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service en bonne santé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 service:
 *                   type: string
 *                   example: "wallet-service"
 *                 db:
 *                   type: string
 *                   example: "connected"
 *       500:
 *         description: Service en erreur
 */
