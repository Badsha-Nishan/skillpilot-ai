/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";
import { LearningPathModel, ILearningPath } from "./learningPath.model";
import { AuthService } from "../auth/auth.service";
import ApiError from "../../utils/ApiError";

// In-Memory Database Fallback for Live Sandbox Previews
let inMemoryPaths: Array<{
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  image: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: "path-1",
    title: "AI Prompt Engineering & LLM Integration Masterclass",
    shortDescription: "Master advanced prompt techniques, vector embeddings, and semantic orchestration.",
    fullDescription: "Become an elite prompt engineer. This path guides you through Zero-Shot, Few-Shot, Chain-of-Thought prompting, and the complete application of agentic workflows. You will discover how to wire vector databases, leverage retrieval-augmented generation (RAG), and deploy stateful cognitive loops into enterprise React-based environments.",
    category: "Artificial Intelligence",
    level: "Intermediate",
    duration: "14 Hours",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600",
    tags: ["LLM", "Prompting", "Vector Search", "Gemini API"],
    createdBy: "mem-user-1", // Created by Alex Pilot
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "path-2",
    title: "Full-Stack TypeScript Architecture & Solid Design",
    shortDescription: "Architect robust microservices and modular frontend packages with TypeScript.",
    fullDescription: "Take your TypeScript knowledge to a strict, compile-safe, production level. We explore mapped types, advanced decorators, interface segregations, and clean controller-service architecture. Understand the mechanics behind Express servers, Mongoose schema bindings, Vite bundlers, and secure state storage protocols.",
    category: "Software Engineering",
    level: "Advanced",
    duration: "24 Hours",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    tags: ["TypeScript", "Express", "Node.js", "Clean Architecture"],
    createdBy: "mem-user-1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "path-3",
    title: "Modern UI/UX Design Systems with Tailwind CSS",
    shortDescription: "Craft scalable custom web components, typography scales, and fluid animations.",
    fullDescription: "Design isn't an accident—it's an exact science. Learn to construct gorgeous, responsive layouts using native Tailwind token utilities. We will design custom theme structures, fluid screen padding rhythms, accessible color contrasts, and interactive motion transitions with high performance in mind.",
    category: "Frontend Development",
    level: "Beginner",
    duration: "8 Hours",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600",
    tags: ["Tailwind CSS", "UI Design", "Framer Motion", "Figma"],
    createdBy: "mem-user-1",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  }
];

