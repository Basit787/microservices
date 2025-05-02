import { eq, Placeholder, SQL } from "drizzle-orm";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";

export const registerUser = async ({
  name,
  age,
  email,
  password,
}: {
  name: string | SQL<unknown> | Placeholder<string, any>;
  age: number | SQL<unknown> | Placeholder<string, any>;
  email: string | SQL<unknown> | Placeholder<string, any>;
  password: string | SQL<unknown> | Placeholder<string, any>;
}) => {
  return await db.insert(usersTable).values({ name, age, email, password }).returning();
};

export const getAllUsers = async () => {
  return await db.select().from(usersTable);
};

export const getUserDetails = async (email: string | SQL<unknown> | Placeholder<string, any>) => {
  return await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      age: usersTable.age,
      email: usersTable.email,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
};

export const getSingleUser = async (userId: string | SQL<unknown> | Placeholder<string, any>) => {
  return await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      role: usersTable.role,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));
};

export const getUserUpdate = async (
  {
    name,
    age,
    email,
    password,
  }: {
    name: string | SQL<unknown>;
    age: number | SQL<unknown>;
    email: string | SQL<unknown>;
    password: string | SQL<unknown>;
  },
  userEmail: string,
) => {
  await db
    .update(usersTable)
    .set({ name, age, email, password })
    .where(eq(usersTable.email, userEmail))
    .returning();
};

export const findUserByEmail = async (email: string | SQL<unknown> | Placeholder<string, any>) => {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
};
