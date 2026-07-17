/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, HelpCircle, ArrowUpRight } from "lucide-react";
import Card, { CardBody } from "../Card";

interface RecommendationCardsProps {
  id?: string;
  recommendations: string[];
}

export default function RecommendationCards({ id, recommendations }: RecommendationCardsProps) {
  return (
    <div id={id} className="space-y-4 text-left">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <h3 className="text-sm font-bold font-mono text-slate-400 uppercase tracking-widest">
          Recommended Learning Focus
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendations.map((path, idx) => (
          <Card
            key={idx}
            className="border border-slate-200/80 hover:border-brand-300 hover:shadow-xs transition-all duration-200"
          >
            <CardBody className="p-4 flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-grow">
                <span className="text-[9px] font-bold font-mono text-indigo-500 uppercase tracking-wider block">
                  Syllabus Path
                </span>
                <h4 className="font-extrabold text-slate-850 text-sm mt-0.5 truncate">
                  {path}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Explore curriculum tracks mapping deep competencies in this domain.
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
