import express from "express";
import connectRabbitMq from "./config/rabbitmq.js";
import ENV from "./lib/env.js";

const app = express();
app.use(express.json());

await connectRabbitMq();

app.listen(ENV.PORT, () => {
  console.log(`API-Gateway listening on port ${ENV.PORT}`);
});
