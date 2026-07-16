/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Loader from "./Loader";

interface LoadingViewProps {
  id?: string;
  message?: string;
}

export default function LoadingView({ id, message = "Synchronizing Telemetry Data..." }: LoadingViewProps) {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <Loader size="lg" className="mb-6" />
      <h3 className="text-lg font-semibold text-slate-800 animate-pulse">
        {message}
      </h3>
      <p className="text-xs text-slate-500 font-mono mt-2 tracking-wide uppercase">
        Establishing TLS Handshake • Fetching Client Bundles
      </p>
    </div>
  );
}
