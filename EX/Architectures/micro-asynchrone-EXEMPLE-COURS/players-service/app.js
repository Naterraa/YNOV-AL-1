const express = require("express");
const routes = require("./routes");
const { initKafka } = require("./kafka");

const app = express();
app.use(express.json());

app.use("/", routes);

const PORT = 3001;
app.listen(PORT, async () => {
  await initKafka();
  console.log(`[Players Service] running on port ${PORT} (Async/Kafka)`);
});