export class LearningPathService {
  /**
   * Check if MongoDB is connected
   */
  private static isDbConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Create a new learning path
   */
  static async create(data: any, userId: string): Promise<any> {
    if (this.isDbConnected()) {
      const pathDoc = await LearningPathModel.create({
        ...data,
        createdBy: userId,
      });
      return pathDoc;
    } else {
      console.warn("⚠️ Database offline. Creating learning path in-memory.");
      const newPath = {
        id: `path-${Date.now()}`,
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : [],
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryPaths.unshift(newPath);
      return newPath;
    }
  }

  /**
   * Find all learning paths (with search, category/level filter, pagination, sorting)
   */
  static async findAll(filters: {
    search?: string;
    category?: string;
    level?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ paths: any[]; total: number; page: number; pages: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 6;
    const skip = (page - 1) * limit;

    if (this.isDbConnected()) {
      // Build dynamic MongoDB Query object
      const query: any = {};

      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: "i" } },
          { shortDescription: { $regex: filters.search, $options: "i" } },
          { tags: { $regex: filters.search, $options: "i" } },
        ];
      }

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.level) {
        query.level = filters.level;
      }

      // Sorting settings
      let sortObj: any = { createdAt: -1 };
      if (filters.sort === "oldest") {
        sortObj = { createdAt: 1 };
      } else if (filters.sort === "alphabetical") {
        sortObj = { title: 1 };
      } else if (filters.sort === "duration") {
        sortObj = { duration: 1 };
      }

      const total = await LearningPathModel.countDocuments(query);
      const paths = await LearningPathModel.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit);

      // Attach Creator Profile Information to each result
      const pathsWithCreators = await Promise.all(
        paths.map(async (p) => {
          try {
            const creator = await AuthService.findById(p.createdBy.toString());
            return {
              ...p.toJSON(),
              id: p._id.toString(),
              creator,
            };
          } catch {
            return {
              ...p.toJSON(),
              id: p._id.toString(),
              creator: { name: "Vector System", photoURL: "" },
            };
          }
        })
      );

      return {
        paths: pathsWithCreators,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
      };
    } else {
      // Process queries in-memory for preview environment
      let results = [...inMemoryPaths];

      // Filter: Search
      if (filters.search) {
        const s = filters.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(s) ||
            p.shortDescription.toLowerCase().includes(s) ||
            p.tags.some((t) => t.toLowerCase().includes(s))
        );
      }

      // Filter: Category
      if (filters.category) {
        results = results.filter((p) => p.category === filters.category);
      }

      // Filter: Level
      if (filters.level) {
        results = results.filter((p) => p.level === filters.level);
      }

      // Sorting
      if (filters.sort === "oldest") {
        results.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      } else if (filters.sort === "alphabetical") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filters.sort === "duration") {
        results.sort((a, b) => a.duration.localeCompare(b.duration));
      } else {
        // Default: newest
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }

      const total = results.length;
      const paginatedResults = results.slice(skip, skip + limit);

      const pathsWithCreators = await Promise.all(
        paginatedResults.map(async (p) => {
          try {
            const creator = await AuthService.findById(p.createdBy);
            return {
              ...p,
              creator,
            };
          } catch {
            return {
              ...p,
              creator: { name: "Vector System", photoURL: "" },
            };
          }
        })
      );

      return {
        paths: pathsWithCreators,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
      };
    }
  }

  /**
   * Find a single learning path by ID
   */
  static async findById(id: string): Promise<any> {
    if (this.isDbConnected()) {
      const pathDoc = await LearningPathModel.findById(id);
      if (!pathDoc) {
        throw new ApiError(404, "Learning Path not found.");
      }

      let creator;
      try {
        creator = await AuthService.findById(pathDoc.createdBy.toString());
      } catch {
        creator = { name: "Vector System", photoURL: "" };
      }

      return {
        ...pathDoc.toJSON(),
        id: pathDoc._id.toString(),
        creator,
      };
    } else {
      const pathDoc = inMemoryPaths.find((p) => p.id === id);
      if (!pathDoc) {
        throw new ApiError(404, "Learning Path not found in Sandbox store.");
      }

      let creator;
      try {
        creator = await AuthService.findById(pathDoc.createdBy);
      } catch {
        creator = { name: "Vector System", photoURL: "" };
      }

      return {
        ...pathDoc,
        creator,
      };
    }
  }

  /**
   * Update a learning path (restricted to creator)
   */
  static async update(id: string, data: any, userId: string): Promise<any> {
    const existing = await this.findById(id);
    
    // Check permission - must be creator
    const creatorId = existing.createdBy?.toString() || existing.createdBy;
    if (creatorId !== userId) {
      throw new ApiError(403, "Access Denied. Only the original pilot creator can modify this path.");
    }

    if (this.isDbConnected()) {
      const updated = await LearningPathModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return updated;
    } else {
      const idx = inMemoryPaths.findIndex((p) => p.id === id);
      if (idx === -1) {
        throw new ApiError(404, "Learning Path not found in Sandbox store.");
      }

      inMemoryPaths[idx] = {
        ...inMemoryPaths[idx],
        ...data,
        updatedAt: new Date(),
      };
      return inMemoryPaths[idx];
    }
  }

  /**
   * Delete a learning path (restricted to creator)
   */
  static async delete(id: string, userId: string): Promise<void> {
    const existing = await this.findById(id);

    // Check permission - must be creator
    const creatorId = existing.createdBy?.toString() || existing.createdBy;
    if (creatorId !== userId) {
      throw new ApiError(403, "Access Denied. Only the original pilot creator can delete this path.");
    }

    if (this.isDbConnected()) {
      await LearningPathModel.findByIdAndDelete(id);
    } else {
      const idx = inMemoryPaths.findIndex((p) => p.id === id);
      if (idx === -1) {
        throw new ApiError(404, "Learning Path not found in Sandbox store.");
      }
      inMemoryPaths.splice(idx, 1);
    }
  }
}
