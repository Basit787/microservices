import express from "express";
import { router } from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import ENV from "./lib/env.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.all("/", (req, res) => {
  res.json({ message: "Hi from products" });
});

app.use("/product", router);

app.listen(ENV.PORT!, () => {
  console.log(`Product-Service listening on port ${ENV.PORT!}`);
});
