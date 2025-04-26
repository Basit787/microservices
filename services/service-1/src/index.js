const express = require("express");
const connectRabbitmq = require("./config/rabbitmq");
const { sendQueue } = require("../../constants/rabbitmq");
require("dotenv/config");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

connectRabbitmq();

app.post("/register", async (req, res) => {
  const user = req.body;
  await sendQueue("USER_QUEUE", user);
  res.json({ message: "User registered and event sent to queue", user });
});

app.listen(PORT, () => {
  console.log(`User-Service listening on port ${PORT}`);
});
