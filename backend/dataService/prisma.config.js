import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// config({
//   path: path.join(__dirname, "app.env"),
// });
config({ path: path.join(__dirname,"..", "back.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
