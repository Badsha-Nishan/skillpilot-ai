/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/ApiError";
import { ChatService } from "./chat.service";
import { ConversationModel } from "./conversation.model";

export class ChatController {
  /**
   * Handle chat messages (POST /api/chat)
   * Supports both SSE streaming and standard JSON responses.
   */
  static handleMessage = asyncHandler(async (req: Request, res: Response) => {
    const { conversationId, message, currentLevel, learningStyle, roadmapTitle, roadmapDifficulty, stream } = req.body;
    const userId = req.user?.id || "anonymous-user";

    if (!conversationId || typeof conversationId !== "string" || !conversationId.trim()) {
      throw new ApiError(400, "Missing or invalid conversationId.");
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new ApiError(400, "Message cannot be empty.");
    }

    const chatParams = {
      userId: String(userId),
      conversationId,
      message,
      currentLevel,
      learningStyle,
      roadmapTitle,
      roadmapDifficulty,
    };

    if (stream === true || stream === "true") {
      // Set up Server-Sent Events headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders?.();

      try {
        await ChatService.getReplyStream({
          ...chatParams,
          onChunk: (chunk) => {
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
          },
          onComplete: (fullText) => {
            res.write(`data: ${JSON.stringify({ done: true, fullText })}\n\n`);
            res.end();
          },
        });
      } catch (error: any) {
        console.error("Streaming error in chat controller:", error);
        res.write(`data: ${JSON.stringify({ error: error.message || "Streaming error occurred." })}\n\n`);
        res.end();
      }
    } else {
      // Standard JSON reply
      const reply = await ChatService.getReply(chatParams);
      res.status(200).json({
        status: "success",
        data: {
          reply,
        },
      });
    }
  });

  /**
   * Get all conversations for the user (GET /api/chat/history)
   */
  static getHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id || "anonymous-user";

    // Find conversations for this user, sorted by update date (newest first)
    const conversations = await ConversationModel.find({ userId: String(userId) })
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      status: "success",
      data: conversations,
    });
  });

  /**
   * Get specific conversation messages (GET /api/chat/history/:conversationId)
   */
  static getConversation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id || "anonymous-user";
    const { conversationId } = req.params;

    const conversation = await ConversationModel.findOne({
      userId: String(userId),
      conversationId,
    }).lean();

    if (!conversation) {
      throw new ApiError(404, "Conversation not found.");
    }

    res.status(200).json({
      status: "success",
      data: conversation,
    });
  });

  /**
   * Delete specific conversation (DELETE /api/chat/history/:conversationId)
   */
  static deleteConversation = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id || "anonymous-user";
    const { conversationId } = req.params;

    const result = await ConversationModel.findOneAndDelete({
      userId: String(userId),
      conversationId,
    });

    if (!result) {
      throw new ApiError(404, "Conversation not found or unauthorized to delete.");
    }

    res.status(200).json({
      status: "success",
      message: "Conversation deleted successfully.",
    });
  });
}
