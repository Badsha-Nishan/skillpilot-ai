/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from "express";
import { AiController } from "./ai.controller";
import { verifyAuth } from "../../middlewares/authMiddleware";

const router = Router();

// Protected learning roadmap generator endpoint
router.post("/roadmap", verifyAuth, AiController.generateRoadmap);

export default router;
