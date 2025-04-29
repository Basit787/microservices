import "dotenv/config";
import express from "express";
import connectRabbitmq from "./config/rabbitmq.js";
import { router } from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT as string;

connectRabbitmq();

app.use("/users", router);

app.listen(PORT, () => {
  console.log(`User-Service listening on port ${PORT}`);
});
