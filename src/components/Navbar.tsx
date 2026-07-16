/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Shield, HelpCircle, Activity, Globe } from "lucide-react";

interface NavbarProps {
  id?: string;
  activeView: string;
  onViewChange: (view: string) => void;
  backendHealthy: boolean | null;
}

export default function Navbar({ id, activeView, onViewChange, backendHealthy }: NavbarProps) {
  return (
    <nav
      id={id}
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => onViewChange("home")}
            >
              <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/30">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                SkillPilot <span className="text-brand-600 font-medium">AI</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onViewChange("home")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "home"
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Compass className="h-4 w-4" />
                Dashboard Base
              </button>
              <button
                onClick={() => onViewChange("loading")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "loading"
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Activity className="h-4 w-4" />
                Simulate Loading
              </button>
              <button
                onClick={() => onViewChange("404")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "404"
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                Simulate 404
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Backend Health Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <Globe className="h-3.5 w-3.5 text-slate-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-500">API:</span>
              <span className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    backendHealthy === true
                      ? "bg-emerald-500 animate-pulse"
                      : backendHealthy === false
                      ? "bg-rose-500"
                      : "bg-amber-400 animate-bounce"
                  }`}
                />
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  {backendHealthy === true
                    ? "healthy"
                    : backendHealthy === false
                    ? "offline"
                    : "connecting"}
                </span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1.5 rounded-md border border-slate-200/50">
                <Shield className="h-3.5 w-3.5 text-brand-500" />
                <span>Phase 1 Sandbox</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
