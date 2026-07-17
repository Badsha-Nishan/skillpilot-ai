/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Cpu, CheckCircle2, CircleDot, Brain } from "lucide-react";

export default function LoadingSkeleton() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Analyzing existing skill vectors & structural voids...",
    "Calculating weekly curriculum density index...",
    "Engineering chronological, project-driven study milestones...",
    "Generating custom supplemental learning path arrays...",
    "Finalizing senior mentor advice blocks...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-8 py-8 text-left max-w-3xl mx-auto">
      {/* 1. Reasoning Panel */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Abstract background neon aura */}
        <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Brain className="h-6 w-6 text-brand-400 animate-pulse shrink-0" />
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest font-mono text-brand-400">
              Agentic Career Engine Active
            </h3>
            <p className="text-[10px] font-bold font-mono text-slate-500">
              GEOMETRIC VECTOR ALIGNMENT IN PROGRESS
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="mt-6 space-y-4 font-mono text-xs">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-all duration-300 ${
                  isCompleted
                    ? "text-emerald-400 font-medium"
                    : isActive
                    ? "text-brand-300 font-extrabold"
                    : "text-slate-600 font-medium"
                }`}
              >
                <span className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isActive ? (
                    <CircleDot className="h-4 w-4 animate-ping" />
                  ) : (
                    <span className="h-4 w-4 border border-slate-750 rounded-full block" />
                  )}
                </span>
                <span className="flex-grow">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Loading typing/pulse cue */}
        <div className="mt-8 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 animate-spin text-indigo-400" />
            <span className="font-bold">Gemini Agent reasoning:</span>
            <span className="text-slate-200 inline-block animate-pulse">
              thinking step-by-step...
            </span>
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce delay-75" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce delay-150" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce delay-225" />
          </div>
        </div>
      </div>

      {/* 2. Roadmap Pulse Skeleton Preview */}
      <div className="space-y-6 opacity-40 select-none pointer-events-none animate-pulse">
        {/* Title skeleton */}
        <div className="space-y-2 pb-5 border-b border-slate-200">
          <div className="h-7 bg-slate-200 rounded-lg w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>

        {/* Info stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="h-14 bg-slate-100 border border-slate-200 rounded-xl" />
          <div className="h-14 bg-slate-100 border border-slate-200 rounded-xl" />
          <div className="h-14 bg-slate-100 border border-slate-200 rounded-xl" />
        </div>

        {/* Syllabus list skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((week) => (
            <div key={week} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-white">
              <div className="flex justify-between items-center">
                <div className="h-4.5 bg-slate-200 rounded w-1/4" />
                <div className="h-3 bg-slate-200 rounded w-10" />
              </div>
              <div className="h-3.5 bg-slate-200 rounded w-5/6" />
              <div className="h-3.5 bg-slate-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
