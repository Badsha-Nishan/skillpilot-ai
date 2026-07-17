/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyChatState from "./EmptyChatState";
import PromptSuggestions from "./PromptSuggestions";
import ChatInput from "./ChatInput";
import { Message } from "./types";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onSelectSuggestion: (text: string) => void;
  disabled?: boolean;
}

export default function ChatWindow({
  messages,
  isTyping,
  onSend,
  onSelectSuggestion,
  disabled,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on message updates or typing indicator toggles
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const hasMessages = messages && messages.length > 0;

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Scrollable message container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 min-h-0 bg-white">
        {!hasMessages ? (
          <div className="space-y-6">
            <EmptyChatState />
            <div className="max-w-xl mx-auto px-4 pb-4">
              <PromptSuggestions onSelect={onSelectSuggestion} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      {/* Input section */}
      <ChatInput onSend={onSend} disabled={disabled || isTyping} />
    </div>
  );
}
