import React from 'react';
import { Cpu, ArrowUpRight, Sparkles, Database, Layers, MessageSquare } from 'lucide-react';

export const GoogleSection: React.FC = () => {
  return (
    <div id="layer-google" className="space-y-12 py-12 border-b border-slate-200/80 last:border-b-0 font-sans">
      {/* Top Header with Large Subtle Numeral */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-widest text-blue-600 font-semibold shadow-2xs">
              LAYER 04 · INTELLIGENCE TIER
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Google AI & Transformers
            </h3>
          </div>
          <span className="text-6xl sm:text-7xl font-bold text-slate-200/80 select-none leading-none">
            04
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices, nisi at volutpat aliquam, quam sem pellentesque nisi, vel commodo diam eros vitae nisl. Aliquam id tellus. Donec venenatis vulputate lorem.
        </p>
      </div>

      {/* Core Operational Capabilities (Row List with Circular Icons - Matching Screenshot Style) */}
      <div className="space-y-1 pt-2">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Model Inference & Orchestration
        </div>

        <div className="divide-y divide-slate-150">
          <div className="py-4 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <Cpu className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Dialogflow CX Speculative Token Synthesis
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat felis id magna. Proin vitae libero nec sapien vulputate vulputate.
              </p>
            </div>
          </div>

          <div className="py-4 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <MessageSquare className="w-4 h-4 text-slate-700" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Chirp 2 Acoustic Conformer Speech-to-Text
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Suspendisse feugiat. Donec ligula nulla, imperdiet a, adipiscing at, elementum eu, tellus. Phasellus nec sem in justo pellentesque facilisis.
              </p>
            </div>
          </div>

          <div className="py-4 flex items-start gap-4">
            <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 shrink-0 shadow-2xs">
              <Database className="w-4 h-4 text-slate-700" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Penske Domain Lexicon Acoustic Adaptation
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google 1st Party Models Grid (Matching Screenshot 3 Style) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Layers className="w-4 h-4 text-slate-600" />
          <span>Google 1st Party Models & Pipelines</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs">
            <span>Dialogflow CX Orchestrator</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">State Engine</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs">
            <span>Chirp 2 Streaming STT</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">145ms Latency</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs">
            <span>Webhook Backend Bridge</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">120ms Transit</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs">
            <span>Journey Neural TTS</span>
            <span className="text-[10px] font-mono text-slate-400 font-normal">6-Word Chunk</span>
          </div>
        </div>
      </div>

      {/* Speculative Latency Waterfall Widget */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Speculative Early-Sentence Waterfall</span>
          </div>
          <span className="text-[10px] font-mono font-normal text-emerald-600">
            Total Turnaround: 480ms
          </span>
        </div>

        <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-150 font-mono text-xs text-slate-700">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Chirp 2 Streaming STT:</span>
            <span className="text-emerald-600 font-bold">145ms</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Penske Webhook Fulfillment:</span>
            <span className="text-emerald-600 font-bold">120ms</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Journey TTS Early Audio Chunk:</span>
            <span className="text-emerald-600 font-bold">95ms</span>
          </div>
        </div>
      </div>

      {/* Reference Links / Benchmarks Row (Matching Screenshot 2 Style) */}
      <div className="space-y-1 pt-2">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Architecture Artifacts
        </div>

        <div className="divide-y divide-slate-150">
          <div className="py-3.5 flex items-center justify-between group cursor-pointer">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                PRODUCTION INTEGRATION
              </span>
              <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Dialogflow CX Speculative Token Streaming Pattern
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="py-3.5 flex items-center justify-between group cursor-pointer">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                LEXICON ADAPTATION
              </span>
              <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Fleet Terminology & VIN Acoustic Recognition Matrix
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-400 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
