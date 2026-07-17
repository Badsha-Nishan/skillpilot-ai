/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import {
  LayoutDashboard,
  User,
  Plus,
  ListCollapse,
  Map,
  Cpu,
  LogOut,
} from "lucide-react";

interface DashboardSidebarProps {
  id?: string;
}

export default function DashboardSidebar({ id }: DashboardSidebarProps) {
  const { logout } = useAuth();

  const sidebarLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/dashboard/profile", label: "Profile", icon: User },
    { to: "/dashboard/add-learning-path", label: "Add Learning Path", icon: Plus },
    { to: "/dashboard/manage-learning-paths", label: "Manage Learning Paths", icon: ListCollapse },
    { to: "/roadmap", label: "AI Roadmap", icon: Map },
    { to: "/mentor", label: "AI Mentor", icon: Cpu },
  ];

  return (
    <div
      id={id}
      className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-5 text-left h-full"
    >
      <div>
        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest px-3 block">
          Pilot Core Deck
        </span>
      </div>

      <nav className="space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
