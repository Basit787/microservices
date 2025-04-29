import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { userRoutes } from "./users.routes.js";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
