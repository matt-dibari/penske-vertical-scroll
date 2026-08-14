# 🌌 Vertical Scroll & Scrollytelling Base Template

> A modern, high-impact template for building interactive visual deep-dives, exploded 3D layer architectures, and scroll-driven technical explanations (**Scrollytelling**).

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-pink.svg)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![React Flow](https://img.shields.io/badge/@xyflow/react-12-ff0072.svg)](https://reactflow.dev/)

---

## 📖 Overview

This repository provides an extensible, production-ready base template for creating **rich visual explanation interfaces and vertical scrollytelling experiences**. 

Originally created as an interactive decomposition of a voice AI infrastructure stack (Google Cloud × Cisco × Penske), this architecture is designed to be easily adapted for:
- **System Architecture Deep Dives** (e.g., decomposing microservices, cloud networking, database layers)
- **Interactive Technical Whitepapers & Post-Mortems**
- **Hardware / Product Teardowns & Exploded Views**
- **Interactive Step-by-Step Latency & Packet Traces**
- **SaaS Onboarding & Product Feature Showcases**

---

## ✨ Key Features & Visual Patterns

### 1. 🚀 Scroll-Driven 3D Exploded Hero Stack
- **Isometric CSS 3D Transforms + Framer Motion**: Smoothly transitions from a collapsed 3D card stack to a fully decomposed multi-layer isometric view as the user scrolls down the hero track.
- **Scroll Progress Panning**: Dynamic status pills and scroll hints that adapt to scroll percentage.

### 2. 📜 Sticky Scrollytelling Split-Screen Layout
- **Sticky Visual Anchor**: The left column stays pinned in the viewport while the right column flows naturally with rich technical storytelling.
- **Intersection-Driven Active States**: As explanatory sections scroll past, the pinned 3D visual dynamically highlights and focuses on the corresponding architectural layer.

### 3. ⚡ Interactive End-to-End Simulation & Flow Traces
- **Interactive Flow Diagramming**: Powered by `@xyflow/react` for node-and-edge network/telephony flow graphs.
- **Execution & Latency Simulator**: Step-through interactive call traces demonstrating request lifecycles, latency breakdowns, and milestone celebrations with `canvas-confetti`.

### 4. 🎨 Polished Design System & UI Components
- **Tailwind CSS Styling**: Clean typographic hierarchy, subtle glassmorphism, glowing status badges, and refined color palettes.
- **Lucide Icons & Micro-interactions**: Smooth hover transitions, expand/collapse accordions, and fluid state changes.

---

## 🏗️ Project Structure

```
penske-vertical-scroll/
├── src/
│   ├── components/
│   │   ├── LayerStack3D.tsx                # 3D isometric exploded layer canvas
│   │   ├── ScrollytellingSection.tsx       # Scroll-driven narrative wrapper
│   │   ├── InteractiveLatencySimulator.tsx # Step-by-step trace & latency simulator
│   │   ├── TelephonyFlow.tsx               # Node/edge flow chart (@xyflow/react)
│   │   ├── LayerInspector.tsx              # Deep-dive inspector panel
│   │   ├── PenskeIssuesMatrix.tsx          # Comparison / issue analysis matrix
│   │   ├── Header.tsx                      # Header & navigation
│   │   ├── Footer.tsx                      # Engineering whitepaper footer
│   │   └── sections/                       # Narrative content modules
│   │       ├── WillowSection.tsx
│   │       ├── CiscoSection.tsx
│   │       ├── NetworkSection.tsx
│   │       └── GoogleSection.tsx
│   ├── data/
│   │   └── infrastructureData.ts           # Layer definitions, metrics, and logs
│   ├── types/
│   │   └── index.ts                        # TypeScript interfaces & types
│   ├── App.tsx                             # Master page orchestration & scroll tracks
│   ├── index.css                           # Global styles & Tailwind imports
│   └── main.tsx                            # App entry point
├── public/                                 # Static assets & audio files
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js `18+` or `20+`
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/matt-dibari/penske-vertical-scroll.git
cd penske-vertical-scroll

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Production Build

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 🧩 Adapting this Template for Your Own Story

1. **Configure Layers & Data**:
   Edit `src/data/infrastructureData.ts` and `src/types/index.ts` to define your own layers, metrics, and metadata.

2. **Customize the 3D Isometric Stack**:
   Modify `src/components/LayerStack3D.tsx` to adjust layer card styles, tilt angles (`rotateX`, `rotateZ`), and expansion distances.

3. **Write Scrollytelling Sections**:
   Update or add section components in `src/components/sections/` with your own narrative copy, diagrams, and logs.

4. **Customize the Interactive Simulator**:
   Modify `src/components/InteractiveLatencySimulator.tsx` and `src/components/TelephonyFlow.tsx` to simulate your system's sequence of events and latency breakdowns.

---

## 🧰 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite](https://vitejs.dev/) + [Oxlint](https://oxc.rs/)
- **Animation & Transitions:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Diagrams & Flow Nodes:** [@xyflow/react (React Flow)](https://reactflow.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📄 License

MIT License. Feel free to use and adapt this template for your own visual presentations and interactive applications!

