/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { LearningPathService } from "./learningPath.service";
import { createLearningPathSchema, updateLearningPathSchema } from "./learningPath.validation";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

export class LearningPathController {
  /**
   * Create a new learning path
   */
  static create = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication is required to launch a learning path.");
    }

    const parseResult = createLearningPathSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new ApiError(400, "Validation of learning path parameters failed.", errorDetails);
    }

    const result = await LearningPathService.create(parseResult.data, req.user.id);
    res.status(201).json(
      new ApiResponse(201, result, "Learning path created and initiated successfully.")
    );
  });

  /**
   * Get all learning paths with paginated filters
   */
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search ? String(req.query.search) : undefined;
    const category = req.query.category ? String(req.query.category) : undefined;
    const level = req.query.level ? String(req.query.level) : undefined;
    const sort = req.query.sort ? String(req.query.sort) : undefined;
    const page = req.query.page ? parseInt(String(req.query.page), 10) : undefined;
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : undefined;

    const result = await LearningPathService.findAll({
      search,
      category,
      level,
      sort,
      page,
      limit,
    });

    res.status(200).json(
      new ApiResponse(200, result, "Learning paths queried and retrieved successfully.")
    );
  });

  /**
   * Get learning path details by ID
   */
  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Required Learning Path ID query variable is missing.");
    }

    const result = await LearningPathService.findById(id);
    res.status(200).json(
      new ApiResponse(200, result, "Learning path details retrieved successfully.")
    );
  });

  /**
   * Update an existing learning path (Creator only)
   */
  static update = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication is required to edit learning paths.");
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Learning Path ID parameter is missing.");
    }

    const parseResult = updateLearningPathSchema.safeParse(req.body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      throw new ApiError(400, "Validation of update properties failed.", errorDetails);
    }

    const result = await LearningPathService.update(id, parseResult.data, req.user.id);
    res.status(200).json(
      new ApiResponse(200, result, "Learning path properties updated successfully.")
    );
  });

  /**
   * Delete an existing learning path (Creator only)
   */
  static delete = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication is required to remove learning paths.");
    }

    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Learning Path ID parameter is missing.");
    }

    await LearningPathService.delete(id, req.user.id);
    res.status(200).json(
      new ApiResponse(200, null, "Learning path removed from flight system successfully.")
    );
  });
}
