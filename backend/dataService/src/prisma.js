import { PrismaClient } from "./prisma/index.js";

const dataClient = new PrismaClient({
  log: process.env.MODE === "dev" ? ["query", "error", "warn"] : ["error"],
});

process.on("SIGINT", async () => {
  await dataClient.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await dataClient.$disconnect();
  process.exit(0);
});

export default dataClient;
