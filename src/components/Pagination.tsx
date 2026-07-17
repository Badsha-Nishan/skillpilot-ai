/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  id?: string;
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ id, page, pages, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;

  // Compile individual numbered nodes
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id={id} className="flex items-center justify-center gap-1.5 mt-8 py-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-2.5 h-9 min-w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Pages List */}
      {pageNumbers.map((num) => {
        const isActive = num === page;
        return (
          <Button
            key={num}
            variant={isActive ? "primary" : "outline"}
            size="sm"
            onClick={() => onPageChange(num)}
            className={`h-9 min-w-9 ${isActive ? "font-bold" : "text-slate-600 font-medium"}`}
          >
            {num}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === pages}
        onClick={() => onPageChange(page + 1)}
        className="px-2.5 h-9 min-w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
