# ANKIX SPORTS — Premium Animated Cricket Live Score Platform

> **"EVERY RUN. EVERY MOMENT."**

ANKIX SPORTS is an elite full-stack live cricket score platform designed for Indian and international cricket fans. It delivers real-time match scores, interactive 3D spatial arenas, comprehensive scorecards, upcoming fixtures, and tournament standings with buttery 60fps performance and genuine sports data accuracy.

---

## ⚡ Tech Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & Design System**: Tailwind CSS (Dark Obsidian & Charcoal Palette, Electric Emerald accents, Stadium Grid mesh)
- **3D Spatial Visuals**: Three.js, procedural leather shaders, authentic seam geometry, studio & emerald rim lighting, pointer parallax physics
- **Animations & Micro-interactions**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (with route-level code splitting via `React.lazy` and `Suspense`)
- **Data Synchronization**: TanStack Query (React Query) with 60-second polling and background window pause
- **Backend & Proxy**: Server-side TypeScript proxy handlers compatible with both Vercel Serverless Functions (`api/*`) and local Vite development middleware
- **Data Provider**: [CricketData.org / CricAPI](https://cricketdata.org/)

---

## 🏏 Architecture & Data Flow

```
[Browser Client]
       │
       ▼
[/api/matches/*, /api/series/*, /api/points-table]
       │
   ┌───┴──────────────────────────────┐
   │                                  │
[Vite Dev Middleware]       [Vercel Serverless Function]
(npm run dev)               (Production Vercel Deploy)
   │                                  │
   └───┬──────────────────────────────┘
       │
       ▼
[cricApiProxy.ts]  <─── Read `CRICKET_API_KEY` securely from server environment
       │
       ├── Cache Hit (In-memory TTL: 60s for live, 120s fixtures, 300s series)
       └── Cache Miss ───> Fetch from `https://api.cricapi.com/v1/...`
```

---

## 🔑 Environment Variable Setup (`CRICKET_API_KEY`)

The application keeps your API credentials strictly private on the server. `CRICKET_API_KEY` is **never** exposed in browser bundles or client-side JavaScript.

### 1. Obtain Your Free API Key
1. Go to [https://cricketdata.org/](https://cricketdata.org/).
2. Sign up to receive your free lifetime API key (500 hits/day quota).

### 2. Configure Local Environment
Create or edit `.env` in the root of `E:\Cricket`:

```bash
CRICKET_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

*(Refer to `.env.example` for details).*

### 3. Demo Mode (Reference Data)
If `CRICKET_API_KEY` is not yet configured, ANKIX SPORTS displays an informative setup guide and automatically allows toggling **Demo Mode (Sample Reference Data)**. This provides complete realistic match scorecards, batting/bowling statistics, and fixtures for visual and interaction testing without fabricating live scores.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested with Node v24.19.0)
- npm or pnpm

### Installation
```bash
cd E:\Cricket
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser. The custom Vite API dev middleware will automatically proxy `/api/*` endpoints to CricAPI using your configured `CRICKET_API_KEY`.

### Build for Production
```bash
npm run build
```
Creates an optimized, code-split production build in `dist/`.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub or import `E:\Cricket` directly in the [Vercel Dashboard](https://vercel.com/).
2. In your Vercel Project Settings, navigate to **Environment Variables**:
   - Key: `CRICKET_API_KEY`
   - Value: `your-api-key-here`
3. Click **Deploy**. Vercel will build the frontend and deploy the serverless functions in `/api/` automatically using `vercel.json`.

---

## 🎨 Visual Design & Features

- **Cinematic Preloader**: Dark loading screen, animated ANKIX SPORTS wordmark, cricket seam trajectory spinner, and initialization progress bar.
- **Cinematic 3D Hero**: Interactive 3D cricket ball with procedural red leather, raised white seam stitching, stadium floodlight cones, gentle floating particles, and staggered word typography reveal.
- **3D Match Cards**: Perspective tilt on pointer movement, emerald hover illumination, team emblems, oversized numerical score typography (`tabular-nums`), and live indicator.
- **Match Centre (`/match/:matchId`)**: Team duel headers, innings breakdown, batting tables (runs, balls, 4s, 6s, SR, dismissal), bowling tables (overs, maidens, runs, wickets, economy), extras breakdown, honest commentary status, and IST venue schedule.
- **Upcoming Fixtures (`/upcoming`)**: Date-grouped schedules with countdown timers and start times converted to Asia/Kolkata (IST).
- **Results (`/results`)**: Completed match archive with winning margins and scorecards.
- **Series Browser (`/series`)**: Tournament search with format breakdowns (ODI, T20, Test).
- **Points Table (`/points-table`)**: Tournament standings with played, won, lost, tied, NR, points, NRR, and recent form guides.
- **Search Modal**: Instant keyboard-driven lookup (`Ctrl+K` / `Cmd+K`) across all matches, teams, and tournaments.

---

## 📋 Data Integrity Guarantee
- No simulated runs, wickets, or overs are generated for animation.
- Unknown scores remain labeled as pending or scheduled.
- Timestamps are formatted in Asia/Kolkata (IST).
- In-memory caching protects CricAPI rate limits.

---

## 👨‍💻 Creator & Engineering

Designed & Developed by **Ankit**

- **GitHub**: [@ankit-a63](https://github.com/ankit-a63)
- **LinkedIn**: [Ankit on LinkedIn](https://linkedin.com/in/ankit-a63)
- **Repository**: [ankix-sports](https://github.com/ankit-a63/ankix-sports)

---

&copy; ANKIX SPORTS. "EVERY RUN. EVERY MOMENT."
