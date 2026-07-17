/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { learningPathFormSchema, LearningPathFormInput } from "../utils/validation";
import { LearningPath } from "./LearningPathCard";
import Card, { CardHeader, CardBody } from "./Card";
import Input from "./Input";
import Button from "./Button";
import { ArrowLeft, Rocket, Save, Layers, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface AddLearningPathPageProps {
  id?: string;
  editingPath?: LearningPath | null;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CATEGORIES = [
  "Artificial Intelligence",
  "Software Engineering",
  "Frontend Development",
  "Cloud Architecture",
  "Cybersecurity",
  "UI/UX Design",
];

export default function AddLearningPathPage({
  id,
  editingPath = null,
  onCancel,
  onSuccess,
}: AddLearningPathPageProps) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to retrieve editingPath from router state or props
  const routerStatePath = location.state?.path as LearningPath | undefined;
  const activeEditingPath = routerStatePath !== undefined ? routerStatePath : editingPath;
  const isEditMode = !!activeEditingPath;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(isEditMode ? "/dashboard/manage-learning-paths" : "/dashboard");
    }
  };

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/dashboard/manage-learning-paths");
    }
  };

  // Initialize Form with default values (populates existing attributes if in edit mode)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LearningPathFormInput>({
    resolver: zodResolver(learningPathFormSchema),
    defaultValues: {
      title: activeEditingPath?.title || "",
      shortDescription: activeEditingPath?.shortDescription || "",
      fullDescription: activeEditingPath?.fullDescription || "",
      category: activeEditingPath?.category || "",
      level: activeEditingPath?.level || "Beginner",
      duration: activeEditingPath?.duration || "",
      image: activeEditingPath?.image || "",
      tagsString: activeEditingPath?.tags ? activeEditingPath.tags.join(", ") : "",
    },
  });

  // Mutation for creating or editing learning paths
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      if (isEditMode && activeEditingPath) {
        const response: any = await api.patch(`/learning-paths/${activeEditingPath.id}`, formData);
        return response.data;
      } else {
        const response: any = await api.post("/learning-paths", formData);
        return response.data;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["learningPaths"] });
      if (isEditMode && activeEditingPath) {
        queryClient.invalidateQueries({ queryKey: ["learningPath", activeEditingPath.id] });
      }
      
      toast.success(
        isEditMode
          ? "Learning path properties compiled & saved successfully."
          : "Your new learning path is now active on the radar."
      );
      handleSuccess();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to commit trajectory changes. Please review parameters.");
    },
  });

  const onSubmit = (data: LearningPathFormInput) => {
    // Process comma-separated tags string into a robust string array
    const tags = data.tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const payload = {
      title: data.title,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      category: data.category,
      level: data.level,
      duration: data.duration,
      image: data.image || undefined,
      tags,
    };

    mutation.mutate(payload);
  };

  return (
    <div id={id} className="space-y-6 max-w-2xl mx-auto">
      {/* Navigation Control */}
      <div className="flex items-center text-left">
        <button
          onClick={handleCancel}
          className="flex items-center gap-1.5 text-slate-600 hover:text-brand-600 text-sm font-semibold group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Cancel and Return
        </button>
      </div>

      <Card className="shadow-xl border border-slate-200">
        <CardHeader className="bg-slate-50/50 py-6 border-b border-slate-100 flex items-center gap-4 px-8 text-left">
          <div className="h-11 w-11 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
            {isEditMode ? <Save className="h-5.5 w-5.5" /> : <Rocket className="h-5.5 w-5.5" />}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {isEditMode ? "Modify Path Config" : "Launch Learning Path"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify telemetry variables, tags, and curricular outlines for student nodes.
            </p>
          </div>
        </CardHeader>

        <CardBody className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
            {/* Title */}
            <Input
              id="title"
              label="Learning Path Title"
              placeholder="e.g., Master Advanced Neural Network Architectures"
              error={errors.title?.message}
              {...register("title")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-slate-400" />
                  Technical Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    {...register("category")}
                    className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl appearance-none text-slate-700 font-medium focus:outline-hidden transition-all focus:ring-2 ${
                      errors.category
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
                        : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/15"
                    }`}
                  >
                    <option value="">Select Category...</option>
                    {CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.category.message}</p>
                )}
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Target Proficiency Level
                </label>
                <select
                  id="level"
                  {...register("level")}
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl appearance-none text-slate-700 font-medium focus:outline-hidden transition-all focus:ring-2 ${
                    errors.level
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
                      : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/15"
                  }`}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.level && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.level.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Duration */}
              <Input
                id="duration"
                label="Timeline Duration"
                placeholder="e.g., 14 Hours or 4 Weeks"
                error={errors.duration?.message}
                {...register("duration")}
              />

              {/* Thumbnail image URL */}
              <Input
                id="image"
                label="Thumbnail Image URL (Optional)"
                placeholder="https://images.unsplash.com/photo-..."
                error={errors.image?.message}
                {...register("image")}
              />
            </div>

            {/* Short Description */}
            <Input
              id="shortDescription"
              label="Elevator Short Summary"
              placeholder="Highlight the key outcome in a couple of sentences..."
              error={errors.shortDescription?.message}
              {...register("shortDescription")}
            />

            {/* Full Syllabus Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Full Curriculum Syllabus (Markdown compatible)
              </label>
              <textarea
                id="fullDescription"
                rows={6}
                placeholder="Provide complete structural schedules, required resource nodes, and flight steps..."
                {...register("fullDescription")}
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl placeholder-slate-400 focus:outline-hidden transition-all focus:ring-2 ${
                  errors.fullDescription
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/15 text-red-900"
                    : "border-slate-200 focus:border-brand-500 focus:ring-brand-500/15 text-slate-800"
                }`}
              />
              {errors.fullDescription && (
                <p className="text-xs text-red-600 mt-1 font-semibold">{errors.fullDescription.message}</p>
              )}
            </div>

            {/* Tags separated by commas */}
            <Input
              id="tagsString"
              label="Search tags (Separated by commas)"
              placeholder="e.g., React, AI, LLM, Vector, Hooks"
              error={errors.tagsString?.message}
              {...register("tagsString")}
            />

            {/* Submit Block */}
            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={mutation.isPending}
              >
                Abort
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={mutation.isPending}
                leftIcon={isEditMode ? <Save className="h-4.5 w-4.5" /> : <Rocket className="h-4.5 w-4.5" />}
              >
                {isEditMode ? "Save Configurations" : "Launch Active Orbit"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
