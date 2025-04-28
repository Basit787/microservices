import { SendQueue } from "../lib/rabbitmq.js";

export const addUser = async (req, res) => {
  const user = req.body;
  try {
    await SendQueue("USER_QUEUE", user);
    return res.status(201).json({ message: "User registered and event sent to queue", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add user", error });
  }
};
