/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatsCard from "./StatsCard";
import DashboardCharts from "./DashboardCharts";
import EmptyState from "./EmptyState";
import {
  BookOpen,
  TrendingUp,
  Zap,
  Crown,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Button from "./Button";

interface DashboardStats {
  totalPaths: number;
  beginnerCount: number;
  intermediateCount: number;
  advancedCount: number;
  categoryStats: Array<{ category: string; count: number }>;
  monthlyStats: Array<{ month: string; count: number }>;
}

export default function DashboardHomePage() {
  const navigate = useNavigate();

  // Fetch stats from dashboard API
  const { data, isLoading, isError, error, refetch } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res: any = await api.get("/dashboard/stats");
      return res.data;
    },
  });

  const handleAddNewPath = () => {
    navigate("/dashboard/add-learning-path");
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto my-12 text-left">
        <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-red-800">Telemetry Handshake Error</h3>
        <p className="text-sm text-red-600 mt-2 leading-relaxed">
          {(error as any)?.message || "Failed to download system telemetry logs."}
        </p>
        <div className="mt-5 flex justify-center">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry Handshake
          </Button>
        </div>
      </div>
    );
  }

  const stats = data || {
    totalPaths: 0,
    beginnerCount: 0,
    intermediateCount: 0,
    advancedCount: 0,
    categoryStats: [],
    monthlyStats: [],
  };

  if (stats.totalPaths === 0) {
    return (
      <div className="space-y-6">
        <div className="text-left pb-5 border-b border-slate-200">
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry of learning paths across the pilot registry.
          </p>
        </div>
        <EmptyState
          title="No Learning Trajectories Located"
          description="The pilot registry is currently empty. Launch a custom, multi-week learning path syllabus to activate system analytics."
          actionLabel="Launch Custom Path"
          onAction={handleAddNewPath}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry of learning paths across the pilot registry.
          </p>
        </div>

        <button
          onClick={handleAddNewPath}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="h-4.5 w-4.5" />
          Launch New Path
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Learning Paths"
          value={stats.totalPaths}
          icon={BookOpen}
          colorClass="text-brand-600"
          bgColorClass="bg-brand-50"
        />
        <StatsCard
          title="Beginner Paths"
          value={stats.beginnerCount}
          icon={TrendingUp}
          colorClass="text-indigo-600"
          bgColorClass="bg-indigo-50"
        />
        <StatsCard
          title="Intermediate Paths"
          value={stats.intermediateCount}
          icon={Zap}
          colorClass="text-amber-600"
          bgColorClass="bg-amber-50"
        />
        <StatsCard
          title="Advanced Paths"
          value={stats.advancedCount}
          icon={Crown}
          colorClass="text-rose-600"
          bgColorClass="bg-rose-50"
        />
      </div>

      {/* Charts Grid Section */}
      <div className="pt-2">
        <DashboardCharts
          beginnerCount={stats.beginnerCount}
          intermediateCount={stats.intermediateCount}
          advancedCount={stats.advancedCount}
          categoryStats={stats.categoryStats}
          monthlyStats={stats.monthlyStats}
        />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse text-left">
      {/* Header Skeleton */}
      <div className="pb-5 border-b border-slate-200">
        <div className="h-8 bg-slate-200 rounded w-1/4 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs"
          >
            <div className="h-12 w-12 rounded-xl bg-slate-200 mr-4 shrink-0 animate-pulse" />
            <div className="space-y-2 flex-grow min-w-0">
              <div className="h-3 bg-slate-200 rounded w-2/3" />
              <div className="h-6 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        <div className="lg:col-span-6 h-80 bg-slate-200 border border-slate-100 rounded-2xl" />
        <div className="lg:col-span-6 h-80 bg-slate-200 border border-slate-100 rounded-2xl" />
        <div className="lg:col-span-12 h-80 bg-slate-200 border border-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}
