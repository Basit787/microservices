import { Router } from "express";
import * as user from "../controller/users.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

export const userRoutes = Router();
userRoutes.get("/getAllUsers", authMiddleware, user.getAllUsers);
userRoutes.get("/getCurrentUser", authMiddleware, user.getUserDetails);
