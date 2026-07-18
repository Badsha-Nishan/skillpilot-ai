/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import RoadmapForm, { RoadmapFormValues } from "./RoadmapForm";
import RoadmapResult from "./RoadmapResult";
import LoadingSkeleton from "./LoadingSkeleton";
import api from "../../services/api";
import { Compass, Sparkles, Bookmark, Trash2, ArrowRight } from "lucide-react";
import Card, { CardBody, CardHeader } from "../Card";
import toast from "react-hot-toast";
import { RoadmapOutput } from "../../../server/modules/ai/ai.service";

interface SavedRoadmapItem {
  id: string;
  timestamp: string;
  criteria: {
    careerGoal: string;
    currentLevel: string;
    weeklyHours: number;
    learningStyle: string;
  };
  roadmap: RoadmapOutput;
}

export default function RoadmapPage() {
  const [loading, setLoading] = useState(false);
  const [currentRoadmap, setCurrentRoadmap] = useState<RoadmapOutput | null>(
    null
  );
  const [savedHistory, setSavedHistory] = useState<SavedRoadmapItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>("");

  // Load local storage saved roadmap history on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("skillpilot_saved_roadmaps");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedHistory(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse saved roadmaps from local storage:", e);
    }
  }, []);

  const handleGenerateRoadmap = async (values: RoadmapFormValues) => {
    setLoading(true);
    setCurrentRoadmap(null);
    setSelectedHistoryId("");

    try {
      toast.loading("Analyzing profile & requesting AI mentor...", {
        id: "generating",
      });

      const res: any = await api.post("/ai/roadmap", values);
      const output: RoadmapOutput = res.data.learningRoadmap;

      setCurrentRoadmap(output);
      toast.success("AI Roadmap successfully engineered!", {
        id: "generating",
      });
    } catch (error: any) {
      console.error("Roadmap generation failed:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to reach the AI career mentoring engine.";
      toast.error(`Syllabus Generation Void: ${errMsg}`, { id: "generating" });
    } finally {
      setLoading(false);
    }

    const res: any = await api.post("/ai/roadmap", values);

    console.log("Roadmap API Response:", res);
    console.log("Roadmap Data:", res.data);
  };

  const handleSaveLocally = () => {
    if (!currentRoadmap) return;

    // Check if already saved in history
    const existing = savedHistory.find(
      (item) => item.roadmap.title === currentRoadmap.title
    );
    if (existing) {
      toast.error("This roadmap trajectory is already saved locally!");
      return;
    }

    const newItem: SavedRoadmapItem = {
      id: "rm_" + Date.now(),
      timestamp:
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      criteria: {
        careerGoal: currentRoadmap.title,
        currentLevel: currentRoadmap.difficulty,
        weeklyHours: 10, // approximate default reference
        learningStyle: "Practical",
      },
      roadmap: currentRoadmap,
    };

    const updated = [newItem, ...savedHistory];
    setSavedHistory(updated);
    localStorage.setItem("skillpilot_saved_roadmaps", JSON.stringify(updated));
    setSelectedHistoryId(newItem.id);
    toast.success("Roadmap blueprint archived in local storage!");
  };

  const handleLoadSaved = (item: SavedRoadmapItem) => {
    setCurrentRoadmap(item.roadmap);
    setSelectedHistoryId(item.id);
    toast.success(`Loaded saved roadmap: ${item.roadmap.title}`);
  };

  const handleDeleteSaved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = savedHistory.filter((item) => item.id !== id);
    setSavedHistory(updated);
    localStorage.setItem("skillpilot_saved_roadmaps", JSON.stringify(updated));

    if (selectedHistoryId === id) {
      setCurrentRoadmap(null);
      setSelectedHistoryId("");
    }
    toast.success("Archived trajectory wiped.");
  };

  const isCurrentSaved =
    !!currentRoadmap &&
    (selectedHistoryId !== "" ||
      savedHistory.some((item) => item.roadmap.title === currentRoadmap.title));

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* 1. Header Hero section */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md text-xs font-mono mb-3">
            <Compass className="h-3.5 w-3.5" /> SYSTEM MENTOR FLIGHT DECKS
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
            AI Learning Roadmap Generator
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Formulate bespoke, week-by-week technical syllabi calibrated
            precisely to your study constraints.
          </p>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      {loading ? (
        <LoadingSkeleton />
      ) : currentRoadmap ? (
        <RoadmapResult
          roadmap={currentRoadmap}
          onReset={() => {
            setCurrentRoadmap(null);
            setSelectedHistoryId("");
          }}
          onSave={handleSaveLocally}
          isSaved={isCurrentSaved}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Left Panel */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <Sparkles className="h-5 w-5 text-brand-600 animate-pulse" />
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-widest font-mono">
                Construct Syllabus Vector
              </h2>
            </div>
            <RoadmapForm onSubmit={handleGenerateRoadmap} isLoading={loading} />
          </div>

          {/* Local storage Saved Blueprints History (Right Panel) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border border-slate-200">
              <CardHeader className="border-b border-slate-100 bg-slate-50/20 py-4.5">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4.5 w-4.5 text-brand-600" />
                  <h3 className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wider">
                    Saved Roadmaps ({savedHistory.length})
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="p-4">
                {savedHistory.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <p className="text-xs text-slate-400 font-mono font-medium leading-relaxed">
                      No local roadmap blueprints archived. Generate a custom
                      syllabus to save coordinates.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                    {savedHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleLoadSaved(item)}
                        className="p-3.5 bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50/10 rounded-xl flex items-start justify-between gap-3 cursor-pointer transition-all text-left"
                      >
                        <div className="min-w-0 flex-grow">
                          <h4 className="text-xs font-extrabold text-slate-800 truncate leading-snug">
                            {item.roadmap.title}
                          </h4>
                          <span className="text-[9px] font-bold font-mono text-slate-400 block mt-1 uppercase tracking-wide">
                            {item.timestamp}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleDeleteSaved(e, item.id)}
                          title="Wipe archived trajectory"
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
