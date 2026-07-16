/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ id, children, className = "", ...props }: CardProps) {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
  return (
    <div
      className={`px-6 py-5 border-b border-slate-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = "", ...props }: CardBodyProps) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  return (
    <div
      className={`px-6 py-4 bg-slate-50 border-t border-slate-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
