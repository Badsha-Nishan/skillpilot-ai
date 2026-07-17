/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Markdown from "react-markdown";
import { User, Cpu } from "lucide-react";
import { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
      {/* Avatar */}
      <div
        className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs border ${
          isUser
            ? "bg-slate-900 border-slate-950 text-white"
            : "bg-indigo-50 border-indigo-100 text-indigo-600"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Cpu className="h-4 w-4" />}
      </div>

      {/* Message bubble */}
      <div className="space-y-1 min-w-0">
        <div
          className={`px-4 py-3 rounded-2xl shadow-xs text-xs sm:text-sm leading-relaxed ${
            isUser
              ? "bg-slate-900 text-white rounded-tr-none font-sans"
              : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80 font-sans"
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="markdown-body prose max-w-none text-slate-800 prose-xs sm:prose-sm leading-relaxed">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
        </div>
        <span className={`text-[10px] text-slate-400 font-mono block ${isUser ? "text-right mr-1" : "ml-1"}`}>
          {formattedTime || "Just now"}
        </span>
      </div>
    </div>
  );
}
