import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import SERVICES from "./config/services.js";
import gatewayAuth from "../sharedService/middleware/gatewayAuth.js";
import requestLogger from "../sharedService/middleware/requestLogger.js";
import errorHandler from "../sharedService/middleware/errorHandler.js";

const gatewayApp = express();

// Security & Middleware
gatewayApp.use(helmet());
gatewayApp.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
gatewayApp.use(cookieParser());
gatewayApp.use(express.json({ limit: "50mb" }));
gatewayApp.use(express.urlencoded({ limit: "50mb", extended: true }));
if (process.env.MODE === "dev") {
  gatewayApp.use(morgan("dev"));
  gatewayApp.use(requestLogger);
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
gatewayApp.use(limiter);

// Health check
gatewayApp.get("/health", (req, res) => {
  res.json({ status: "Gateway is running", timestamp: new Date() });
});

// Service proxies
// AppService routes
gatewayApp.use(
  SERVICES.app.prefix,
  createProxyMiddleware({
    target: SERVICES.app.url,
    changeOrigin: true,
    pathRewrite: {
      [`^${SERVICES.app.prefix}`]: "",
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["X-Powered-By"] = "GitHubRecap Gateway";
    },
  }),
);

// DataService routes (with auth check)
gatewayApp.use(
  SERVICES.data.prefix,
  gatewayAuth,
  createProxyMiddleware({
    target: SERVICES.data.url,
    changeOrigin: true,
    pathRewrite: {
      [`^${SERVICES.data.prefix}`]: "",
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["X-Powered-By"] = "GitHubRecap Gateway";
    },
  }),
);

// 404 handler
gatewayApp.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
  });
});

// Error handler
gatewayApp.use(errorHandler);

export default gatewayApp;
