# 🧭 SkillPilot AI

SkillPilot AI is an advanced, production-grade career guidance and technical mentorship platform designed for software engineers. It combines bespoke, week-by-week learning roadmaps generated via the **Google Gemini Pro model** with a **conversational AI Career Mentor** that streaming-synchronizes learning metrics in real time.

---

## 🚀 Key Features

*   ** Bespoke Roadmap Synthesis**: Calibrate customized, multi-week learning roadmaps styled directly for beginner, intermediate, or advanced levels based on weekly learning style constraints.
*   ** real-time AI Mentorship Chat**: Stream responses from a senior technical career mentor that is aware of active roadmap contexts and learning paths using Server-Sent Events (SSE).
*   ** Modular Learning Paths**: Track modular software engineering learning paths and progress indicators.
*   ** Comprehensive Dashboard**: Visual telemetry and dashboard analytics tracking learning milestones, active courses, and skill-acquisition progress.
*   ** Enterprise Grade Security**: Includes robust user authentication (JWT-based session cookies), API rate limiters, security headers via Helmet, and reliable global error-handling middlewares.
*   ** Fully Responsive Design**: Mobile-first fluid navbar drawer toggles and segmented active mentor chats for an outstanding user experience on all screen sizes.

---

## 🛠️ Technology Stack

*   **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Hook Form, Zod Resolver, Recharts, Framer Motion (via `motion/react`)
*   **Backend**: Node.js, Express, TypeScript, Zod, Cookie Parser, Winston Logger, Morgan, Helmet, CORS
*   **AI Engine**: Google Gemini API via `@google/genai` TypeScript SDK
*   **Database**: MongoDB (Mongoose Object Document Mapping)

---

## 📁 Workspace Folder Structure

```text
├── .env.example              # Environment variables template
├── index.html                # Main SPA page frame & SEO metadata
├── metadata.json             # AI Studio applet manifest
├── package.json              # Client & Server dependency manager
├── server.ts                 # Full-stack Custom Server Entrypoint
├── server/                   # Custom Node.js/Express Backend
│   ├── app.ts                # Express application configurations
│   ├── config/               # Database and environment configurations
│   ├── middlewares/          # rateLimiter, errorHandler, authmiddleware
│   ├── modules/              # Sub-modules (auth, ai, chat, dashboard, learningPath)
│   └── utils/                # ApiError, ApiResponse, asyncHandler helpers
└── src/                      # Single-Page Application Frontend
    ├── main.tsx              # React bootstrap entry point
    ├── App.tsx               # Primary view router and layout coordinator
    ├── index.css             # Tailwind setup and theme variables
    ├── components/           # UI elements (Navbar, Cards, Buttons, Inputs)
    │   ├── chat/             # AI Mentorship stream view files
    │   └── roadmap/          # Roadmap generator view files
    ├── providers/            # Global Auth Providers
    ├── services/             # Axios API services
    ├── types/                # Core frontend types
    └── utils/                # Validation and sanitization helpers
```

---

## ⚙️ Environment Variables

Copy the `.env.example` file to `.env` and configure your credentials:

```env
# Google Gemini API Key configuration
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Self-referential URL of the hosting container (for CORS and callbacks)
APP_URL="http://localhost:3000"

# Database connection credentials
MONGO_URI="mongodb://localhost:27017/skillpilot"

# Security signing secret for JSON Web Tokens
JWT_SECRET="YOUR_JWT_SECRET_PASSPHRASE"

# Server environment and ingress port configuration
NODE_ENV="development"
PORT=3000
```

---

## ⚡ Installation & Quick Start

### 1. Prerequisite Installations
Verify that **Node.js (v18+)** and **MongoDB** are installed and running locally.

### 2. Install Project Dependencies
Install backend and frontend dependencies directly in the workspace root directory:
```bash
npm install
```

### 3. Run Development Server
Spin up the full-stack dev server using `tsx`:
```bash
npm run dev
```
The application will boot up and bind to `http://localhost:3000`.

### 4. Build for Production
Generate the production-ready client files and bundle the TypeScript server to CommonJS:
```bash
npm run build
```

### 5. Start Production Server
Launch the bundled production services:
```bash
npm start
```

---

## 🔌 Core API Endpoints

### 🔑 Authentication Module
*   `POST /api/auth/register` - Create a new user account profile.
*   `POST /api/auth/login` - Validate credentials and receive secure cookie tokens.
*   `GET /api/auth/me` - Retrieve details of the current logged-in user.
*   `POST /api/auth/logout` - Invalidate user session and clear JWT cookies.

### 🗺️ AI Roadmap Module
*   `POST /api/ai/roadmap` - Command the Gemini model to synthesize custom multi-week learning trajectories.

### 💬 AI Mentorship Module
*   `POST /api/chat` - Open a real-time Server-Sent Event (SSE) response stream.
*   `GET /api/chat/history` - Query the logged history of previous chat conversations.
*   `GET /api/chat/history/:id` - Fetch all messages of a specific mentorship log.
*   `DELETE /api/chat/history/:id` - Wipe a conversation session from active archives.

### 📚 Learning Paths Module
*   `GET /api/learning-paths` - Paginate, search, and filter community courses.
*   `POST /api/learning-paths` - Publish a new structured technical training module.
*   `GET /api/learning-paths/:id` - Retrieve rich chapters and description data.
*   `PUT /api/learning-paths/:id` - Edit a published learning path.
*   `DELETE /api/learning-paths/:id` - Terminate a learning path from catalog.

---

## ☁️ Deployment Instructions

The application is fully containerized and compatible with modern cloud runtimes such as **Google Cloud Run**, **Render**, or **Heroku**:

1.  **Configure Environment Secrets**: Setup `GEMINI_API_KEY`, `MONGO_URI`, and `JWT_SECRET` in your cloud provider's console.
2.  **Container Build**: The repository contains a standard start script. Use standard Docker or cloud native buildpacks to deploy.
3.  **Reverse Proxy Bindings**: The built app relies on Port `3000` to stream requests and serve Vite SPA files. Ensure the cloud run ingress routing maps accordingly.

---

*SkillPilot AI is engineered to deliver reliable, lightning-fast career mapping and AI technical training suggestions. Fly safe!*
