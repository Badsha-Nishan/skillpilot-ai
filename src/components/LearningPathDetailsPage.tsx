/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { ArrowLeft, Clock, BarChart2, Tag, Calendar, User, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import Button from "./Button";
import Card, { CardBody } from "./Card";
import LearningPathCard, { LearningPath } from "./LearningPathCard";

interface LearningPathDetailsPageProps {
  id?: string;
  pathId?: string;
  onBack?: () => void;
  onViewPath?: (id: string) => void;
}

export default function LearningPathDetailsPage({ id, pathId, onBack, onViewPath }: LearningPathDetailsPageProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Pick the active path ID from route params or fallback to props
  const activePathId = paramId || pathId || "";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/explore");
    }
  };

  const handleViewPath = (newId: string) => {
    if (onViewPath) {
      onViewPath(newId);
    } else {
      navigate(`/learning-path/${newId}`);
    }
  };

  // 1. Fetch current path details
  const { data: path, isLoading, isError, error } = useQuery<LearningPath>({
    queryKey: ["learningPath", activePathId],
    queryFn: async () => {
      if (!activePathId) throw new Error("No active path ID specified.");
      const response: any = await api.get(`/learning-paths/${activePathId}`);
      return response.data;
    },
    enabled: !!activePathId,
  });

  // 2. Fetch related paths from the same category
  const { data: relatedData } = useQuery({
    queryKey: ["relatedLearningPaths", path?.category, activePathId],
    queryFn: async () => {
      if (!path?.category) return { paths: [] };
      const response: any = await api.get("/learning-paths", {
        params: {
          category: path.category,
          limit: 4,
        },
      });
      return response.data;
    },
    enabled: !!path?.category,
  });

  // Filter out the active path from related paths list
  const relatedPaths: LearningPath[] = (relatedData?.paths || []).filter(
    (p: LearningPath) => p.id !== activePathId
  ).slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-left">
        <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500 font-mono animate-pulse">
          Downloading path specifications...
        </p>
      </div>
    );
  }

  if (isError || !path) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto my-12 text-left">
        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
        <h3 className="font-bold text-red-800">Resource Retrieval Failed</h3>
        <p className="text-sm text-red-600 mt-1">
          {(error as any)?.message || "Specified learning path could not be located."}
        </p>
        <Button variant="outline" size="sm" onClick={handleBack} className="mt-4">
          Return to Hub
        </Button>
      </div>
    );
  }

  return (
    <div id={id} className="space-y-8 max-w-5xl mx-auto text-left">
      {/* Navigation Back Control */}
      <div className="flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-slate-600 hover:text-brand-600 text-sm font-semibold group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explorations
        </button>
      </div>

      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        {/* Banner image */}
        <div className="md:col-span-5 h-64 md:h-auto bg-slate-100 overflow-hidden relative">
          <img
            src={path.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"}
            alt={path.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 md:hidden">
            <span className="px-2.5 py-1 bg-brand-600 text-white font-bold text-[10px] uppercase tracking-wider rounded">
              {path.category}
            </span>
          </div>
        </div>

        {/* Hero Metadata */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
          <span className="hidden md:inline-block self-start px-2.5 py-1 bg-brand-50 text-brand-700 font-bold text-[10px] uppercase tracking-wider rounded border border-brand-100 mb-4">
            {path.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {path.title}
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-2.5 leading-relaxed">
            {path.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-6 pt-5 border-t border-slate-100 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <BarChart2 className="h-4.5 w-4.5 text-brand-500" />
              <span className="font-semibold">{path.level} Level</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4.5 w-4.5 text-indigo-500" />
              <span className="font-semibold">{path.duration} Timeline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-slate-400" />
              <span>Created {new Date(path.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content splits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Full Syllabus Description */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-slate-200/80">
            <CardBody className="p-6 md:p-8 text-left">
              <h2 className="text-xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-brand-600" />
                Comprehensive Curriculum Blueprint
              </h2>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-wrap">
                {path.fullDescription}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Creator Profile Card */}
          <Card className="border border-slate-200/80 bg-slate-50/40">
            <CardBody className="p-6 text-left">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-4">
                Vector Flight Pilot
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={path.creator?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                  alt={path.creator?.name || "System"}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full border border-slate-200 object-cover shrink-0"
                />
                <div className="truncate">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {path.creator?.name || "Senior Aviator"}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                    {path.creator?.role || "user"} Node
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-150 text-[11px] text-slate-500 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{path.creator?.email || "system@skillpilot.ai"}</span>
              </div>
            </CardBody>
          </Card>

          {/* Tag Cloud */}
          <Card className="border border-slate-200/80">
            <CardBody className="p-6 text-left">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                Syllabus Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {path.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Related Learning Paths */}
      {relatedPaths.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight text-left mb-6">
            Recommended In Same Quadrant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPaths.map((p) => (
              <LearningPathCard
                key={p.id}
                path={p}
                onView={handleViewPath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
