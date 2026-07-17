/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import Button from "../Button";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="p-3 bg-slate-50 border-t border-slate-200/60 flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "Waiting for AI Career Mentor response..." : "Ask your software engineering mentor..."}
        disabled={disabled}
        className="flex-grow text-xs sm:text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 disabled:bg-slate-100 disabled:text-slate-400 transition-all"
      />
      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="px-4.5 py-2.5 h-[40px] rounded-xl flex items-center justify-center shrink-0"
        leftIcon={disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
      />
    </div>
  );
}
