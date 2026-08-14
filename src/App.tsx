import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayerStack3D } from './components/LayerStack3D';
import { ScrollytellingSection } from './components/ScrollytellingSection';
import { InteractiveLatencySimulator } from './components/InteractiveLatencySimulator';
import { Footer } from './components/Footer';
import type { LayerId } from './types';
import { ChevronDown, Sparkles } from 'lucide-react';

export function App() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const [heroExpansion, setHeroExpansion] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<LayerId | null>('willow');

  const layerTitles: Record<LayerId, { name: string; subtext: string; colorClass: string }> = {
    willow: {
      name: 'Willow',
      subtext: 'AI Assistant',
      colorClass: 'text-blue-600',
    },
    cisco: {
      name: 'Cisco',
      subtext: 'Telephony',
      colorClass: 'text-[#049FD9]',
    },
    network: {
      name: 'Networking',
      subtext: 'Cloud-to-Cloud Networking',
      colorClass: 'text-emerald-600',
    },
    google: {
      name: 'Google',
      subtext: 'AI & Transformers',
      colorClass: 'text-blue-600',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroTrack = heroTrackRef.current;
      if (!heroTrack) return;

      const rect = heroTrack.getBoundingClientRect();
      const scrollableDistance = heroTrack.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // rect.top is 0 at top of page, goes negative as user scrolls down
      const scrolled = -rect.top;
      // Complete the explosion animation around 75% of hero track
      const progress = Math.min(1, Math.max(0, scrolled / (scrollableDistance * 0.75)));
      setHeroExpansion(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#1A1A1A] font-sans selection:bg-[#E8DDD8]">
      {/* SECTION 1: Expanding Hero Section (Scroll-Activated Animation Track) */}
      <section ref={heroTrackRef} className="relative h-[220vh]">
        {/* Pinned Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-10 overflow-hidden bg-[#F7F7F6]">
          {/* Header */}
          <header className="max-w-6xl w-full mx-auto flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C26D45] inline-block" />
                Penske Infrastructure
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-medium text-slate-800 tracking-tight">
                Voice AI Layer Decomposition
              </h1>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs text-[11px] font-mono">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  heroExpansion > 0.8 ? 'bg-emerald-500 animate-pulse' : 'bg-[#C26D45]'
                }`}
              />
              <span className="text-slate-600 font-medium">
                {heroExpansion < 0.1
                  ? 'Stacked Overview'
                  : heroExpansion < 0.95
                  ? `Decomposing Layers (${Math.round(heroExpansion * 100)}%)`
                  : '4 Layers Fully Expanded'}
              </span>
            </div>
          </header>

          {/* Center: The 3D Layer Stack in Hero (Full width with lines & labels) */}
          <div className="w-full flex-1 flex items-center justify-center">
            <LayerStack3D expansion={heroExpansion} showLabels={true} />
          </div>

          {/* Footer Navigation / Scroll Prompt */}
          <footer className="max-w-6xl w-full mx-auto flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  heroExpansion >= 0.95 ? 'translate-y-1 text-slate-700 animate-bounce' : 'text-slate-400'
                }`}
              />
              <span className={heroExpansion >= 0.95 ? 'text-slate-700 font-semibold' : 'text-slate-400'}>
                {heroExpansion < 0.95
                  ? 'Scroll down to explode layers'
                  : 'Keep scrolling down for layer deep-dive & recommendations'}
              </span>
            </div>
            <span>Google × Cisco × Penske</span>
          </footer>
        </div>
      </section>

      {/* SECTION 2: Layer-by-Layer Split Page (Visual on Left, Clean Content Column on Right) */}
      <section id="deep-dive-section" className="relative z-10 bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column: Pinned 3D Visual with Floating Animated Title */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] flex flex-col justify-center py-2">
              {/* Organic Floating Active Layer Title (Moved down closer to 3D visual) */}
              <div className="text-left pl-2 sm:pl-4 mb-2">
                <AnimatePresence mode="wait">
                  {activeLayer && (
                    <motion.div
                      key={activeLayer}
                      initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="space-y-0.5"
                    >
                      <h2
                        className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-sans ${layerTitles[activeLayer].colorClass}`}
                      >
                        {layerTitles[activeLayer].name}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500 tracking-wide font-sans">
                        {layerTitles[activeLayer].subtext}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Centered Organic 3D Visual (No lines/labels, seamlessly centered in column) */}
              <div className="w-full flex items-center justify-center overflow-visible">
                <LayerStack3D
                  expansion={1}
                  activeLayer={activeLayer}
                  compact={true}
                  showLabels={false}
                />
              </div>
            </div>

            {/* Right Column: Layer Detail Story Sections (Open Column, No Outlined Box) */}
            <div className="lg:col-span-7">
              <ScrollytellingSection
                activeLayer={activeLayer}
                onLayerHighlight={(id) => setActiveLayer(id)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Live Call Latency Simulator */}
      <section
        id="simulator-section"
        className="relative z-10 bg-[#F7F7F6] border-t border-slate-200/80 pt-16 pb-20 shadow-xs"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-600 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C26D45]" />
            Live Scenario Simulator
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Penske Call Round-Trip Execution Trace
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-2">
            Step through a simulated voice call from truck driver speech to Cisco telephony, dedicated network fiber transit, and Google AI processing.
          </p>
        </div>

        <InteractiveLatencySimulator />
      </section>

      {/* SECTION 4: Engineering Whitepaper Footer */}
      <Footer />
    </div>
  );
}

export default App;
