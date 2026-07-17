/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";
import { UserModel, IUser } from "./user.model";
import { hashPassword, comparePassword, generateToken } from "../../utils/auth";
import ApiError from "../../utils/ApiError";

// In-Memory fallback cache in case MongoDB is offline or running in preview sandbox
const inMemoryUsers: Array<{
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  photoURL?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}> = [];

// Pre-seed a default user for easy testing/demo in sandbox
hashPassword("password123").then((hash) => {
  inMemoryUsers.push({
    id: "mem-user-1",
    name: "Alex Pilot",
    email: "demo@skillpilot.ai",
    passwordHash: hash,
    photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

export class AuthService {
  /**
   * Check if MongoDB is connected
   */
  private static isDbConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Register a new user
   */
  static async register(name: string, email: string, password: string): Promise<{ user: any; token: string }> {
    const emailLower = email.toLowerCase().trim();
    const hash = await hashPassword(password);

    if (this.isDbConnected()) {
      // Use real MongoDB
      const existingUser = await UserModel.findOne({ email: emailLower });
      if (existingUser) {
        throw new ApiError(400, "A user with this email address already exists.");
      }

      const user = await UserModel.create({
        name,
        email: emailLower,
        passwordHash: hash,
        role: "user",
      });

      const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
      
      return {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL || "",
          createdAt: user.createdAt,
        },
        token,
      };
    } else {
      // Use robust In-Memory fallback for preview sandbox
      console.warn("⚠️ Mongoose not connected. Processing registration via In-Memory Sandbox store.");
      
      const existingUser = inMemoryUsers.find((u) => u.email === emailLower);
      if (existingUser) {
        throw new ApiError(400, "A user with this email address already exists.");
      }

      const newId = `mem-${Date.now()}`;
      const newUser = {
        id: newId,
        name,
        email: emailLower,
        passwordHash: hash,
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      inMemoryUsers.push(newUser);
      const token = generateToken({ id: newId, email: emailLower, role: "user" });

      return {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          photoURL: newUser.photoURL,
          createdAt: newUser.createdAt,
        },
        token,
      };
    }
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<{ user: any; token: string }> {
    const emailLower = email.toLowerCase().trim();

    if (this.isDbConnected()) {
      // Use real MongoDB
      const user = await UserModel.findOne({ email: emailLower });
      if (!user) {
        throw new ApiError(401, "Invalid email or password credentials.");
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        throw new ApiError(401, "Invalid email or password credentials.");
      }

      const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });

      return {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL || "",
          createdAt: user.createdAt,
        },
        token,
      };
    } else {
      // Use robust In-Memory fallback
      console.warn("⚠️ Mongoose not connected. Processing login via In-Memory Sandbox store.");

      const user = inMemoryUsers.find((u) => u.email === emailLower);
      if (!user) {
        throw new ApiError(401, "Invalid email or password credentials.");
      }

      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        throw new ApiError(401, "Invalid email or password credentials.");
      }

      const token = generateToken({ id: user.id, email: user.email, role: user.role });

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          photoURL: user.photoURL,
          createdAt: user.createdAt,
        },
        token,
      };
    }
  }

  /**
   * Find user by id
   */
  static async findById(id: string): Promise<any> {
    if (this.isDbConnected()) {
      const user = await UserModel.findById(id).select("-passwordHash");
      if (!user) {
        throw new ApiError(404, "User vector profile not found.");
      }
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL || "",
        createdAt: user.createdAt,
      };
    } else {
      const user = inMemoryUsers.find((u) => u.id === id);
      if (!user) {
        throw new ApiError(404, "User vector profile not found in Sandbox store.");
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL,
        createdAt: user.createdAt,
      };
    }
  }
}
