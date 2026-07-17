/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MessageSquare, Trash2, Calendar } from "lucide-react";
import { Conversation } from "./types";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onDelete,
}: ConversationListProps) {
  const getConversationTitle = (conv: Conversation) => {
    const firstUserMsg = conv.messages.find((m) => m.role === "user");
    if (firstUserMsg) {
      const content = firstUserMsg.content;
      return content.length > 32 ? `${content.slice(0, 32)}...` : content;
    }
    return "New Mentorship Session";
  };

  const getFormattedDate = (conv: Conversation) => {
    try {
      const date = new Date(conv.updatedAt || conv.createdAt);
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <MessageSquare className="h-6 w-6 text-slate-300 mb-2" />
        <p className="text-slate-400 text-xs font-medium">No sessions found</p>
        <p className="text-slate-400 text-[10px] mt-0.5">Start a fresh conversation above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 overflow-y-auto max-h-[450px] pr-1">
      {conversations.map((conv) => {
        const isSelected = conv.conversationId === selectedId;
        return (
          <div
            key={conv.conversationId}
            onClick={() => onSelect(conv.conversationId)}
            className={`group w-full flex items-center justify-between p-3 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
              isSelected
                ? "bg-indigo-50/70 border-indigo-200/80 text-indigo-950"
                : "bg-white hover:bg-slate-50 border-slate-200/60 text-slate-700 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-grow">
              <MessageSquare
                className={`h-4 w-4 shrink-0 ${
                  isSelected ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
                }`}
              />
              <div className="min-w-0">
                <div className="font-semibold text-xs sm:text-sm truncate pr-1">
                  {getConversationTitle(conv)}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-0.5">
                  <Calendar className="h-3 w-3" />
                  {getFormattedDate(conv)}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(conv.conversationId);
              }}
              title="Delete session"
              className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-all ${
                isSelected ? "opacity-100 text-indigo-400 hover:text-red-600" : ""
              }`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
