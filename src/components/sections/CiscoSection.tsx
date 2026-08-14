import React from 'react';
import { TelephonyFlow } from '../TelephonyFlow';
import { Network } from 'lucide-react';

export const CiscoSection: React.FC = () => {
  return (
    <div id="layer-cisco" className="space-y-8 py-12 border-b border-slate-200/80 last:border-b-0 font-sans">
      {/* Top Header with Large Numeral */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-widest text-[#049FD9] font-semibold shadow-2xs">
              ARCHITECTURE OVERVIEW
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Architecture Overview
            </h3>
          </div>
          <span className="text-6xl sm:text-7xl font-bold text-slate-200/80 select-none leading-none">
            02
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Willow Architecture is deployed utilizing Cisco and Google services. Cisco provides the telephony and core communication services that orchestrate and initiate a connection to Google Dialogflow CX through the CCAI Connector integration, which is a service deployed by Cisco in AWS.
        </p>
      </div>

      {/* Architecture Flow Section (Vertical React Flow) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Network className="w-4 h-4 text-[#049FD9]" />
            <span>Telephony Architecture Flow</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Interactive Flow · Drag & Zoom
          </span>
        </div>

        {/* Vertical React Flow Diagram */}
        <TelephonyFlow />
      </div>
    </div>
  );
};
