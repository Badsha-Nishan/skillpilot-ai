/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { verifyAuth } from "../../middlewares/authMiddleware";

const router = Router();

// Protected dashboard stats endpoint
router.get("/stats", verifyAuth, DashboardController.getStats);

export default router;
