import express from "express";
import connectRabbitMq from "./config/rabbitmq.js";
import { PORT } from "./lib/env.js";

const app = express();
app.use(express.json());

await connectRabbitMq();

app.listen(PORT, () => {
  console.log(`API-Gateway listening on port ${PORT}`);
});
