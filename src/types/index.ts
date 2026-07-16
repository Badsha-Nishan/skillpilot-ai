/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: "pilot" | "admin" | "recruiter";
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Assessment {
  id: string;
  title: string;
  skillId: string;
  questionsCount: number;
  durationMinutes: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export interface AppError {
  success: false;
  message: string;
  errors?: any[];
  stack?: string;
}
