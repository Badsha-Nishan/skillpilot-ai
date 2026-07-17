/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 animate-fade-in text-slate-900">
      {/* Central Toaster notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Main navigation */}
      <Navbar />

      {/* Main body viewport */}
      <main className="flex-grow py-10">
        <Container>
          <Outlet />
        </Container>
      </main>

      {/* Corporate Metadata Footer */}
      <Footer />
    </div>
  );
}
