import { eq, Placeholder, SQL } from "drizzle-orm";
import { db } from "../db/db.js";
import { productTable } from "../db/schema.js";

export const addProduct = async ({
  productName,
  description,
  price,
  stock,
}: {
  productName: string | SQL<unknown> | Placeholder<string, any>;
  description: string | SQL<unknown> | Placeholder<string, any>;
  price: string | SQL<unknown> | Placeholder<string, any>;
  stock: number | SQL<unknown> | Placeholder<string, any>;
}) => {
  return await db
    .insert(productTable)
    .values({ productName, description, price, stock })
    .returning();
};

export const allProducts = async () => {
  return await db.select().from(productTable);
};

export const singleProduct = async (
  productId: string | SQL<unknown> | Placeholder<string, any>,
) => {
  return await db.select().from(productTable).where(eq(productTable.id, productId));
};

export const deleteProduct = async (
  productId: string | SQL<unknown> | Placeholder<string, any>,
) => {
  return await db.delete(productTable).where(eq(productTable.id, productId)).returning();
};
