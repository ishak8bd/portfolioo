# ALEX VANCE — Cinematic Engineering Portfolio

An Awwwards-caliber digital portfolio engineered for a Senior Frontend Architect & Creative Systems Engineer. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Three.js**.

---

## ✨ Features & Architecture

- **Interactive Constellation Canvas (Hero)**:
  - 60/120 FPS high-density particle constellation with dynamic mouse repulsion field, distance-based lattice linking, and velocity damping.
- **Executive Bento Grid**:
  - 6 modular telemetry cards showcasing Core Competencies, Institutional Tech Stack, Architectural Philosophy, and Verified Performance Metrics.
- **Continuous 3D Marquee Showcase**:
  - Mathematically seamless modulo loop (`wrapRange`) supporting natural cursor drag with momentum decay, trackpad/wheel translation, and pause-on-hover.
  - Layered GPU compositor architecture: outer continuous translation layer paired with inner 3D perspective rotation entrance (`rotateY`, `z`, `x`, `scale`).
  - Interactive console scrubber bar with active project indicator, 5 milestone ticks, and numeric jump pills.
- **Deep Case Study Inspection Modal**:
  - Full-screen architectural breakdown for each flagship: Problem, Approach, System Architecture, Verified Metrics, and Post-Mortem (*"What Broke"*).
- **Interactive 3D Companion Droid (Three.js)**:
  - Procedural WebGL companion with titanium chassis, curved visor, articulated arms, pulsating ion thruster, and ambient core reactor.
  - Viewport cursor tracking: Head yaw/pitch and eye pupils dynamically track the cursor across the entire screen.
  - Interactive tap-to-spin 180° and free full-screen dragging.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/isaaxk/portfo2.git
cd portfo2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT © [isaaxk](https://github.com/isaaxk)
