import { Router } from "express";
import * as user from "../controller/users.controller.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";

export const userRoutes = Router();
userRoutes.get("/getAllUsers", authMiddleware, roleMiddleware(["admin"]), user.allUsers);
userRoutes.get("/getCurrentUser", authMiddleware, user.userDetails);
userRoutes.get("/getSingleUser/:id", authMiddleware, roleMiddleware(["admin"]), user.singleUser);
userRoutes.put("/updateUser", authMiddleware, user.updateUser);
