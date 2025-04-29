import { Request, Response } from "express";
import { SendQueue } from "../lib/rabbitmq.js";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;
  try {
    const data = await db.insert(usersTable).values({ ...user });
    console.log(data);
    await SendQueue("USER_QUEUE", user);
    res.status(201).json({ message: "User registered and event sent to queue", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error });
  }
};
