/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { ConversationModel } from "./conversation.model";
import { LearningPathModel } from "../learningPath/learningPath.model";

let aiInstance: GoogleGenAI | null = null;

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

export class ChatService {
  /**
   * Helper to fetch and construct system instruction with app context (learning paths and user roadmap)
   */
  static async getSystemInstruction(params: {
    currentLevel?: string;
    learningStyle?: string;
    roadmapTitle?: string;
    roadmapDifficulty?: string;
  }): Promise<string> {
    // Fetch available learning paths from database
    let learningPathsList = "";
    try {
      const paths = await LearningPathModel.find({}).limit(50);
      if (paths && paths.length > 0) {
        learningPathsList = paths
          .map((p) => `- "${p.title}" (${p.level} level, duration: ${p.duration}) - ${p.shortDescription}`)
          .join("\n");
      } else {
        learningPathsList = "None currently published. Encourage the user to explore and create one!";
      }
    } catch (e) {
      console.error("Failed to retrieve learning paths for chat context:", e);
      learningPathsList = "Unable to retrieve learning paths at this moment.";
    }

    const { currentLevel, learningStyle, roadmapTitle, roadmapDifficulty } = params;

    return `You are "SkillPilot AI Mentor", an elite Senior Software Engineer, Technical Architect, and Career Coach. 
Your goal is to guide students and professionals on their software engineering journeys. 

### USER CONTEXT
- Current Skill Level: ${currentLevel || "Beginner"}
- Learning Style: ${learningStyle || "Practical/Hands-on"}
${roadmapTitle ? `- Active Learning Roadmap: "${roadmapTitle}" (Difficulty: ${roadmapDifficulty || "N/A"})` : "- Active Learning Roadmap: None selected yet"}

### AVAILABLE LEARNING PATHS (Recommend these when relevant to their questions):
${learningPathsList}

### YOUR PERSONA & RULES
1. **Be Actionable & Professional**: Give real-world software engineering advice. Avoid vague platitudes or generic intro scripts. Use robust coding patterns, senior developer workflows, and concrete technical concepts.
2. **Encourage & Empower**: Foster a growth mindset. Be a supportive but rigorous mentor.
3. **Reference App Content**: Whenever the user asks what to learn next or asks a question related to any of the "AVAILABLE LEARNING PATHS" listed above, explicitly recommend that specific course/path. Suggest they check it out in the "Learning Paths" section.
4. **Markdown & Code Rendering**: Format your responses beautifully with Markdown. Wrap all code blocks in standard triple backticks with syntax highlighting (e.g., \`\`\`typescript ... \`\`\`).
5. **Contextual History**: Answer in the context of your previous conversation. Do not contradict yourself or forget earlier discussion vectors.
6. **Avoid Generic Behavior**: Do not talk like a generic chat assistant (e.g. "How can I help you today?"). Talk like a passionate, knowledgeable Tech Lead guiding an apprentice. Be concise and keep answers highly punchy, precise, and readable.`;
  }

  /**
   * Send a message to Gemini and get a response (standard)
   */
  static async getReply(params: {
    userId: string;
    conversationId: string;
    message: string;
    currentLevel?: string;
    learningStyle?: string;
    roadmapTitle?: string;
    roadmapDifficulty?: string;
  }): Promise<string> {
    const ai = getAiClient();

    // 1. Load or initialize conversation
    let conv = await ConversationModel.findOne({
      userId: params.userId,
      conversationId: params.conversationId,
    });

    if (!conv) {
      conv = new ConversationModel({
        userId: params.userId,
        conversationId: params.conversationId,
        messages: [],
      });
    }

    // 2. Fetch system instruction
    const systemInstruction = await this.getSystemInstruction(params);

    // 3. Format history for Gemini
    const contents = conv.messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Append new user message
    contents.push({
      role: "user",
      parts: [{ text: params.message }],
    });

    // 4. Generate content
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a response. Please try again.";

    // 5. Append both messages to database history
    conv.messages.push({
      role: "user",
      content: params.message,
      timestamp: new Date(),
    });
    conv.messages.push({
      role: "model",
      content: replyText,
      timestamp: new Date(),
    });

    await conv.save();

    return replyText;
  }

  /**
   * Get reply in a streaming manner using Server-Sent Events (SSE)
   */
  static async getReplyStream(params: {
    userId: string;
    conversationId: string;
    message: string;
    currentLevel?: string;
    learningStyle?: string;
    roadmapTitle?: string;
    roadmapDifficulty?: string;
    onChunk: (text: string) => void;
    onComplete: (fullText: string) => void;
  }): Promise<void> {
    const ai = getAiClient();

    let conv = await ConversationModel.findOne({
      userId: params.userId,
      conversationId: params.conversationId,
    });

    if (!conv) {
      conv = new ConversationModel({
        userId: params.userId,
        conversationId: params.conversationId,
        messages: [],
      });
    }

    const systemInstruction = await this.getSystemInstruction(params);

    const contents = conv.messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    contents.push({
      role: "user",
      parts: [{ text: params.message }],
    });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const chunkText = chunk.text || "";
      if (chunkText) {
        fullText += chunkText;
        params.onChunk(chunkText);
      }
    }

    if (!fullText) {
      fullText = "I was unable to formulate a response. Please try again.";
      params.onChunk(fullText);
    }

    // Save back to db
    conv.messages.push({
      role: "user",
      content: params.message,
      timestamp: new Date(),
    });
    conv.messages.push({
      role: "model",
      content: fullText,
      timestamp: new Date(),
    });

    await conv.save();
    params.onComplete(fullText);
  }
}
