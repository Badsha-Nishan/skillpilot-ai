/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";

export const createLearningPathSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  shortDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters long." })
    .max(250, { message: "Short description cannot exceed 250 characters." }),
  fullDescription: z
    .string()
    .min(30, { message: "Full description must be at least 30 characters long." }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters long." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  duration: z
    .string()
    .min(2, { message: "Duration must specify a valid timeframe (e.g., '12 Hours')." }),
  image: z
    .string()
    .url({ message: "Please provide a valid image URL." })
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.string().min(1))
    .min(1, { message: "Please provide at least one search tag." }),
});

export const updateLearningPathSchema = createLearningPathSchema.partial();
