/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Info, Cpu, Layers, ShieldCheck, Compass, GitBranch, Terminal } from "lucide-react";
import Card, { CardBody } from "./Card";
import Button from "./Button";

export default function AboutView() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto text-left">
      {/* Visual Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono mb-3">
          <Info className="h-3.5 w-3.5" /> SYSTEM MANIFESTO & PROFILE
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
          About SkillPilot AI
        </h1>
        <p className="text-slate-500 text-sm md:text-base mt-2 leading-relaxed">
          Uncovering professional development orbits through automated curriculum design, spatial trajectory modeling, and live skill registry telemetry.
        </p>
      </div>

      {/* Main Philosophy split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-slate-200/80">
            <CardBody className="p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">The SkillPilot Mission</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                SkillPilot AI was established to solve the fragmentation of training pipelines in modern deep tech sectors. By combining academic curriculum maps with developer skill state registries, we empower engineers to safely transition from novice student nodes into vector specialists.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our core engine designs custom learning trajectories based on technical disciplines, complexity constraints, and required durations.
              </p>
            </CardBody>
          </Card>

          <Card className="border border-slate-200/80">
            <CardBody className="p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Terminal className="h-5 w-5 text-brand-600" /> Technical Architecture
              </h2>
              <div className="space-y-3 font-mono text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-150 pb-2">
                  <span className="text-slate-400">ENGINE BASE</span>
                  <span className="font-bold">React 19.0.1 + Vite 6.2.3</span>
                </div>
                <div className="flex justify-between border-b border-slate-150 pb-2">
                  <span className="text-slate-400">ROUTING ENGINE</span>
                  <span className="font-bold text-indigo-600">React Router DOM v6</span>
                </div>
                <div className="flex justify-between border-b border-slate-150 pb-2">
                  <span className="text-slate-400">STATE CACHING</span>
                  <span className="font-bold">TanStack React Query v5</span>
                </div>
                <div className="flex justify-between border-b border-slate-150 pb-2">
                  <span className="text-slate-400">BACKEND PLATFORM</span>
                  <span className="font-bold">Node.js + Express + JWT Authentication</span>
                </div>
                <div className="flex justify-between border-b border-slate-150 pb-2">
                  <span className="text-slate-400">DATA STORE</span>
                  <span className="font-bold">MongoDB Database Node</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar details */}
        <div className="space-y-6">
          <Card className="border border-slate-200/80 bg-slate-50/40">
            <CardBody className="p-6 space-y-4">
              <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                System Pillars
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center text-brand-600 shrink-0">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Modular Layouts</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Flexible layouts isolate public content from workspace vectors.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">JWT Gatekeeper</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Role-verified access secures curriculum creation rights.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                    <GitBranch className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Custom Router</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Full programmatic navigation tracks active page states.</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="text-center">
            <Link to="/explore">
              <Button variant="primary" size="sm" className="w-full font-bold">
                Launch Explore Grid
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
