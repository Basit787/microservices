import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "../lib/env.js";

export const db = drizzle(postgres(DATABASE_URL! as string));
