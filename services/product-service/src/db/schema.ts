import { decimal, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  productName: text("productName").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
});
