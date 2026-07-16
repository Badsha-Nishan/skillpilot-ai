/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Compass, Mail, Github, Heart } from "lucide-react";

interface FooterProps {
  id?: string;
}

export default function Footer({ id }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id={id} className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Compass className="h-4.5 w-4.5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                SkillPilot <span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The next-generation, AI-assisted skill auditing, mapping, and career development system. Chart your flight path to career mastery with precision telemetry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              System Matrix
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Frontend Client SPA
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Express API Services
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  MongoDB Mongoose Schemas
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  TanStack State Engine
                </span>
              </li>
            </ul>
          </div>

          {/* Contact / Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Metadata & Ingress
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" />
                <span>support@skillpilot.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-brand-400" />
                <span>github.com/skillpilot</span>
              </div>
              <div className="pt-2 text-xs text-brand-300 font-mono bg-brand-950/40 p-2 rounded border border-brand-800/30">
                HOST_PORT: 3000
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} SkillPilot AI. All rights reserved. Registered Production Release.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> in Phase 1 Core Sandbox
          </p>
        </div>
      </div>
    </footer>
  );
}
