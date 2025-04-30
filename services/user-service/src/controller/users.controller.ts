import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { HashedPassword, VerifyToken } from "../helpers/helper.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(usersTable);
    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get al users", error: error as Error });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  try {
    const { email } = VerifyToken(token);

    const [data] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        age: usersTable.age,
        email: usersTable.email,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user details", error: error as Error });
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to get single user details", error: error as Error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const { password, ...user } = req.body;

  try {
    const { email } = VerifyToken(token);

    const isUser = await db.select().from(usersTable).where(eq(usersTable.email, user.email));

    if (isUser.length) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashPassword = await HashedPassword(password);

    const [data] = await db
      .update(usersTable)
      .set({ password: hashPassword, ...user })
      .where(eq(usersTable.email, email))
      .returning();

    res.status(201).json({ message: "User Updated successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error as Error });
  }
};
