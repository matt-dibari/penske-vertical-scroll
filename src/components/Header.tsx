import React from 'react';
import { Layers } from 'lucide-react';

interface HeaderProps {
  onJumpToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onJumpToSection }) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
      {/* Top co-branding strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs border-b border-slate-100">
        <div className="flex items-center space-x-3 text-slate-500 font-mono text-[11px]">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-penske-yellow inline-block ring-2 ring-penske-blue"></span>
            Penske Truck Leasing
          </span>
          <span>×</span>
          <span className="font-semibold text-cisco-cyan">Cisco Webex</span>
          <span>×</span>
          <span className="font-semibold text-google-blue">Google Cloud AI</span>
        </div>

        <div className="hidden sm:flex items-center space-x-4 text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            SLA Status: 100% Operational
          </span>
          <span>Target Turnaround: &lt;750ms</span>
          <span>Doc Ref: ENG-2026-PNSK</span>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm">
            <Layers className="w-5 h-5 text-penske-yellow" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-tight leading-none">
              Penske Voice AI Architecture & Latency Report
            </h1>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">
              Interactive 4-Tier Infrastructure Decomposition & Optimization Study
            </p>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs">
          <button
            onClick={() => onJumpToSection('stack-section')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            3D Layers
          </button>
          <button
            onClick={() => onJumpToSection('story-section')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Story Deconstruction
          </button>
          <button
            onClick={() => onJumpToSection('simulator-section')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Call Simulator
          </button>
          <button
            onClick={() => onJumpToSection('issues-section')}
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Issues Matrix
          </button>
        </nav>
      </div>
    </header>
  );
};
