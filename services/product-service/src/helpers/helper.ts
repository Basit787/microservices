import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../lib/env.js";

export const VerifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, SECRET_KEY!);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error("Failed to verify token", error as Error);
  }
};
