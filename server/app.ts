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
import authRouter from "./modules/auth/auth.routes";
import learningPathRouter from "./modules/learningPath/learningPath.routes";
import dashboardRouter from "./modules/dashboard/dashboard.routes";
import aiRouter from "./modules/ai/ai.routes";
import chatRouter from "./modules/chat/chat.routes";
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
app.use("/api/auth", authRouter);
app.use("/api/learning-paths", learningPathRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/ai", aiRouter);
app.use("/api/chat", chatRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
