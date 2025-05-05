import jwt from "jsonwebtoken";
import ENV from "./env.js";

export const VerifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, ENV.SECRET_KEY);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error("Failed to verify token", error as Error);
  }
};
