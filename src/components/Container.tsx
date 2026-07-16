/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Container({ id, children, className = "", ...props }: ContainerProps) {
  return (
    <div
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
