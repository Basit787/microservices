import "dotenv/config";
import express from "express";
import { router } from "./routes/product.routes.js";
import connectRabbitmq from "./config/rabbitmq.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT as string;

connectRabbitmq();

app.use("/product", router);

app.listen(PORT, () => {
  console.log(`Product-Service listening on port ${PORT}`);
});
