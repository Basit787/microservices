import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export const VerifyToken = (token: string) => {
  try {
    const data = jwt.verify(token, SECRET_KEY);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error("Failed to verify token", error as Error);
  }
};
