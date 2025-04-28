import { SendQueue } from "../lib/rabbitmq.js";

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    await SendQueue("PRODUCT_QUEUE", product);
    return res.status(201).json({ message: "Product added and event sent to queue", product });
  } catch (error) {
    return res.status(500).json({ message: "Error while adding product", error });
  }
};
