import express from "express";
import connectRabbitmq from "./config/rabbitmq.js";
import { sendQueue } from "./lib/rabbitmq.js";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

connectRabbitmq();

app.post("/product", async (req, res) => {
  const product = req.body;
  await sendQueue("PRODUCT_QUEUE", product);

  res.json({ message: "Product added and event sent to queue", product });
});

app.listen(PORT, () => {
  console.log(`Product-Service listening on port ${PORT}`);
});
