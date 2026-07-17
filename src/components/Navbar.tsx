/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Compass, Shield, Plus, ListCollapse, LogIn, LogOut, UserPlus, Globe, Sparkles, Map, Cpu, Menu, X } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import api from "../services/api";

interface NavbarProps {
  id?: string;
}

export default function Navbar({ id }: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Auto health-checking on mount to decouple Navbar from pages
  const checkBackendHealth = async () => {
    try {
      const response: any = await api.get("/health");
      if (response && response.status === "healthy") {
        setBackendHealthy(true);
      } else {
        setBackendHealthy(false);
      }
    } catch {
      setBackendHealthy(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/explore");
  };

  return (
    <nav
      id={id}
      className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/30">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                SkillPilot <span className="text-brand-600 font-medium">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Compass className="h-4 w-4" />
                Explore Paths
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Sparkles className="h-4 w-4" />
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Globe className="h-4 w-4" />
                Contact
              </NavLink>

              {/* Authenticated Links in Top Menu */}
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 text-brand-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <ListCollapse className="h-4 w-4" />
                    Dashboard
                  </NavLink>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Backend Health Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <Globe className="h-3.5 w-3.5 text-slate-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-500">API:</span>
              <span className="flex items-center gap-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    backendHealthy === true
                      ? "bg-emerald-500 animate-pulse"
                      : backendHealthy === false
                      ? "bg-rose-500"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                  {backendHealthy === true
                    ? "healthy"
                    : backendHealthy === false
                    ? "offline"
                    : "connecting"}
                </span>
              </span>
            </div>

            {/* Authenticated State vs Guest State */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                {/* Profile Avatar */}
                <Link to="/dashboard/profile" className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">{user.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                      {user.role} Vector
                    </span>
                  </div>
                </Link>

                {/* Logout Trigger */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Logout Session"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1.5 rounded-md border border-slate-200/50">
                <Shield className="h-3.5 w-3.5 text-brand-500" />
                <span>Phase 3 System</span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden transition-colors cursor-pointer"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-150 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1.5 shadow-md">
          <NavLink
            to="/explore"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Compass className="h-4.5 w-4.5" />
            Explore Paths
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Sparkles className="h-4.5 w-4.5" />
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Globe className="h-4.5 w-4.5" />
            Contact
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <ListCollapse className="h-4.5 w-4.5" />
              Dashboard
            </NavLink>
          )}

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-150 mt-2">
            <Globe className="h-4 w-4 text-slate-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500">API:</span>
            <span className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  backendHealthy === true
                    ? "bg-emerald-500 animate-pulse"
                    : backendHealthy === false
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
              />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                {backendHealthy === true ? "healthy" : backendHealthy === false ? "offline" : "connecting"}
              </span>
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
