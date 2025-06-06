import express from "express";
import { router } from "./routes/index.routes.js";
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
  res.json({ message: "Hi from users" });
});

app.use("/api", router);

app.listen(ENV.PORT, () => {
  console.log(`User-Service listening on port ${ENV.PORT}`);
});
