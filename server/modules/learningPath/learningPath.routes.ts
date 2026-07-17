/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from "express";
import { LearningPathController } from "./learningPath.controller";
import { verifyAuth } from "../../middlewares/authMiddleware";

const router = Router();

// Public Routes
router.get("/", LearningPathController.getAll);
router.get("/:id", LearningPathController.getById);

// Protected Routes (requires verification)
router.post("/", verifyAuth, LearningPathController.create);
router.patch("/:id", verifyAuth, LearningPathController.update);
router.delete("/:id", verifyAuth, LearningPathController.delete);

export default router;
