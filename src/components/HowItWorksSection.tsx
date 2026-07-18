/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Target, Sparkles, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Define Your Goal",
    description:
      "Choose your desired career path, current experience level, weekly study time, and preferred learning style.",
  },
  {
    icon: Sparkles,
    title: "AI Creates Your Roadmap",
    description:
      "Our AI analyzes your information and generates a personalized learning roadmap with structured milestones.",
  },
  {
    icon: GraduationCap,
    title: "Learn & Improve",
    description:
      "Follow your roadmap, ask questions to the AI assistant, and continuously improve your skills with personalized guidance.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
            How SkillPilot AI Works
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            Start your learning journey in just three simple steps and receive a
            personalized AI-powered roadmap designed for your career goals.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-3 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-5 left-6 h-10 w-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mt-4 h-16 w-16 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-7 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
