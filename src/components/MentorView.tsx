/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Cpu, BookOpen } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";
import ChatSidebar from "./chat/ChatSidebar";
import ChatWindow from "./chat/ChatWindow";
import { Conversation, Message } from "./chat/types";

interface SavedRoadmapItem {
  id: string;
  timestamp: string;
  criteria: {
    careerGoal: string;
    currentLevel: string;
    weeklyHours: number;
    learningStyle: string;
  };
  roadmap: {
    roadmapTitle: string;
    targetRole: string;
    estimatedTotalWeeks: string;
    difficultyLevel: string;
  };
}

export default function MentorView() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  // Application Context: Saved Roadmaps
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmapItem[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("");

  // Load Saved Roadmaps on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("skillpilot_saved_roadmaps");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedRoadmaps(parsed);
          if (parsed.length > 0) {
            setSelectedRoadmapId(parsed[0].id);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load saved roadmaps for chat context:", e);
    }
  }, []);

  // Fetch Conversation History list on mount
  const fetchHistory = async (autoSelectNewest = false) => {
    setLoadingHistory(true);
    try {
      const response: any = await api.get("/chat/history");
      if (
        response &&
        response.status === "success" &&
        Array.isArray(response.data)
      ) {
        const history: Conversation[] = response.data;
        setConversations(history);

        // Auto select newest conversation if requested and available
        if (autoSelectNewest && history.length > 0) {
          handleSelectConversation(history[0].conversationId);
        }
      }
    } catch (error: any) {
      console.error("Failed to load conversation history:", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Load selected conversation's messages
  const handleSelectConversation = async (conversationId: string) => {
    setSelectedConvId(conversationId);
    setShowSidebarMobile(false);
    try {
      const response: any = await api.get(`/chat/history/${conversationId}`);
      if (response && response.status === "success" && response.data) {
        setActiveMessages(response.data.messages || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch conversation details:", error);
      toast.error("Failed to load conversation messages.");
    }
  };

  // Get active roadmap parameters
  const getActiveRoadmapParams = () => {
    const active = savedRoadmaps.find((r) => r.id === selectedRoadmapId);
    if (active) {
      return {
        currentLevel: active.criteria?.currentLevel || "Beginner",
        learningStyle: active.criteria?.learningStyle || "Practical",
        roadmapTitle:
          active.roadmap?.roadmapTitle ||
          active.criteria?.careerGoal ||
          "Custom Roadmap",
        roadmapDifficulty: active.roadmap?.difficultyLevel || "Medium",
      };
    }
    return {
      currentLevel: "Beginner",
      learningStyle: "Practical/Hands-on",
      roadmapTitle: "",
      roadmapDifficulty: "",
    };
  };

  // Handle message sending (streaming)
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Generate or retrieve active conversation ID
    let currentId = selectedConvId;
    let isNewSession = false;

    if (!currentId) {
      currentId = `chat-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      setSelectedConvId(currentId);
      isNewSession = true;
    }

    // 2. Append User message immediately to UI
    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setActiveMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 3. Prepare AI message placeholder
    const aiPlaceholder: Message = {
      role: "model",
      content: "",
      timestamp: new Date(),
    };
    setActiveMessages((prev) => [...prev, aiPlaceholder]);

    // 4. Send stream query
    const roadmapParams = getActiveRoadmapParams();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          conversationId: currentId,
          message: text,
          stream: true,
          ...roadmapParams,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(
          errJson.message || "Failed to establish flight mentorship connection."
        );
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Reader streaming unsupported in this client.");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            try {
              const dataContent = trimmed.slice(6).trim();
              if (dataContent) {
                const parsed = JSON.parse(dataContent);
                if (parsed.chunk) {
                  // Update the last message in state with the incoming chunk safely
                  setActiveMessages((prev) => {
                    if (prev.length === 0) return prev;
                    const next = [...prev];
                    const lastIndex = next.length - 1;
                    const last = next[lastIndex];
                    if (last && last.role === "model") {
                      next[lastIndex] = {
                        ...last,
                        content: last.content + parsed.chunk,
                      };
                    }
                    return next;
                  });
                } else if (parsed.done) {
                  // Stream completed, load history to refresh list titles
                  await fetchHistory();
                } else if (parsed.error) {
                  throw new Error(parsed.error);
                }
              }
            } catch (e) {
              console.warn(
                "Parse error inside stream line processing:",
                e,
                trimmed
              );
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Streaming message execution error:", error);
      toast.error(
        error.message || "Failed to receive response from career mentor."
      );
      // If error occurs, remove the empty model placeholder
      setActiveMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setSelectedConvId(null);
    setActiveMessages([]);
    setShowSidebarMobile(false);
    toast.success("Initialized a fresh career consultation session!");
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this mentorship log?"
      )
    ) {
      return;
    }

    try {
      const response: any = await api.delete(`/chat/history/${conversationId}`);
      if (response && response.status === "success") {
        toast.success("Session deleted.");
        // Clear active if deleted
        if (selectedConvId === conversationId) {
          setSelectedConvId(null);
          setActiveMessages([]);
        }
        await fetchHistory();
      }
    } catch (error: any) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete conversation.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-left flex flex-col h-[82vh]">
      {/* Upper header section */}
      <div className="shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-mono mb-2">
            <Cpu className="h-3.5 w-3.5" /> AGENTIC MENTORSHIP PROTOCOL
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-tight">
            AI Career Mentor
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Engage with a senior software architect who understands your active
            roadmaps and recommends courses.
          </p>
        </div>

        {/* Saved Roadmap Context Selection dropdown */}
        <div className="flex flex-col gap-1 w-full sm:w-auto sm:min-w-[240px]">
          <span className="text-[10px] text-slate-400 font-mono uppercase font-bold flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-indigo-500" /> Active Roadmap
            Context
          </span>
          {savedRoadmaps.length === 0 ? (
            <div className="text-xs bg-slate-50 border border-slate-200 text-slate-500 px-3 py-2 rounded-xl">
              No saved roadmaps (using default context)
            </div>
          ) : (
            <select
              value={selectedRoadmapId}
              onChange={(e) => setSelectedRoadmapId(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 cursor-pointer hover:border-slate-350 transition-all w-full"
            >
              {savedRoadmaps.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.roadmap?.roadmapTitle || r.criteria?.careerGoal} (
                  {r.criteria?.currentLevel})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Mobile view selector toggle */}
      <div className="flex md:hidden items-center justify-between gap-2 p-1.5 bg-slate-100 rounded-xl shrink-0">
        <button
          onClick={() => setShowSidebarMobile(true)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            showSidebarMobile
              ? "bg-white text-brand-700 shadow-3xs"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Session Logs ({conversations.length})
        </button>
        <button
          onClick={() => setShowSidebarMobile(false)}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            !showSidebarMobile
              ? "bg-white text-brand-700 shadow-3xs"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Active Mentor Chat
        </button>
      </div>

      {/* Main chat viewport */}
      <div className="flex-grow min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6 pb-2">
        {/* Sidebar logs column */}
        <div
          className={`md:col-span-4 h-full min-h-0 ${
            showSidebarMobile ? "block" : "hidden md:block"
          }`}
        >
          <ChatSidebar
            conversations={conversations}
            selectedId={selectedConvId}
            onSelect={handleSelectConversation}
            onDelete={handleDeleteConversation}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Active chat log column */}
        <div
          className={`md:col-span-8 h-full min-h-0 ${
            !showSidebarMobile ? "block" : "hidden md:block"
          }`}
        >
          <ChatWindow
            messages={activeMessages}
            isTyping={isTyping}
            onSend={handleSendMessage}
            onSelectSuggestion={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </div>
    </div>
  );
}
