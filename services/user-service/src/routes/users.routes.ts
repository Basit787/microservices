import { Router } from "express";
import { addUser } from "../controller/users.controller.js";

export const router = Router();
router.post("/register", addUser);
