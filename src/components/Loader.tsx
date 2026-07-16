/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LoaderProps {
  id?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loader({ id, size = "md", className = "" }: LoaderProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div id={id} className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-brand-500 border-t-transparent`}
      />
    </div>
  );
}
