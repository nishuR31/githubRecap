import { PrismaClient } from "./prisma/index.js";

const appClient = new PrismaClient({
  log: process.env.MODE === "dev" ? ["query", "error", "warn"] : ["error"],
});

export default appClient;
