/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SearchSlash, HelpCircle } from "lucide-react";
import Button from "./Button";

interface EmptyStateProps {
  id?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ id, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-white max-w-lg mx-auto"
    >
      <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-5">
        <SearchSlash className="h-7 w-7" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-950 tracking-tight">
        {title}
      </h3>
      
      <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
