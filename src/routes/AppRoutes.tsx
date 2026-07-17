/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/MainLayout";
import DashboardLayout from "../components/DashboardLayout";

// Import UI Views
import HomeLandingView from "../components/HomeLandingView";
import ExplorePage from "../components/ExplorePage";
import LearningPathDetailsPage from "../components/LearningPathDetailsPage";
import AboutView from "../components/AboutView";
import ContactView from "../components/ContactView";
import LoginView from "../components/LoginView";
import RegisterView from "../components/RegisterView";
import DashboardHomePage from "../components/DashboardHomePage";
import ProfileView from "../components/ProfileView";
import AddLearningPathPage from "../components/AddLearningPathPage";
import ManageLearningPathsPage from "../components/ManageLearningPathsPage";
import RoadmapView from "../components/RoadmapView";
import MentorView from "../components/MentorView";
import NotFoundView from "../components/NotFoundView";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes under MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeLandingView />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/learning-path/:id" element={<LearningPathDetailsPage />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Route>

      {/* Protected Routes under DashboardLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/profile" element={<ProfileView />} />
          <Route path="/dashboard/add-learning-path" element={<AddLearningPathPage />} />
          <Route path="/dashboard/manage-learning-paths" element={<ManageLearningPathsPage />} />
          <Route path="/roadmap" element={<RoadmapView />} />
          <Route path="/mentor" element={<MentorView />} />
        </Route>
      </Route>

      {/* 404 Out-of-Bounds Fallback Route */}
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
