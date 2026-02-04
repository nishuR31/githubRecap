import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import success from "../../sharedService/response/success.js";
import err from "../../sharedService/response/error.js";
import codes from "../../sharedService/utils/codes.js";
import appRouter from "../routes/app.route.js";
import requestLogger from "../../sharedService/middleware/requestLogger.js";

const app = express();
const baseRoute = process.env.BASE || "";
const serviceBase = `${baseRoute}/app`;

app.use((req, _, next) => {
  delete req.headers["x-user-id"];
  delete req.headers["x-authenticated"];
  next();
});

app.use(helmet());
if (process.env.MODE === "dev") {
  app.use(morgan("dev"));
  app.use(requestLogger);
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PROD,
  process.env.FRONTEND_URL_DEV,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("CORS blocked"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use(
  rateLimit({
    windowMs: 60_000,
    max: process.env.MODE === "dev" ? 10000 : 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(serviceBase, appRouter);

app.get("/", (_, res) =>
  success(res, "Root route", codes.ok, { msg: "Hello from app service" }),
);

app.get(`${serviceBase}`, (_, res) =>
  success(res, `${serviceBase} route fetched`, codes.ok, {
    msg: "Hello from app route",
  }),
);

app.all(`${serviceBase}/{*spalt}`, (req, res) =>
  err(res, "Route not found", codes.notFound, { path: req.url }),
);

app.use((req, res) =>
  err(res, "Route not found", codes.notFound, { path: req.originalUrl }),
);

export default app;
