import { Request, Response } from "express";
import * as users from "../services/user.service.js";
import { ComparePassword, HashedPassword } from "../lib/hash.js";
import { CreateToken } from "../lib/jwt.js";

export const register = async (req: Request, res: Response) => {
  const { password, ...user } = req.body;
  try {
    const verifiedEmail = await users.findUserByEmail(user.email);
    if (verifiedEmail.length) {
      res.status(404).json({ message: "User already exists" });
      return;
    }
    const hashPassword = await HashedPassword(password);
    const data = await users.registerUser({ password: hashPassword, ...user });
    res.status(201).json({ message: "User registered and event sent to queue", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error: error as Error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [isUser] = await users.findUserByEmail(email);
    if (!isUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isCorrectPassword = await ComparePassword(password, isUser.password);
    if (!isCorrectPassword) {
      res.status(404).json({ message: "Incorrect Password" });
      return;
    }

    const token = CreateToken({ id: isUser.id, email: isUser.email, role: isUser.role ?? "user" });
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(201).json({ message: "Login Successfull" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error: error as Error });
  }
};
