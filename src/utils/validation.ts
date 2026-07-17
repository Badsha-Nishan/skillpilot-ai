/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from "zod";

export const skillFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Skill name must be at least 2 characters long." })
    .max(50, { message: "Skill name cannot exceed 50 characters." }),
  category: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long." }),
  proficiency: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

export type SkillFormInput = z.infer<typeof skillFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;

export const learningPathFormSchema = z.object({
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
    .min(1, { message: "Please select a valid category." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  duration: z
    .string()
    .min(2, { message: "Duration is required (e.g. '12 Hours', '4 Weeks')." }),
  image: z
    .string()
    .url({ message: "Please enter a valid image URL." })
    .optional()
    .or(z.literal("")),
  tagsString: z
    .string()
    .min(1, { message: "Please enter tags separated by commas." }),
});

export type LearningPathFormInput = z.infer<typeof learningPathFormSchema>;

