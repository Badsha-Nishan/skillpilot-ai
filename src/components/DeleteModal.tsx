/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import Button from "./Button";

interface DeleteModalProps {
  id?: string;
  isOpen: boolean;
  title?: string;
  message?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  id,
  isOpen,
  title = "Confirm Deletion",
  message = "Are you absolutely sure you want to delete this resource? This action cannot be undone and all data related to it will be permanently cleared.",
  isLoading = false,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in"
    >
      {/* Modal Wrapper Box */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-2xl p-6">
        
        {/* Header Icon & Title */}
        <div className="flex gap-4 items-start">
          <div className="h-10 w-10 bg-red-50 border border-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950 tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel Flight
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Confirm Deletion
          </Button>
        </div>
      </div>
    </div>
  );
}
