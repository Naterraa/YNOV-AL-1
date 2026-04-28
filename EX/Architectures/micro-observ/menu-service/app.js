const express = require("express");
const routes = require("./routes");
const { initKafka } = require("./kafka");

const { attachLogger } = require("../shared/middleware");

const app = express();
app.use(express.json());
app.use(attachLogger);

app.use("/", routes);

const PORT = 3002;

// Initialiser Kafka avant de démarrer le serveur
initKafka().then(() => {
  app.listen(PORT, () => {
    console.log(`[Menu Service] running on port ${PORT}`);
  });
}).catch(console.error);
