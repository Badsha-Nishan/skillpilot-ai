/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IMessage {
  role: "user" | "model" | "system";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId | string;
  conversationId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "model", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: Schema.Types.Mixed,
      required: true,
      index: true,
    },
    conversationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.models.Conversation
  ? (mongoose.models.Conversation as mongoose.Model<IConversation>)
  : mongoose.model<IConversation>("Conversation", ConversationSchema);
