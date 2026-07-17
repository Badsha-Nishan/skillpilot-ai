/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Compass, Cpu, Target, Award, ArrowRight, Layers, GraduationCap, CheckCircle } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import Button from "./Button";

export default function HomeLandingView() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16 py-6 text-left">
      {/* Visual Elegant Hero Block */}
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,#4f46e5,transparent_50%)]" />
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent hidden md:block" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-xs font-mono uppercase tracking-wide">
            <Cpu className="h-3.5 w-3.5 animate-pulse" /> Advanced Skill Mapping Matrix
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-sans">
            Navigate Your AI Engineering Trajectory
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-sans">
            SkillPilot AI compiles deep academic curriculums and precision training flight paths tailored for vector scientists, neural architects, and full-stack software engineers.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/explore">
              <Button
                variant="primary"
                size="lg"
                className="font-bold tracking-wide"
                rightIcon={<ArrowRight className="h-4.5 w-4.5" />}
              >
                Launch Explore Grid
              </Button>
            </Link>
            
            {!isAuthenticated ? (
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-700 hover:border-slate-500 text-white hover:bg-slate-800/50"
                >
                  Create Pilot Profile
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-500/30 hover:border-brand-500/60 text-brand-300 hover:bg-brand-950/25"
                >
                  Go to Command Center
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Key Features (Swiss Style Minimal Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col items-start space-y-4">
          <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
            <Compass className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Structured Curriculums</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Acquire specialized intelligence. Explore carefully curated courses, difficulty profiles, and detailed blueprints spanning cutting-edge tech.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col items-start space-y-4">
          <div className="h-10 w-10 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center text-brand-600">
            <Target className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Custom Path Launching</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Registered creators can design, catalog, and launch customized educational orbits. Adapt metadata parameters dynamically.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col items-start space-y-4">
          <div className="h-10 w-10 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
            <Award className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Skill Registry</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Add skill nodes, visualize cumulative category densities, and confirm API gateways instantly from a centralized command center.
          </p>
        </div>
      </div>

      {/* Advanced Capabilities / Overview list */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
            Evolve from Student Node to Master Aviator
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our multi-tiered telemetry engine tracks proficiency scores, generates visual representation matrices, and links with live learning pathways.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              "Artificial Intelligence",
              "Neural Architecture",
              "UI/UX Design Systems",
              "Cloud Architecture",
            ].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold font-sans">
                <CheckCircle className="h-4 w-4 text-brand-600 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 w-full max-w-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-brand-600" />
              <span className="text-sm font-extrabold text-slate-950">Active Flight Trajectory</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-bold uppercase">
              Phase 3
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Pathways catalogued:</span>
              <span className="font-mono font-bold text-slate-800">12 Trajectories</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Active Aviator Nodes:</span>
              <span className="font-mono font-bold text-slate-800">1,248 Pilots</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Platform Framework:</span>
              <span className="font-mono font-bold text-slate-800">React Router DOM</span>
            </div>
          </div>
          <Link to="/explore" className="block w-full">
            <Button variant="primary" className="w-full text-xs font-bold py-2">
              Explore Available Tracks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
