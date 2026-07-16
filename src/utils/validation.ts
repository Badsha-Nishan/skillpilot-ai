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
