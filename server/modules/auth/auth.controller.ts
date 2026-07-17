/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.validation";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

export class AuthController {
  /**
   * Register a new user profile
   */
  static register = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new ApiError(400, "Validation of registration parameters failed.", errorDetails);
    }

    const { name, email, password } = parseResult.data;
    const result = await AuthService.register(name, email, password);

    // Also set token in HTTP-only cookie for robust dual mechanism
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json(
      new ApiResponse(201, result, "User profile registered and onboarded successfully.")
    );
  });

  /**
   * Log in existing user
   */
  static login = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new ApiError(400, "Validation of login credentials failed.", errorDetails);
    }

    const { email, password } = parseResult.data;
    const result = await AuthService.login(email, password);

    // Set cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json(
      new ApiResponse(200, result, "User identity authenticated successfully.")
    );
  });

  /**
   * Return authenticated user identity details
   */
  static getMe = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "No authenticated user session found.");
    }
    res.status(200).json(
      new ApiResponse(200, { user: req.user }, "Authenticated user identity retrieved successfully.")
    );
  });
}
