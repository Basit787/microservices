import "dotenv/config";

const ENV = {
  PORT: Number(process.env.PORT!) ?? 3000,
  RABBIT_MQ_URL: (process.env.RABBIT_MQ_URL! as string) ?? "",
};
export default ENV;
