import "dotenv/config";
import express from "express";
import connectRabbitmq from "./config/rabbitmq.js";
import { router } from "./routes/users.routes.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT as string;

connectRabbitmq();

app.use("/users", router);

app.listen(PORT, () => {
  console.log(`User-Service listening on port ${PORT}`);
});
