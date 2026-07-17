/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { User, Calendar, Mail, ShieldAlert, Cpu, Settings, Key, Globe, CheckCircle } from "lucide-react";
import Card, { CardHeader, CardBody } from "./Card";
import Button from "./Button";
import toast from "react-hot-toast";

export default function ProfileView() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setLocalUser({
        name: user.name,
        email: user.email,
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Please sign in to access your profile.</p>
      </div>
    );
  }

  const handleRotateKey = () => {
    toast.success("Security token rotated. Refreshing session certificates...");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile telemetry updated successfully (Sandbox Mock mode)!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      {/* Visual top bar */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <img
              src={localUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={localUser.name}
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full border-2 border-white object-cover"
            />
            <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
              ✓
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight truncate">{localUser.name}</h1>
            <p className="text-white/80 text-xs font-mono tracking-wide uppercase mt-1 flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 animate-pulse" /> {user.role} Vector Operator
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs font-bold font-sans"
            leftIcon={<User className="h-3.5 w-3.5" />}
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRotateKey}
            className="bg-white/10 hover:bg-white/20 text-white border-white/25 text-xs font-bold font-sans"
            leftIcon={<Key className="h-3.5 w-3.5" />}
          >
            Rotate Credentials
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-slate-200/80">
            <CardHeader className="border-b border-slate-100 bg-slate-50/20">
              <h3 className="font-bold text-slate-900">Identity Specifications</h3>
              <p className="text-xs text-slate-500">Core parameters mapping this node to our security registry</p>
            </CardHeader>
            <CardBody className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                    Display Alias
                  </span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold truncate">{localUser.name}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                    Comm Coordinate (Email)
                  </span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate">{localUser.email}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                    Security Authorization Role
                  </span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                    <Settings className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold capitalize">{user.role}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                    Commission Date
                  </span>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2026-07-17"}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Registered System Nodes</h3>
              <p className="text-xs text-slate-500">Verified permissions granted to your operator status</p>
            </CardHeader>
            <CardBody className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                  <span>Launch Custom Learning Paths</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                  <span>Interactive Skill registry CRUD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                  <span>Query AI Career Roadmap Matrix</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                  <span>Engage AI Flight Mentor Chatbot</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <Card className="border border-slate-200 bg-slate-50/40">
            <CardBody className="p-6 text-center space-y-4">
              <Globe className="h-12 w-12 text-indigo-500 mx-auto" />
              <div>
                <h4 className="font-bold text-slate-950">Phase 4 Connectivity</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your node is securely integrated with SkillPilot AI Cloud Run microservices. Credentials are stored in encrypted cookies.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-left animate-scale-in">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Edit Profile Parameters</h3>
            <p className="text-xs text-slate-500 mt-0.5">Mock configuration of pilot registry parameters</p>
            
            <form onSubmit={handleSaveProfile} className="space-y-4 mt-5">
              <div>
                <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={localUser.name}
                  onChange={(e) => setLocalUser({ ...localUser, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 focus:border-brand-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={localUser.email}
                  onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 focus:border-brand-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={localUser.photoURL}
                  onChange={(e) => setLocalUser({ ...localUser, photoURL: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 focus:border-brand-500 font-medium text-slate-800"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
