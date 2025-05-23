import { Router } from "express";
import * as product from "../controller/product.controller.js";
import { authMiddleware, roleMiddleware, schemaMiddleware } from "../middleware/middleware.js";
import { productSchema } from "../lib/zod.js";

export const router = Router();
router.post(
  "/add-product",
  authMiddleware,
  roleMiddleware(["admin"]),
  schemaMiddleware(productSchema),
  product.createProduct,
);

router.get("/getAllProducts", product.getAllProducts);

router.get("/getSingleProduct/:id", product.getProductById);

router.delete(
  "/deleteProduct/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  product.deleteProduct,
);
