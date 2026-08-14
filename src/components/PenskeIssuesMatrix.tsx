import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { INFRASTRUCTURE_LAYERS } from '../data/infrastructureData';
import type { LayerId } from '../types';

export const PenskeIssuesMatrix: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<LayerId | 'all'>('all');

  // Flatten all issues across layers
  const allIssues = INFRASTRUCTURE_LAYERS.flatMap((layer) =>
    layer.keyIssues.map((issue) => ({
      ...issue,
      layerId: layer.id,
      layerTitle: layer.title.split('—')[0].trim(),
      layerTag: layer.tag,
      accentColor: layer.accentColor,
    }))
  );

  const filteredIssues =
    selectedFilter === 'all'
      ? allIssues
      : allIssues.filter((i) => i.layerId === selectedFilter);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-penske-blue uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Engineering Remediation Log
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mt-2 tracking-tight">
            Penske Issue Resolution Matrix
          </h2>
          <p className="text-sm text-slate-600 font-sans mt-1">
            Complete technical breakdown of issues raised by Penske across all 4 architectural tiers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              selectedFilter === 'all'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Layers ({allIssues.length})
          </button>
          <button
            onClick={() => setSelectedFilter('willow')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              selectedFilter === 'willow'
                ? 'bg-orange-500 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Willow (Voice)
          </button>
          <button
            onClick={() => setSelectedFilter('cisco')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              selectedFilter === 'cisco'
                ? 'bg-cisco-cyan text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cisco Telephony
          </button>
          <button
            onClick={() => setSelectedFilter('network')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              selectedFilter === 'network'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Networking
          </button>
          <button
            onClick={() => setSelectedFilter('google')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              selectedFilter === 'google'
                ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Google AI
          </button>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIssues.map((issue, idx) => {
          return (
            <motion.div
              key={idx}
              layout
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: issue.accentColor }}
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {issue.layerTitle}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      issue.resolvedBy === 'Google'
                        ? 'bg-blue-100 text-blue-700'
                        : issue.resolvedBy === 'Cisco'
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {issue.resolvedBy} Engineering
                  </span>
                </div>

                <h4 className="text-base font-semibold text-slate-900 tracking-tight">
                  {issue.title}
                </h4>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {issue.description}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                  <span className="font-semibold text-slate-700">Penske Impact: </span>
                  <span className="text-slate-600">{issue.impact}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950 font-sans">
                    <span className="font-semibold text-emerald-900">Verified Fix: </span>
                    {issue.fix}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
