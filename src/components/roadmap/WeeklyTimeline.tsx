/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { WeeklyPlanItem } from "../../../server/modules/ai/ai.service";
import {
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface WeeklyTimelineProps {
  id?: string;
  plan: WeeklyPlanItem[];
}

export default function WeeklyTimeline({ id, plan }: WeeklyTimelineProps) {
  // Local state to keep track of completed weeks
  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>({});
  // Local state to keep track of collapsed weeks
  const [collapsedWeeks, setCollapsedWeeks] = useState<Record<number, boolean>>({});

  const toggleWeekCompleted = (weekNum: number) => {
    setCompletedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  const toggleWeekCollapsed = (weekNum: number) => {
    setCollapsedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  return (
    <div id={id} className="space-y-6 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-brand-600" />
        <h3 className="text-sm font-bold font-mono text-slate-400 uppercase tracking-widest">
          Syllabus Milestones Timeline
        </h3>
      </div>

      <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6">
        {plan.map((item) => {
          const isCompleted = !!completedWeeks[item.week];
          const isCollapsed = !!collapsedWeeks[item.week];

          return (
            <div key={item.week} className="relative group">
              {/* Timeline Stepper Marker Button */}
              <button
                onClick={() => toggleWeekCompleted(item.week)}
                title={isCompleted ? "Mark week as incomplete" : "Mark week as complete"}
                className="absolute -left-[37px] top-1 bg-white p-1 rounded-full transition-all focus:outline-hidden z-10"
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 fill-emerald-50" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-300 group-hover:text-brand-500 hover:scale-110" />
                )}
              </button>

              {/* Main Card */}
              <div
                className={`bg-white border rounded-2xl shadow-xs transition-all overflow-hidden ${
                  isCompleted ? "border-emerald-100 bg-emerald-50/10" : "border-slate-200/80"
                } ${isCollapsed ? "py-3 px-4" : "p-6"}`}
              >
                {/* Card Header (always visible) */}
                <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => toggleWeekCollapsed(item.week)}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold font-mono rounded-md uppercase tracking-wide ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Week {item.week}
                    </span>
                    <h4
                      className={`font-extrabold text-sm sm:text-base tracking-tight transition-colors ${
                        isCompleted
                          ? "text-emerald-900 line-through"
                          : "text-slate-900 group-hover:text-brand-600"
                      }`}
                    >
                      {item.goal}
                    </h4>
                  </div>

                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                  >
                    {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </button>
                </div>

                {/* Card Content (collapsible) */}
                {!isCollapsed && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-5 animate-fade-in">
                    {/* Topics Sub-Section */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                        Core Subjects & Mastery Vectors
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {item.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Projects Sub-Section */}
                    {item.projects && item.projects.length > 0 && (
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                          Practical Exercises & Lab Challenges
                        </span>
                        <div className="grid grid-cols-1 gap-3">
                          {item.projects.map((proj, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/60 rounded-xl"
                            >
                              <span className="p-1 rounded bg-brand-50 text-brand-600 shrink-0 mt-0.5">
                                <Sparkles className="h-3.5 w-3.5" />
                              </span>
                              <div className="text-xs text-slate-700 leading-relaxed font-semibold">
                                {proj}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
