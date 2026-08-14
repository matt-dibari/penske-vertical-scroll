import React from 'react';
import { ShieldCheck, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Col 1: Overview */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold font-serif text-base">
              <Layers className="w-4 h-4 text-penske-yellow" />
              <span>Penske Voice AI Architecture</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Joint engineering initiative between Google Cloud AI, Cisco Webex Contact Center, and Penske Truck Leasing to deliver sub-700ms voice conversational intelligence.
            </p>
          </div>

          {/* Col 2: Telemetry */}
          <div className="space-y-2 font-mono">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">Key SLA Achievements</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Round-Trip Latency: <span className="text-emerald-400 font-bold">Sub-second response target</span></li>
              <li>• Direct Interconnect: <span className="text-emerald-400 font-bold">10G Fiber (0% packet jitter)</span></li>
            </ul>
          </div>

          {/* Col 3: Architecture Tiers */}
          <div className="space-y-2 font-mono">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">Architectural Tiers</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Layer 1: Willow AI Virtual Agent</li>
              <li>• Layer 2: Cisco Webex CCE / CVP & VVB</li>
              <li>• Layer 3: Networking & Cloud Interconnect</li>
              <li>• Layer 4: Google Chirp 2 & Gemini 1.5 Flash</li>
            </ul>
          </div>

          {/* Col 4: Verified */}
          <div className="space-y-2">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-[11px]">Engineering Sign-Off</div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Production Verified
              </div>
              <p className="text-slate-400 font-sans">
                Tested across North American logistics dispatch hubs and 24/7 roadside centers.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <div>
            © 2026 Penske Truck Leasing Co., LP • Cisco Systems, Inc. • Google LLC. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Confidential & Proprietary</span>
            <span>Interactive Technical Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
