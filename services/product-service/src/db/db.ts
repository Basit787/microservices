import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import ENV from "../lib/env.js";

export const db = drizzle(postgres(ENV.DATABASE_URL));
