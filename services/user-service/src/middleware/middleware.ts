import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../helpers/helper.js";
import { z } from "zod";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401).json({ message: "Login to continue..." });
    return;
  }

  try {
    const decodeToken = await VerifyToken(token);

    if (!decodeToken) {
      res.status(401).json({ message: "Relogin again" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Failed while verifying user", error: error as Error });
  }
};

export const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      const user = VerifyToken(token);
      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden: Access denied" });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Failed while verifying role", error: error as Error });
    }
  };
};

export const schemaMiddleware = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    try {
      await schema.parse(userData);
      next();
    } catch (error) {
      res.status(500).json({ message: "Failed while verifying schema", error: error as Error });
    }
  };
};
