import { Request, Response } from "express";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { VerifyToken } from "../helpers/helper.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.select().from(usersTable);
    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get al users", error: error as Error });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json({ message: "Login to continue..." });
    }
    const decodeToken = VerifyToken(token);
    const dataa = JSON.parse(JSON.stringify(decodeToken));
    const data = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        age: usersTable.age,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, dataa.email));
    res.status(200).json({ message: "User data fetched successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user details", error: error as Error });
  }
};
