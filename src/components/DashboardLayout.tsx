/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import DashboardSidebar from "./DashboardSidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 animate-fade-in text-slate-900">
      {/* Central Notification Toaster */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Main navigation */}
      <Navbar />

      {/* Workspace Inner Section */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 gap-8">
        {/* Left Side Navigation Rail */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <DashboardSidebar />
          </div>
        </aside>

        {/* Central Ingress content viewport */}
        <main className="flex-grow min-w-0 text-left">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs min-h-[60vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
