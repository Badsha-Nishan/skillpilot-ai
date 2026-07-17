/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useAuth } from "../providers/AuthProvider";
import LearningPathCard, { LearningPath } from "./LearningPathCard";
import DeleteModal from "./DeleteModal";
import EmptyState from "./EmptyState";
import { Loader2, AlertCircle, ShieldAlert, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface ManageLearningPathsPageProps {
  id?: string;
  onViewPath?: (id: string) => void;
  onEditPath?: (path: LearningPath) => void;
  onAddNewPath?: () => void;
}

export default function ManageLearningPathsPage({
  id,
  onViewPath,
  onEditPath,
  onAddNewPath,
}: ManageLearningPathsPageProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Local state for tracking delete targets
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fallback programmatic route handlers
  const handleViewPath = (pathId: string) => {
    if (onViewPath) {
      onViewPath(pathId);
    } else {
      navigate(`/learning-path/${pathId}`);
    }
  };

  const handleEditPath = (path: LearningPath) => {
    if (onEditPath) {
      onEditPath(path);
    } else {
      // Pass path model state directly inside route navigation state!
      navigate("/dashboard/add-learning-path", { state: { path } });
    }
  };

  const handleAddNewPath = () => {
    if (onAddNewPath) {
      onAddNewPath();
    } else {
      navigate("/dashboard/add-learning-path");
    }
  };

  // Fetch all learning paths (we will filter for the current user's paths)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["learningPaths"],
    queryFn: async () => {
      // Query with a high limit to ensure we fetch all paths for client-side filtering
      const response: any = await api.get("/learning-paths", {
        params: { limit: 100 },
      });
      return response.data;
    },
  });

  // Mutation for deleting a learning path
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response: any = await api.delete(`/learning-paths/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learningPaths"] });
      toast.success("Learning path permanently removed from radar registry.");
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to execute delete handshake. Action denied.");
      setDeleteId(null);
    },
  });

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <ShieldAlert className="h-12 w-12 text-rose-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">Restricted Administration Access</h3>
        <p className="text-sm text-slate-500 mt-1">
          You must be fully authenticated to access path registry administration vectors.
        </p>
      </div>
    );
  }

  // Filter paths created by the logged-in user
  const rawPaths: LearningPath[] = data?.paths || [];
  const userPaths = rawPaths.filter(
    (p) => p.createdBy === user.id || (p.creator && p.creator.id === user.id)
  );

  const handleDeleteTrigger = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  return (
    <div id={id} className="space-y-6 text-left">
      {/* Header and Call to action row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-200">
        <div className="text-left">
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
            Manage Custom Paths
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track, update, or deprecate your registered learning trajectories.
          </p>
        </div>

        <button
          onClick={handleAddNewPath}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="h-4.5 w-4.5" />
          Create Path Node
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500 font-mono animate-pulse">
            Retrieving private database logs...
          </p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
          <h3 className="font-bold text-red-800">Connection Handshake Failed</h3>
          <p className="text-sm text-red-600 mt-1">
            {(error as any)?.message || "Failed to download your learning path assets."}
          </p>
        </div>
      ) : userPaths.length === 0 ? (
        <EmptyState
          title="No Created Trajectories Located"
          description="You haven't initiated any custom learning orbits yet. Build a custom curriculum pathway to start seeding student nodes."
          actionLabel="Launch First Custom Path"
          onAction={handleAddNewPath}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPaths.map((p) => (
            <LearningPathCard
              key={p.id}
              path={p}
              isManage={true}
              onView={handleViewPath}
              onEdit={handleEditPath}
              onDelete={handleDeleteTrigger}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal Overlay */}
      <DeleteModal
        isOpen={deleteId !== null}
        isLoading={deleteMutation.isPending}
        title="Deprecate Learning Path?"
        message="Are you absolutely sure you want to delete this custom learning path trajectory? This action cannot be undone and will immediately clear all curricular records from current matrices."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
