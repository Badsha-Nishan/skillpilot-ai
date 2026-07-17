/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Cpu, Terminal, Compass, GraduationCap } from "lucide-react";

export default function EmptyChatState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-xl mx-auto space-y-6">
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm animate-bounce-slow">
          <Cpu className="h-8 w-8" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Pilot online">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-950 tracking-tight">
          Your Career Mentor is ready
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          I understand your learning paths, skill roadmap, and technical ambitions.
          Let's map out your next software engineering career milestone together.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 uppercase tracking-wide font-mono">
            <Compass className="h-3.5 w-3.5 text-indigo-500" />
            Skill Mapping
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Discuss transitions to roles like ML Engineer, Tech Lead, or Full-Stack developer.
          </p>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 uppercase tracking-wide font-mono">
            <Terminal className="h-3.5 w-3.5 text-indigo-500" />
            Code & Architecture
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Get structured advice on system design, databases, API integration, and framework configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
