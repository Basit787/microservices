import { Request, Response } from "express";
import * as users from "../services/user.service.js";
import { VerifyToken } from "../lib/jwt.js";
import { HashedPassword } from "../lib/hash.js";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const data = await users.getAllUsers();
    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get all users", error: error as Error });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  try {
    const { email } = VerifyToken(token);
    const [data] = await users.getUserDetails(email);
    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user details", error: error as Error });
  }
};

export const singleUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const [user] = await users.getSingleUser(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to get single user details", error: error as Error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const { name, age, email, password } = req.body;

  try {
    const verified = VerifyToken(token);
    if (verified.email !== email) {
      const data = await users.findUserByEmail(email);
      if (data.length) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
    }
    const hashPassword = await HashedPassword(password);
    const data = await users.getUserUpdate(
      { name, age, email, password: hashPassword },
      verified.email,
    );
    res.status(201).json({ message: "User Updated successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error as Error });
  }
};
