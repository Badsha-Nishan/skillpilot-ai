/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import { AiService } from "./ai.service";

export class AiController {
  /**
   * Generate a personalized learning roadmap
   * POST /api/ai/roadmap
   */
  static generateRoadmap = asyncHandler(async (req: Request, res: Response) => {
    const { currentLevel, careerGoal, weeklyHours, learningStyle, existingSkills } = req.body;

    // Validate parameters
    if (!currentLevel || typeof currentLevel !== "string") {
      throw new ApiError(400, "Invalid currentLevel vector parameter. Must be a valid string.");
    }
    if (!careerGoal || typeof careerGoal !== "string" || !careerGoal.trim()) {
      throw new ApiError(400, "Invalid careerGoal vector parameter. Must be a non-empty string.");
    }
    const hoursNum = Number(weeklyHours);
    if (isNaN(hoursNum) || hoursNum <= 0) {
      throw new ApiError(400, "Invalid weeklyHours vector parameter. Must be a positive number.");
    }
    if (!learningStyle || typeof learningStyle !== "string" || !learningStyle.trim()) {
      throw new ApiError(400, "Invalid learningStyle vector parameter. Must be a non-empty string.");
    }

    console.log(`🤖 Invoking Agentic Career Mentor for User: ${req.user?.email || "anonymous"}`);
    console.log(`🎯 Career Goal: ${careerGoal} | Level: ${currentLevel} | Style: ${learningStyle}`);

    const roadmapData = await AiService.generatePersonalizedRoadmap({
      currentLevel,
      careerGoal,
      weeklyHours: hoursNum,
      learningStyle,
      existingSkills: existingSkills || "",
    });

    res.status(200).json({
      status: "success",
      data: roadmapData,
    });
  });
}
