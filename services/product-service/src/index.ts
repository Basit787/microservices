import "dotenv/config";
import express from "express";
import { router } from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT as string;

app.get("/", (req, res) => {
  res.json({ message: "Hi from products" });
});

app.use("/product", router);

app.listen(PORT, () => {
  console.log(`Product-Service listening on port ${PORT}`);
});
