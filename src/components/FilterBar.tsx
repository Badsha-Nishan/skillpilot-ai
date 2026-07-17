/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Filter, SlidersHorizontal, Layers, ChevronDown } from "lucide-react";

interface FilterBarProps {
  id?: string;
  category: string;
  level: string;
  sort: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onSortChange: (sort: string) => void;
}

// Categories of Learning Paths
const CATEGORIES = [
  "Artificial Intelligence",
  "Software Engineering",
  "Frontend Development",
  "Cloud Architecture",
  "Cybersecurity",
  "UI/UX Design",
];

export default function FilterBar({
  id,
  category,
  level,
  sort,
  onCategoryChange,
  onLevelChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div
      id={id}
      className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Selector */}
        <div className="relative shrink-0 min-w-[150px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Layers className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 rounded-lg appearance-none text-slate-700 font-medium focus:outline-hidden transition-all"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Level Selector */}
        <div className="relative shrink-0 min-w-[130px]">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={level}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 rounded-lg appearance-none text-slate-700 font-medium focus:outline-hidden transition-all"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Sort Selector */}
      <div className="relative shrink-0 min-w-[150px] md:self-end">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 rounded-lg appearance-none text-slate-700 font-medium focus:outline-hidden transition-all"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
          <option value="alphabetical">Sort: Alphabetical</option>
          <option value="duration">Sort: Duration</option>
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
