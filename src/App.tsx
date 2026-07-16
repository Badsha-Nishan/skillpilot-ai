/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./providers/QueryProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import LoadingView from "./components/LoadingView";
import NotFoundView from "./components/NotFoundView";
import Container from "./components/Container";
import api from "./services/api";

function AppContent() {
  const [activeView, setActiveView] = useState<string>("home");
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  // Health checking function to ping Node/Express gateway
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

  // Perform check on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Central Notification Toaster */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Header and Spatial Nav */}
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        backendHealthy={backendHealthy}
      />

      {/* Primary Ingress Section */}
      <main className="flex-grow py-10">
        <Container>
          {activeView === "home" && (
            <HomeView
              backendHealthy={backendHealthy}
              triggerHealthCheck={checkBackendHealth}
            />
          )}
          {activeView === "loading" && <LoadingView />}
          {activeView === "404" && (
            <NotFoundView onGoHome={() => setActiveView("home")} />
          )}
        </Container>
      </main>

      {/* Professional Metadata Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryProvider>
      <AppContent />
    </QueryProvider>
  );
}
