import { Router } from "express";
import { addProduct } from "../controller/product.controller.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";

export const router = Router();
router.post("/add-product", authMiddleware, roleMiddleware(["admin"]), addProduct);
