import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.string().refine(
    (val) => {
      const num = typeof val === "string" ? parseFloat(val) : val;
      return !isNaN(num) && num >= 0;
    },
    { message: "Price must be a valid non-negative number" },
  ),
  stock: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
});
