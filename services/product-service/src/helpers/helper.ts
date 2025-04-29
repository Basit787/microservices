import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export const VerifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Failed to verify token", error as Error);
  }
};
