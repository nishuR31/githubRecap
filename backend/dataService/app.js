import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dataRouter from "./routes/data.route.js";
import requestLogger from "../sharedService/middleware/requestLogger.js";
import errorHandler from "../sharedService/middleware/errorHandler.js";

const app = express();
const baseRoute = process.env.BASE || "";
const serviceBase = `${baseRoute}/github`;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.GATEWAY_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Logging (dev only)
if (process.env.MODE === "dev") {
  app.use(morgan("dev"));
  app.use(requestLogger);
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use(serviceBase, dataRouter);

// Error handling
app.use(errorHandler);

export default app;
