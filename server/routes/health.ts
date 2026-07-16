/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      platform: "SkillPilot AI Core",
      telemetry: {
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
      },
    };

    res.status(200).json(new ApiResponse(200, healthData, "System gateway is fully responsive."));
  })
);

export default router;
