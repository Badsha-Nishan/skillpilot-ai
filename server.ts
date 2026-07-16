/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import path from "path";
import express from "express";
import app from "./server/app";
import { connectDB } from "./server/config/db";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const HOST = "0.0.0.0";

async function bootstrap() {
  console.log("🚀 Starting SkillPilot AI Full-Stack System Gateway...");

  // Initialize DB Connection
  await connectDB();

  // Integrates Vite development server middleware OR static assets in production
  if (process.env.NODE_ENV !== "production") {
    console.log("⚙️  Running in DEVELOPMENT mode. Initializing Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    // Mount Vite dev server middlewares
    app.use(vite.middlewares);
  } else {
    console.log("📦 Running in PRODUCTION mode. Serving pre-compiled static assets...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from the build output directory
    app.use(express.static(distPath));
    
    // Serve single-page app index on any unknown route request
    app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`🌐 SkillPilot AI System is broadcasting on http://${HOST}:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("❌ Fatal System Boot Error:", error);
  process.exit(1);
});
