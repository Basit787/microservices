import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../helpers/helper.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json({ message: "Login to continue..." });
      return;
    }
    const decodeToken = VerifyToken(token);
    if (!decodeToken) {
      res.status(401).json({ message: "Relogin again" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Failed while verifying user", error: error as Error });
  }
};
