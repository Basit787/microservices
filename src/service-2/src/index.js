const express = require("express");
const { sendQueue } = require("../../constants/rabbitmq");
const connectRabbitmq = require("./config/rabbitmq");
require("dotenv/config");

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
