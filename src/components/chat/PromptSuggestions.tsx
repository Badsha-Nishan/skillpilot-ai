/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles } from "lucide-react";

interface PromptSuggestionsProps {
  onSelect: (text: string) => void;
}

export default function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  const suggestions = [
    {
      title: "Transition to AI Engineer",
      subtitle: "What is the concrete roadmap to move into AI/ML roles?",
      prompt: "I want to transition to an AI Engineer. What specific concepts, math, and tools should I master first, and which of my existing learning paths can support this transition?",
    },
    {
      title: "Vector Databases & Indexes",
      subtitle: "When should I use PostgreSQL PGVector vs Pinecone?",
      prompt: "Explain the differences between PostgreSQL with PGVector and specialized vector databases like Pinecone. When is each appropriate for production architectures?",
    },
    {
      title: "Full-Stack System Design",
      subtitle: "How should I structure Node.js apps for high scaling?",
      prompt: "What are the industry best practices for structuring an Express + Mongoose Node.js backend to support high concurrency, rate-limiting, and resilient token validation?",
    },
    {
      title: "Accelerate My Learning Path",
      subtitle: "How do I retain complex algorithms quickly?",
      prompt: "I am working through my customized learning paths. What specific spaced-repetition and hands-on laboratory methods do you suggest to master complex software algorithms?",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
        <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
        Consultation Coordinates
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(s.prompt)}
            className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 border border-slate-200/80 rounded-xl transition-all duration-150 group"
          >
            <div className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-slate-950 font-sans">
              {s.title}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 leading-normal">
              {s.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
