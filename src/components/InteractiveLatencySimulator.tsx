import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, RotateCcw, Zap, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PENSKE_SCENARIOS } from '../data/infrastructureData';
import type { LayerId } from '../types';

export const InteractiveLatencySimulator: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeHopIndex, setActiveHopIndex] = useState<number>(-1);
  const [completedHops, setCompletedHops] = useState<number[]>([]);
  const [simSpeed, setSimSpeed] = useState<number>(1); // 1x, 1.5x, 2x

  const scenario = PENSKE_SCENARIOS[selectedScenarioIndex];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setActiveHopIndex(0);
    setCompletedHops([]);
  };

  const handleResetSimulation = () => {
    setIsRunning(false);
    setActiveHopIndex(-1);
    setCompletedHops([]);
  };

  useEffect(() => {
    if (!isRunning || activeHopIndex < 0) return;

    if (activeHopIndex >= scenario.hops.length) {
      setIsRunning(false);
      // Trigger celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      return;
    }

    const currentHop = scenario.hops[activeHopIndex];
    // Dynamic delay scaled for smooth visual pacing
    const delay = Math.max(300, (currentHop.afterDuration * 2.2) / simSpeed);

    const timer = setTimeout(() => {
      setCompletedHops(prev => [...prev, activeHopIndex]);
      setActiveHopIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isRunning, activeHopIndex, scenario.hops, simSpeed]);

  const getLayerBadge = (layer: LayerId) => {
    switch (layer) {
      case 'willow':
        return <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-mono text-[10px] font-bold">Willow (Voice)</span>;
      case 'cisco':
        return <span className="px-2 py-0.5 rounded bg-sky-100 text-cisco-cyan font-mono text-[10px] font-bold">Cisco Telephony</span>;
      case 'network':
        return <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">Internet Transit</span>;
      case 'google':
        return <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono text-[10px] font-bold">Google AI</span>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-penske-blue uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          Live Interactive Simulator
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3 tracking-tight">
          Simulating a Penske Voice AI Call Trace
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-sans mt-2">
          Step through how an utterance journeys from the customer's phone through Cisco telephony, high-speed fiber transit, and Google's transformer models in real-time.
        </p>
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Scenario Selector & Controls Bar */}
        <div className="p-6 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          {/* Scenario Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-medium">Scenario:</span>
            {PENSKE_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  handleResetSimulation();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedScenarioIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-mono">
              <span className="text-slate-400 px-1">Speed:</span>
              <button
                onClick={() => setSimSpeed(1)}
                className={`px-2 py-0.5 rounded ${simSpeed === 1 ? 'bg-slate-200 font-bold' : 'text-slate-600'}`}
              >
                1x
              </button>
              <button
                onClick={() => setSimSpeed(1.5)}
                className={`px-2 py-0.5 rounded ${simSpeed === 1.5 ? 'bg-slate-200 font-bold' : 'text-slate-600'}`}
              >
                1.5x
              </button>
            </div>

            {!isRunning ? (
              <button
                onClick={handleStartSimulation}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-penske-blue to-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Simulate Call Round-Trip
              </button>
            ) : (
              <button
                onClick={handleResetSimulation}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 hover:bg-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Utterance & Context Showcase */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 bg-white">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Caller Context</span>
            <div className="text-xs font-semibold text-slate-800 mt-1">{scenario.caller}</div>
            <div className="text-xs text-slate-500 font-serif italic mt-2">{scenario.utterance}</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70">
            <span className="text-[10px] font-mono text-blue-700 uppercase font-bold">Expected System Action</span>
            <div className="text-xs text-slate-700 mt-1 leading-relaxed">{scenario.expectedAction}</div>
          </div>

          {/* Latency Comparison Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Total Latency</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                -66% Faster
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <div>
                <div className="text-[11px] text-red-400 font-mono line-through">{scenario.totalBeforeMs}ms</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{scenario.totalAfterMs}ms</div>
              </div>
              <div className="text-right text-[10px] text-slate-400 font-mono">
                Conversational SLA: <br />
                <strong className="text-white">&lt;800ms Target Met</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Waterfall Execution Pipeline */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-bold pb-2 border-b border-slate-100">
            <span>Pipeline Stage & Layer</span>
            <div className="flex items-center gap-8">
              <span>Legacy Duration</span>
              <span className="text-emerald-700 font-bold">Optimized Duration</span>
              <span className="w-16 text-right">Status</span>
            </div>
          </div>

          {scenario.hops.map((hop, idx) => {
            const isActive = activeHopIndex === idx;
            const isDone = completedHops.includes(idx);

            return (
              <motion.div
                key={hop.hopId}
                initial={false}
                animate={{
                  backgroundColor: isActive
                    ? 'rgba(66, 133, 244, 0.08)'
                    : isDone
                    ? 'rgba(248, 250, 252, 0.9)'
                    : 'rgba(255, 255, 255, 1)',
                }}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-wrap items-center justify-between gap-3 ${
                  isActive
                    ? 'border-penske-blue shadow-md scale-[1.01]'
                    : isDone
                    ? 'border-slate-200'
                    : 'border-slate-100 opacity-60'
                }`}
              >
                {/* Left: Step indicator & Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-penske-blue text-white animate-pulse'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{hop.label}</span>
                      {getLayerBadge(hop.layer)}
                    </div>
                    <div className="text-[11px] text-slate-500 font-sans mt-0.5">{hop.detail}</div>
                  </div>
                </div>

                {/* Right: Latency comparisons & Progress Bar */}
                <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
                  {/* Before */}
                  <div className="text-slate-400 line-through w-14 text-right">
                    {hop.beforeDuration}ms
                  </div>

                  {/* After */}
                  <div className="text-emerald-700 font-bold w-16 text-right flex items-center justify-end gap-1">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    {hop.afterDuration}ms
                  </div>

                  {/* Status Indicator */}
                  <div className="w-16 text-right">
                    {isDone ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    ) : isActive ? (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 animate-pulse flex items-center justify-center gap-1">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Queued</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
