/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/AuthProvider";
import api from "../services/api";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import LearningPathCard, { LearningPath } from "./LearningPathCard";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { Compass, Sparkles, Loader2, AlertCircle } from "lucide-react";

interface ExplorePageProps {
  id?: string;
  onViewPath?: (id: string) => void;
  onAddNewPath?: () => void;
}

export default function ExplorePage({ id, onViewPath, onAddNewPath }: ExplorePageProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleViewPath = (pathId: string) => {
    if (onViewPath) {
      onViewPath(pathId);
    } else {
      navigate(`/learning-path/${pathId}`);
    }
  };

  const handleAddNewPath = () => {
    if (onAddNewPath) {
      onAddNewPath();
    } else {
      navigate("/dashboard/add-learning-path");
    }
  };
  // Local filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const limit = 6;

  // React Query fetch key tracking parameters
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["learningPaths", { search, category, level, sort, page }],
    queryFn: async () => {
      const response: any = await api.get("/learning-paths", {
        params: {
          search: search || undefined,
          category: category || undefined,
          level: level || undefined,
          sort,
          page,
          limit,
        },
      });
      return response.data; // Struct: { paths: [], total: X, page: X, pages: X }
    },
    placeholderData: (previousData) => previousData, // keep previous data during queries for smooth UX
  });

  const paths: LearningPath[] = data?.paths || [];
  const totalPages = data?.pages || 1;

  // Handle filter changes (resets current page to 1)
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  const handleLevelChange = (val: string) => {
    setLevel(val);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  return (
    <div id={id} className="space-y-8">
      {/* Page Heading & Hero section */}
      <div className="text-left bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 shrink-0 select-none translate-x-12 translate-y-12">
          <Compass className="h-64 w-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Artificial Intelligence Curriculums
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Discover Advanced AI Learning Paths
          </h1>
          <p className="text-white/80 text-sm md:text-base mt-2 leading-relaxed">
            Acquire specialized intelligence. Launch tailored developer tracks compiled by vector engineering specialists.
          </p>
        </div>
      </div>

      {/* Filter Row Block */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by keywords, tags..."
        />
        {(onAddNewPath !== undefined || isAuthenticated) && (
          <button
            onClick={handleAddNewPath}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors shrink-0"
          >
            Launch Custom Path
          </button>
        )}
      </div>

      <FilterBar
        category={category}
        level={level}
        sort={sort}
        onCategoryChange={handleCategoryChange}
        onLevelChange={handleLevelChange}
        onSortChange={handleSortChange}
      />

      {/* Primary Data Output Display Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500 font-mono animate-pulse">
            Querying vector database records...
          </p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
          <h3 className="font-bold text-red-800">Connection Handshake Failed</h3>
          <p className="text-sm text-red-600 mt-1">
            {(error as any)?.message || "Failed to download learning path resources."}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Retry Protocol
          </button>
        </div>
      ) : paths.length === 0 ? (
        <EmptyState
          title="No Matching Paths Found"
          description="Your filter criteria did not align with any of our active flight trajectories. Try clearing search fields or selecting all levels."
          actionLabel="Reset Search Parameters"
          onAction={() => {
            setSearch("");
            setCategory("");
            setLevel("");
            setSort("newest");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((p) => (
              <LearningPathCard
                key={p.id}
                path={p}
                onView={handleViewPath}
              />
            ))}
          </div>

          <Pagination
            page={page}
            pages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
