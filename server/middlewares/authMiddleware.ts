/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthService } from "../modules/auth/auth.service";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name: string;
        photoURL?: string;
        createdAt?: Date | string;
      };
    }
  }
}

export const verifyAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token = "";

  // 1. Check Authorization Bearer header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } 
  // 2. Fallback to cookie if present
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Authentication required. Missing token vector.");
  }

  // Verify JWT
  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    throw new ApiError(401, "Authentication failed. Invalid or expired token vector.");
  }

  // Retrieve user payload from auth service (ensures user still exists)
  try {
    const user = await AuthService.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Authentication failed. User profile no longer exists.");
  }
});
