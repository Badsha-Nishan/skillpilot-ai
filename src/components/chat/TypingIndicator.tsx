/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Cpu } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 mr-auto max-w-[85%] items-start animate-fade-in">
      <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
        <Cpu className="h-4 w-4 animate-spin-slow" />
      </div>

      <div className="space-y-1">
        <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5 h-10 shadow-3xs">
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <span className="text-[10px] text-slate-400 font-mono tracking-wider block ml-1 uppercase">
          Compiling telemetry...
        </span>
      </div>
    </div>
  );
}
