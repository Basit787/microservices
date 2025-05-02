import { ColumnBaseConfig, ColumnDataType, eq, Placeholder, SQL } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { PgColumn } from "drizzle-orm/pg-core/index.js";

const selectUserData = {
  id: usersTable.id,
  name: usersTable.name,
  age: usersTable.age,
  email: usersTable.email,
  role: usersTable.role,
} as const;

interface UserDataType {
  name: string | SQL<unknown> | Placeholder<string, unknown>;
  age: number | SQL<unknown> | Placeholder<string, unknown>;
  email: string | SQL<unknown> | Placeholder<string, unknown>;
  password: string | SQL<unknown> | Placeholder<string, unknown>;
}

interface UpdateDataType {
  name:
    | string
    | SQL<unknown>
    | PgColumn<ColumnBaseConfig<ColumnDataType, string>, Record<string, unknown>>
    | undefined;
  age:
    | number
    | SQL<unknown>
    | PgColumn<ColumnBaseConfig<ColumnDataType, string>, Record<string, unknown>>
    | undefined;
  email:
    | string
    | SQL<unknown>
    | PgColumn<ColumnBaseConfig<ColumnDataType, string>, Record<string, unknown>>
    | undefined;
  password:
    | string
    | SQL<unknown>
    | PgColumn<ColumnBaseConfig<ColumnDataType, string>, Record<string, unknown>>
    | undefined;
}

export const registerUser = async (userData: UserDataType) => {
  return await db.insert(usersTable).values(userData).returning();
};

export const getAllUsers = async () => {
  return await db.select().from(usersTable);
};

export const getUserDetails = async (email: string) => {
  return await db.select(selectUserData).from(usersTable).where(eq(usersTable.email, email));
};

export const getSingleUser = async (userId: string) => {
  return await db.select(selectUserData).from(usersTable).where(eq(usersTable.id, userId));
};

export const getUserUpdate = async (updateData: UpdateDataType, userEmail: string) => {
  await db.update(usersTable).set(updateData).where(eq(usersTable.email, userEmail)).returning();
};

export const findUserByEmail = async (email: string) => {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
};
