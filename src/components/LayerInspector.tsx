import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, AlertTriangle, CheckCircle2, Bot, PhoneCall, Wifi, Cpu 
} from 'lucide-react';
import { INFRASTRUCTURE_LAYERS } from '../data/infrastructureData';
import type { LayerId } from '../types';

interface LayerInspectorProps {
  selectedLayerId: LayerId | null;
  onClose: () => void;
  onSelectLayer: (layerId: LayerId) => void;
}

export const LayerInspector: React.FC<LayerInspectorProps> = ({
  selectedLayerId,
  onClose,
  onSelectLayer,
}) => {
  if (!selectedLayerId) return null;

  const layer = INFRASTRUCTURE_LAYERS.find((l) => l.id === selectedLayerId);
  if (!layer) return null;

  const getLayerIcon = (id: LayerId) => {
    switch (id) {
      case 'willow': return <Bot className="w-5 h-5 text-willow-primary" />;
      case 'cisco': return <PhoneCall className="w-5 h-5 text-cisco-cyan" />;
      case 'network': return <Wifi className="w-5 h-5 text-emerald-600" />;
      case 'google': return <Cpu className="w-5 h-5 text-indigo-600" />;
    }
  };

  const currentIndex = INFRASTRUCTURE_LAYERS.findIndex(l => l.id === selectedLayerId);
  const prevLayer = currentIndex > 0 ? INFRASTRUCTURE_LAYERS[currentIndex - 1] : null;
  const nextLayer = currentIndex < INFRASTRUCTURE_LAYERS.length - 1 ? INFRASTRUCTURE_LAYERS[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                {getLayerIcon(layer.id)}
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  {layer.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
                  {layer.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans">{layer.subtitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Overview & Penske Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Infrastructure Purpose
                </span>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {layer.description}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                  Penske Operational Role
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {layer.roleInPenske}
                </p>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Telemetry & SLA Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {layer.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                    <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{m.value}</div>
                    <div className="text-[9px] text-emerald-600 font-sans mt-0.5">{m.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Penske Issues Raised & Joint Fixes */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Penske Specific Issues & Engineering Resolutions
              </h4>
              <div className="space-y-3">
                {layer.keyIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold text-slate-900">{issue.title}</h5>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        issue.resolvedBy === 'Google'
                          ? 'bg-blue-100 text-blue-700'
                          : issue.resolvedBy === 'Cisco'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Resolved by {issue.resolvedBy}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Problem:</strong> {issue.description}
                    </p>
                    <div className="text-xs text-slate-500">
                      <strong>Operational Impact:</strong> {issue.impact}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-emerald-950">
                        <strong>Engineering Fix:</strong> {issue.fix}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Technical Stack & Protocols
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {layer.techSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 font-mono">
                    <span className="text-slate-500 text-[11px]">{spec.key}</span>
                    <span className="font-semibold text-slate-800 text-[11px]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              {prevLayer ? (
                <button
                  onClick={() => onSelectLayer(prevLayer.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  ← Layer {prevLayer.index}: {prevLayer.title.split('—')[0]}
                </button>
              ) : <div />}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Close Inspection
            </button>

            <div>
              {nextLayer ? (
                <button
                  onClick={() => onSelectLayer(nextLayer.id)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  Layer {nextLayer.index}: {nextLayer.title.split('—')[0]} →
                </button>
              ) : <div />}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
