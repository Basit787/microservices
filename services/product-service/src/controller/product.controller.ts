import { Request, Response } from "express";
import { SendQueue } from "../lib/rabbitmq.js";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = req.body;
    await SendQueue("PRODUCT_QUEUE", product);
    res.status(201).json({ message: "Product added and event sent to queue", product });
  } catch (error) {
    res.status(500).json({ message: "Error while adding product", error });
  }
};
