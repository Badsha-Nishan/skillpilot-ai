/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Compass,
  Bot,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Compass,
    title: "AI Learning Roadmaps",
    description:
      "Generate personalized learning roadmaps based on your career goal, current skill level, and available study time.",
    link: "/roadmap",
  },
  {
    icon: MessageSquare,
    title: "AI Career Mentor",
    description:
      "Ask follow-up questions, receive context-aware answers, and continue conversations with your AI learning assistant.",
    link: "/mentor",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey, revisit saved roadmaps, and keep track of your AI-assisted career growth.",
    link: "/dashboard",
  },
  {
    icon: Bot,
    title: "Smart Recommendations",
    description:
      "Receive intelligent suggestions for technologies, resources, and next learning steps tailored to your profile.",
    link: "/roadmap",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-4 py-1 text-sm font-semibold">
            Platform Features
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
            Everything You Need To Learn Smarter
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            SkillPilot AI combines intelligent roadmap generation,
            conversational AI, and personalized recommendations to help you
            build a structured learning journey.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-brand-300 hover:shadow-xl"
              >
                <div className="h-14 w-14 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 leading-6 mb-6">
                  {feature.description}
                </p>

                <Link
                  to={feature.link}
                  className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
