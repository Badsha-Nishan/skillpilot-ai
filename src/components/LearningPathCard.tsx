/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Clock, BarChart, Tag, Eye, Edit3, Trash2, User } from "lucide-react";
import Card, { CardBody } from "./Card";
import Button from "./Button";

export interface Creator {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: string;
}

export interface LearningPath {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  image: string;
  tags: string[];
  createdBy: string;
  creator?: Creator;
  createdAt: string;
  updatedAt: string;
}

interface LearningPathCardProps {
  id?: string;
  path: LearningPath;
  isManage?: boolean;
  onView: (id: string) => void;
  onEdit?: (path: LearningPath) => void;
  onDelete?: (id: string) => void;
}

export default function LearningPathCard({
  id,
  path,
  isManage = false,
  onView,
  onEdit,
  onDelete,
}: LearningPathCardProps) {
  // Return correct color badges based on skill levels
  const getLevelBadgeStyles = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-150";
      case "Intermediate":
        return "bg-blue-50 text-blue-700 border-blue-150";
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-150";
      default:
        return "bg-slate-50 text-slate-700 border-slate-150";
    }
  };

  return (
    <Card
      id={id}
      className="group flex flex-col h-full bg-white border border-slate-200/80 hover:border-brand-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
    >
      {/* Thumbnail Block */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={path.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"}
          alt={path.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 text-white backdrop-blur-xs rounded-md">
            {path.category}
          </span>
        </div>
      </div>

      <CardBody className="p-5 flex flex-col flex-grow">
        {/* Core Metadata Row */}
        <div className="flex items-center gap-3 mb-3 text-xs font-medium text-slate-500">
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getLevelBadgeStyles(path.level)}`}>
            {path.level}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {path.duration}
          </span>
        </div>

        {/* Text Details */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
          {path.title}
        </h3>
        <p className="text-slate-500 text-sm mt-1.5 mb-4 line-clamp-2 leading-relaxed">
          {path.shortDescription}
        </p>

        {/* Tag Badges */}
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {path.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 px-2 py-1 bg-slate-50 text-[10px] font-medium text-slate-600 rounded border border-slate-100"
            >
              <Tag className="h-2.5 w-2.5 text-slate-400" />
              {tag}
            </span>
          ))}
          {path.tags.length > 3 && (
            <span className="text-[10px] font-medium text-slate-400 px-1 py-1">
              +{path.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="border-t border-slate-100 my-4" />

        {/* Card Footer: Creator info and actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Creator Profile */}
          <div className="flex items-center gap-2 max-w-[50%]">
            <img
              src={path.creator?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={path.creator?.name || "Pilot"}
              referrerPolicy="no-referrer"
              className="h-6 w-6 rounded-full border border-slate-100 object-cover shrink-0"
              onError={(e) => {
                // Fallback icon
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="text-left truncate">
              <p className="text-[11px] font-semibold text-slate-700 truncate leading-tight">
                {path.creator?.name || "System Pilot"}
              </p>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                Creator
              </p>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isManage ? (
              <>
                <button
                  type="button"
                  onClick={() => onView(path.id)}
                  className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
                  title="View Path"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit && onEdit(path)}
                  className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-md transition-colors"
                  title="Edit Path"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete && onDelete(path.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-md transition-colors"
                  title="Delete Path"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(path.id)}
                className="text-xs font-semibold"
              >
                Launch Path
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
