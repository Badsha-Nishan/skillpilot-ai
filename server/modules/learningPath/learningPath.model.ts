/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose, { Schema, Document } from "mongoose";

export interface ILearningPath extends Document {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // e.g., "12 Hours", "4 Weeks"
  image: string;
  tags: string[];
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const LearningPathSchema = new Schema<ILearningPath>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.Mixed, // Accommodates both Mongoose ObjectIds and in-memory test IDs (e.g. "mem-user-1")
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LearningPathModel = mongoose.models.LearningPath 
  ? (mongoose.models.LearningPath as mongoose.Model<ILearningPath>) 
  : mongoose.model<ILearningPath>("LearningPath", LearningPathSchema);
