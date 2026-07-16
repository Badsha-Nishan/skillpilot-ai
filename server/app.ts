/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middlewares/rateLimiter";
import healthRouter from "./routes/health";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Set up security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Turned off for Vite development middleware capability
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.APP_URL || true,
    credentials: true,
  })
);

// Logging middleware
app.use(morgan("dev"));

// Body parser and cookie parser
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Apply rate limiter on API endpoints
app.use("/api", apiLimiter);

// Register API Endpoints
app.use("/api/health", healthRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
