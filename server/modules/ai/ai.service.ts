/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { ROADMAP_SYSTEM_INSTRUCTION, generateRoadmapPrompt } from "./promptTemplates";

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

let aiInstance: GoogleGenAI | null = null;

/**
 * Lazy initializer for GoogleGenAI to prevent server start failures if key is missing.
 */
function getAiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is not configured. Please define it in your Secrets / .env configuration."
      );
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

/**
 * Strict schema for the returned roadmap to guarantee structured JSON output.
 */
const roadmapResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The title of the personalized learning roadmap",
    },
    estimatedDuration: {
      type: Type.STRING,
      description: "Estimated duration to complete the roadmap (e.g., '8 Weeks', '12 Weeks')",
    },
    difficulty: {
      type: Type.STRING,
      description: "Overall difficulty level of the roadmap",
    },
    weeklyPlan: {
      type: Type.ARRAY,
      description: "Chronological list of learning objectives and exercises, week by week",
      items: {
        type: Type.OBJECT,
        properties: {
          week: {
            type: Type.INTEGER,
            description: "The sequential week number starting from 1",
          },
          goal: {
            type: Type.STRING,
            description: "Overall weekly focus objective",
          },
          topics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Detailed theoretical and structural topics covered this week",
          },
          projects: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Mini-projects, lab exercises, or coding challenges for this week",
          },
        },
        required: ["week", "goal", "topics", "projects"],
      },
    },
    recommendedLearningPaths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Related online courses, documentation modules, or subject areas inside the app",
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Pro-level senior developer tips, career advice, and study strategy tips",
    },
  },
  required: [
    "title",
    "estimatedDuration",
    "difficulty",
    "weeklyPlan",
    "recommendedLearningPaths",
    "tips",
  ],
};

export class AiService {
  /**
   * Generates a fully structured personalized career learning roadmap using Gemini.
   */
  static async generatePersonalizedRoadmap(input: RoadmapInput): Promise<RoadmapOutput> {
    const ai = getAiClient();
    const prompt = generateRoadmapPrompt(input);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: ROADMAP_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roadmapResponseSchema,
          temperature: 0.7,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response returned from Gemini API agent.");
      }

      // Parse the validated JSON string
      const roadmap: RoadmapOutput = JSON.parse(responseText.trim());
      return roadmap;
    } catch (error) {
      console.error("Error invoking Gemini model for roadmap:", error);
      throw error;
    }
  }
}
