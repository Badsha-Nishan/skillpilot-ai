/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from "express";
import { ChatController } from "./chat.controller";
import { verifyAuth } from "../../middlewares/authMiddleware";

const router = Router();

// Protected chat routing endpoints
router.post("/", verifyAuth, ChatController.handleMessage);
router.get("/history", verifyAuth, ChatController.getHistory);
router.get("/history/:conversationId", verifyAuth, ChatController.getConversation);
router.delete("/history/:conversationId", verifyAuth, ChatController.deleteConversation);

export default router;
