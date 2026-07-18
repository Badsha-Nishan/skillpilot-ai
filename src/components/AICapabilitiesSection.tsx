/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Bot, Compass, MessageSquare, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Compass,
    title: "AI Roadmap Generator",
    description:
      "Generate personalized learning roadmaps based on your career goal, experience level, available study time, and learning preferences.",
    points: [
      "Personalized study plans",
      "Weekly milestones",
      "Adaptive learning path",
      "Career-focused roadmap",
    ],
    link: "/roadmap",
    button: "Generate Roadmap",
  },
  {
    icon: MessageSquare,
    title: "AI Career Assistant",
    description:
      "Chat with an intelligent AI mentor that understands your roadmap, remembers previous conversations, and provides contextual guidance.",
    points: [
      "Conversation history",
      "Context-aware responses",
      "Typing indicator",
      "Follow-up suggestions",
    ],
    link: "/mentor",
    button: "Start Chat",
  },
];

export default function AICapabilitiesSection() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            <Bot className="h-4 w-4" />
            AI Capabilities
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
            Powered by Intelligent AI
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            SkillPilot AI combines advanced language models with personalized
            career guidance to help learners build skills efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-7 mb-6">
                  {item.description}
                </p>

                <div className="space-y-3 mb-8">
                  {item.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-slate-700"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors"
                >
                  {item.button}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
