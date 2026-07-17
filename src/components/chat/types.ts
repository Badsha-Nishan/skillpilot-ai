/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  role: "user" | "model" | "system";
  content: string;
  timestamp: string | Date;
}

export interface Conversation {
  conversationId: string;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}
