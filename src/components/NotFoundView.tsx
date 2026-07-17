/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, MoveLeft, AlertOctagon } from "lucide-react";
import Button from "./Button";

interface NotFoundViewProps {
  id?: string;
  onGoHome?: () => void;
}

export default function NotFoundView({ id, onGoHome }: NotFoundViewProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate("/");
    }
  };

  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="h-16 w-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6 animate-bounce">
        <AlertOctagon className="h-8 w-8" />
      </div>

      <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        Out of Bounds - Vector Lost
      </h2>
      <p className="text-slate-500 max-w-md mb-8">
        The coordinate node you requested does not exist or has been relocated outside our active spatial navigation grid.
      </p>

      <div className="flex gap-4">
        <Button
          variant="outline"
          leftIcon={<MoveLeft className="h-4 w-4" />}
          onClick={handleGoHome}
        >
          Back to Dashboard Base
        </Button>
      </div>
    </div>
  );
}
