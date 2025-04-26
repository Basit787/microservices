import "dotenv/config";
import express from "express";
import connectRabbitMq from "./config/rabbitmq.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

connectRabbitMq();

app.listen(PORT, () => {
  console.log(`API-Gateway listening on port ${PORT}`);
});
