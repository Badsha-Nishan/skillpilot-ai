/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Users, Compass, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5K+",
    label: "Active Learners",
  },
  {
    icon: Compass,
    value: "2K+",
    label: "Roadmaps Generated",
  },
  {
    icon: MessageSquare,
    value: "12K+",
    label: "AI Conversations",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "User Satisfaction",
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-10 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-extrabold text-white">
            Trusted by Thousands of Learners
          </h2>

          <p className="mt-4 text-brand-100 leading-7">
            SkillPilot AI helps learners create personalized learning paths,
            interact with AI mentors, and stay focused on achieving career
            goals.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-brand-100 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-brand-600" />
                </div>

                <h3 className="text-4xl font-extrabold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-slate-600 font-medium">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
