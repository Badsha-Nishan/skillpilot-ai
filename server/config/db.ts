/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.warn("⚠️ MONGO_URI is not declared in environmental secrets. Running in memory/offline sandbox mode.");
      return;
    }

    // Connect to MongoDB
    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(`🔌 MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // In Phase 1, we don't crash the startup so development continues smoothly
  }
};
