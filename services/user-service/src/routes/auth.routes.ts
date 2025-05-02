import { Router } from "express";
import * as auth from "../controller/auth.controller.js";
import { authMiddleware, schemaMiddleware } from "../middleware/middleware.js";
import { loginSchema, registerSchema } from "../lib/zod.js";

export const authRoutes = Router();

authRoutes.post("/login", schemaMiddleware(loginSchema), auth.login);
authRoutes.post("/register", schemaMiddleware(registerSchema), auth.register);
authRoutes.post("/logout", authMiddleware, auth.logout);
