const express = require("express");
const connectRabbitMq = require("./config/rabbitmq");
require("dotenv/config");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

connectRabbitMq();

app.listen(PORT, () => {
  console.log(`API-Gateway listening on port ${PORT}`);
});
