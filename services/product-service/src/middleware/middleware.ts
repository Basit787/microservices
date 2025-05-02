import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../helpers/helper.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: "Login to continue..." });
    return;
  }

  try {
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

export const roleMiddleware = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      const user = VerifyToken(token);
      if (!role.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Access denied" });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Failed while verifying role", error: error as Error });
    }
  };
};
