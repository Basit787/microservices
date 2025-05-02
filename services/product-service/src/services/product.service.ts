import { eq, Placeholder, SQL } from "drizzle-orm";
import { db } from "../db/db.js";
import { productTable } from "../db/schema.js";

interface ProductDataType {
  productName: string | SQL<unknown> | Placeholder<string, unknown>;
  description: string | SQL<unknown> | Placeholder<string, unknown>;
  price: string | SQL<unknown> | Placeholder<string, unknown>;
  stock: number | SQL<unknown> | Placeholder<string, unknown>;
}

export const addProduct = async (productData: ProductDataType) => {
  return await db.insert(productTable).values(productData).returning();
};

export const allProducts = async () => {
  return await db.select().from(productTable);
};

export const singleProduct = async (productId: string) => {
  return await db.select().from(productTable).where(eq(productTable.id, productId));
};

export const deleteProduct = async (productId: string) => {
  return await db.delete(productTable).where(eq(productTable.id, productId)).returning();
};
