import { Request, Response } from "express";
import * as products from "../services/product.service.js";

export const createProduct = async (req: Request, res: Response) => {
  const productDetails = req.body;
  try {
    const [data] = await products.addProduct(productDetails);
    res.status(201).json({ message: "Product added successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error as Error });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const data = await products.allProducts();
    res.status(200).json({ message: "Products fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error: error as Error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const [product] = await products.singleProduct(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Single product fetched successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get single product details", error: error as Error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const [product] = await products.deleteProduct(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to get single user details", error: error as Error });
  }
};
