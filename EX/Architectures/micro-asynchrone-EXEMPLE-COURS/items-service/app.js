const express = require("express");
const routes = require("./routes");
const { initKafka } = require("./kafka");

const app = express();
app.use(express.json());

app.use("/", routes);

const PORT = 3002;
app.listen(PORT, async () => {
  await initKafka();
  console.log(`[Items Service] running on port ${PORT} (Async/Kafka)`);
});
