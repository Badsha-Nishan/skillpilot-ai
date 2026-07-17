/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  id?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ id, value, placeholder = "Search parameters...", onChange }: SearchBarProps) {
  const [localVal, setLocalVal] = useState(value);

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  const handleClear = () => {
    setLocalVal("");
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(localVal);
    }
  };

  return (
    <div id={id} className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      
      <input
        type="text"
        value={localVal}
        onChange={(e) => {
          setLocalVal(e.target.value);
          // Let's pass the value upward instantly for responsive query search
          onChange(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 rounded-xl shadow-xs text-slate-800 placeholder-slate-400 focus:outline-hidden transition-all"
      />

      {localVal && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-4 w-4 bg-slate-50 hover:bg-slate-100 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
}
