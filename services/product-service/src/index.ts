import "dotenv/config";
import express from "express";
import { router } from "./routes/product.routes.js";
import connectRabbitmq from "./config/rabbitmq.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT as string;

connectRabbitmq();

app.use("/product", router);

app.listen(PORT, () => {
  console.log(`Product-Service listening on port ${PORT}`);
});
