import { Router } from "express";
import { addProduct } from "../controller/product.controller.js";

export const router = Router();
router.post("/add-product", addProduct);
