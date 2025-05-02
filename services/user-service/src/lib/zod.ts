import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters long" }),
  age: z.number().int().nonnegative({ message: "Age must be a non-negative integer" }),
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z.string().trim().min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(["admin", "user"]).default("user"),
});
