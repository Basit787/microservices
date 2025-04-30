import { Router } from "express";
import * as auth from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

export const authRoutes = Router();

authRoutes.post("/login", auth.login);
authRoutes.post("/register", auth.register);
authRoutes.post("/logout", authMiddleware, auth.logout);
