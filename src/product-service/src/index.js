import "dotenv/config";
import express from "express";
import connectRabbitmq from "./config/rabbitmq.js";
import { router } from "./routes/product.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

connectRabbitmq();

app.use("/product", router);

app.listen(PORT, () => {
  console.log(`Product-Service listening on port ${PORT}`);
});
