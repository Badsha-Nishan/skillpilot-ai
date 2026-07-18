/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyAuth } from "../../middlewares/authMiddleware";

const router = Router();

// Public Authentication Endpoints
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Protected Authentication Endpoints
router.get("/me", verifyAuth, AuthController.getMe);
router.post("/logout", verifyAuth, AuthController.logout);

export default router;
