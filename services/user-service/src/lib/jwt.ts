import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../lib/env.js";

export const CreateToken = (payload: { id: string; email: string; role: string }) => {
  try {
    return jwt.sign(payload, SECRET_KEY!, { expiresIn: "1h" });
  } catch (error) {
    throw new Error("Failed to create token", error as Error);
  }
};

export const VerifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, SECRET_KEY!);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error("Failed to verify token", error as Error);
  }
};
