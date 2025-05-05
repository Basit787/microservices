import "dotenv/config";

const ENV = {
  PORT: Number(process.env.PORT!) ?? 5000,
  DATABASE_URL: (process.env.DATABASE_URL! as string) ?? "",
  SECRET_KEY: (process.env.SECRET_KEY! as string) ?? "",
} as const;

export default ENV;
