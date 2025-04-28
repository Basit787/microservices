import { Request, Response } from "express";
import { SendQueue } from "../lib/rabbitmq.js";

export const addUser = async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {
    await SendQueue("USER_QUEUE", user);
    return res
      .status(201)
      .json({ message: "User registered and event sent to queue", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add user", error });
  }
};
