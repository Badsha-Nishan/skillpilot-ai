/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Plus, Sparkles, MessageSquare } from "lucide-react";
import Card, { CardHeader, CardBody } from "../Card";
import Button from "../Button";
import ConversationList from "./ConversationList";
import { Conversation } from "./types";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  conversations,
  selectedId,
  onSelect,
  onDelete,
  onNewChat,
}: ChatSidebarProps) {
  return (
    <Card className="border border-slate-200 h-full flex flex-col overflow-hidden shadow-xs">
      <CardHeader className="border-b border-slate-100 p-4 shrink-0">
        <Button
          variant="primary"
          onClick={onNewChat}
          className="w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Session
        </Button>
      </CardHeader>
      
      <CardBody className="p-4 flex-grow overflow-y-auto space-y-4 flex flex-col min-h-0">
        <div className="flex-grow min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1 shrink-0">
            <span className="font-bold text-slate-400 text-[10px] tracking-wider font-mono uppercase">
              Mentorship Logs ({conversations.length})
            </span>
          </div>
          
          <div className="flex-grow min-h-0 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              selectedId={selectedId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 shrink-0">
          <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 text-[10px] uppercase font-mono tracking-wide">
                Context-Aware Sync
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                Your roadmap and course progress are automatically shared with your AI Mentor.
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
