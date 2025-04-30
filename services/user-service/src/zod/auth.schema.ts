import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z.string().trim().min(8, { message: "Password contains min 8 char" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, { message: "Name should contain atleast two chars" }),
  age: z.number(),
  email: z.string().trim().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password should contain atleast 8 chars" }),
  role: z.enum(["admin", "user"]).default("user"),
});
