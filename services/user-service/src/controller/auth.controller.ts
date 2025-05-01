import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { ComparePassword, CreateToken, HashedPassword } from "../helpers/helper.js";

export const register = async (req: Request, res: Response) => {
  const { password, ...user } = req.body;
  try {
    const isUser = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    if (isUser.length) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashPassword = await HashedPassword(password);

    const data = await db
      .insert(usersTable)
      .values({ ...user, password: hashPassword })
      .returning();

    res.status(201).json({ message: "User registered and event sent to queue", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to add user", error: error as Error });
  }
};

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const [isUser] = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
    if (!isUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const matchedPassword = await ComparePassword(user.password, isUser?.password);
    if (!matchedPassword) {
      res.status(400).json({ message: "Password didnt matched" });
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

export const logout = async (req: Request, res: Response) => {
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
