/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  id?: string;
  title: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
}

export default function StatsCard({
  id,
  title,
  value,
  icon: Icon,
  colorClass,
  bgColorClass,
}: StatsCardProps) {
  return (
    <div
      id={id}
      className="flex items-center p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-sm transition-all text-left"
    >
      <div className={`p-3.5 rounded-xl ${bgColorClass} ${colorClass} mr-4 shrink-0`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest truncate">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-sans">
          {value}
        </p>
      </div>
    </div>
  );
}
