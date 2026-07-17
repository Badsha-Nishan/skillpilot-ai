/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { groq } from "../../services/groq.client";
import {
  ROADMAP_SYSTEM_INSTRUCTION,
  generateRoadmapPrompt,
} from "./promptTemplates";

export interface RoadmapInput {
  currentLevel: string;
  careerGoal: string;
  weeklyHours: number;
  learningStyle: string;
  existingSkills: string;
}

export interface WeeklyPlanItem {
  week: number;
  goal: string;
  topics: string[];
  projects: string[];
}

export interface RoadmapOutput {
  title: string;
  estimatedDuration: string;
  difficulty: string;
  weeklyPlan: WeeklyPlanItem[];
  recommendedLearningPaths: string[];
  tips: string[];
}

export class AiService {
  /**
   * Generates a fully structured personalized career learning roadmap using Groq.
   */
  static async generatePersonalizedRoadmap(
    input: RoadmapInput
  ): Promise<RoadmapOutput> {
    const prompt = generateRoadmapPrompt(input);

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: ROADMAP_SYSTEM_INSTRUCTION,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const responseText = response.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("Empty response returned from Groq API agent.");
      }

      // Parse the validated JSON string
      const cleaned = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const roadmap: RoadmapOutput = JSON.parse(cleaned);
      return roadmap;
    } catch (error) {
      console.error("Error invoking Groq model for roadmap:", error);
      throw error;
    }
  }
}
