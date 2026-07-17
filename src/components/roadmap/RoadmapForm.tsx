/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  CheckSquare,
  Sparkles,
} from "lucide-react";
import Button from "../Button";

// Define validation schema using Zod
const roadmapSchema = z.object({
  currentLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  careerGoal: z
    .string()
    .min(3, "Career goal must be at least 3 characters long.")
    .max(100, "Goal is too long. Please summarize in under 100 characters."),
  weeklyHours: z.number()
    .min(1, "Syllabus requires at least 1 study hour per week.")
    .max(168, "Maximum study hours is 168 per week."),
  learningStyle: z.string().min(1, "Please choose a preferred learning style."),
  existingSkills: z.string().optional(),
});

export type RoadmapFormValues = {
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  careerGoal: string;
  weeklyHours: number;
  learningStyle: string;
  existingSkills?: string;
};

interface RoadmapFormProps {
  id?: string;
  onSubmit: (values: RoadmapFormValues) => void;
  isLoading: boolean;
}

export default function RoadmapForm({ id, onSubmit, isLoading }: RoadmapFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoadmapFormValues>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      currentLevel: "Beginner",
      careerGoal: "",
      weeklyHours: 10,
      learningStyle: "Practical/Hands-on",
      existingSkills: "",
    },
  });

  const selectedLevel = watch("currentLevel");
  const selectedStyle = watch("learningStyle");

  const learningStyles = [
    { value: "Practical/Hands-on", label: "Practical", desc: "Building mini-projects & writing code" },
    { value: "Visual", label: "Visual", desc: "Interactive charts, diagrams & videos" },
    { value: "Theoretical", label: "Theoretical", desc: "Documentation, algorithms & books" },
    { value: "Project-driven", label: "Project-driven", desc: "End-to-end applications from scratch" },
  ];

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-left max-w-2xl mx-auto"
    >
      {/* 1. Career Goal */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
          What is your ultimate career goal?
        </label>
        <p className="text-xs text-slate-400">
          Be specific (e.g., "Senior React Developer", "Kubernetes Systems Architect", "Python AI Analyst")
        </p>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Compass className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., Senior Full-Stack AI Engineer"
            disabled={isLoading}
            className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 ${
              errors.careerGoal
                ? "border-red-300 focus:ring-red-500/15 focus:border-red-500"
                : "border-slate-200 focus:ring-brand-500/15 focus:border-brand-500"
            }`}
            {...register("careerGoal")}
          />
        </div>
        {errors.careerGoal && (
          <p className="text-xs font-bold text-red-500 font-mono mt-1">
            {errors.careerGoal.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 2. Current Skill Level */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
            Current Skill Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                disabled={isLoading}
                onClick={() => setValue("currentLevel", lvl)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedLevel === lvl
                    ? "bg-brand-50 border-brand-500 text-brand-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Weekly Hours Commitment */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
            Weekly Study Hours
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Clock className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              type="number"
              min="1"
              max="168"
              disabled={isLoading}
              className={`w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 ${
                errors.weeklyHours
                  ? "border-red-300 focus:ring-red-500/15 focus:border-red-500"
                  : "border-slate-200 focus:ring-brand-500/15 focus:border-brand-500"
              }`}
              {...register("weeklyHours", { valueAsNumber: true })}
            />
          </div>
          {errors.weeklyHours && (
            <p className="text-xs font-bold text-red-500 font-mono mt-1">
              {errors.weeklyHours.message}
            </p>
          )}
        </div>
      </div>

      {/* 4. Preferred Learning Style */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
          Preferred Learning Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {learningStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              disabled={isLoading}
              onClick={() => setValue("learningStyle", style.value)}
              className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                selectedStyle === style.value
                  ? "bg-brand-50/70 border-brand-500 text-slate-900"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="text-xs font-extrabold text-slate-800">{style.label}</span>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5 leading-snug">
                {style.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Existing Skills */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest block">
          Existing Skills & Tools (Optional)
        </label>
        <p className="text-xs text-slate-400">
          Comma-separated list of what you already know (e.g., "HTML, CSS, JavaScript, Git")
        </p>
        <div className="relative">
          <div className="absolute top-3 left-3.5 pointer-events-none">
            <CheckSquare className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <textarea
            placeholder="e.g., React basics, basic CSS, NodeJS, PostgreSQL"
            disabled={isLoading}
            rows={2}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 focus:border-brand-500 placeholder-slate-400"
            {...register("existingSkills")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full sm:w-auto px-6.5 py-3 font-extrabold uppercase tracking-widest text-xs"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Generate Custom Roadmap
        </Button>
      </div>
    </form>
  );
}
