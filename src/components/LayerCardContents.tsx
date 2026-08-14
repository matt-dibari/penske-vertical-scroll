import React, { useState, useEffect } from 'react';

// Layer 1: Willow (AI Virtual Agent with voice waveform)
export const WillowCardContent: React.FC = () => {
  const [waveformHeights, setWaveformHeights] = useState<number[]>([
    25, 45, 75, 95, 60, 85, 40, 90, 70, 45, 80, 60, 35, 55, 30, 20
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveformHeights(prev =>
        prev.map(() => Math.floor(Math.random() * 65) + 20)
      );
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between select-none">
      {/* Top pill bar matching reference image 1 & 2 */}
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded-full bg-[#C26D45]" />
        <div className="h-3 w-44 rounded-full bg-[#E8DDD8]" />
      </div>

      {/* Voice Wavelength Animation */}
      <div className="my-auto flex items-center justify-center gap-2 h-16 px-4">
        {waveformHeights.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-[#C26D45] transition-all duration-200 ease-out"
            style={{
              height: `${h}%`,
              opacity: (h / 100) * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Minimalist sub-bar lines */}
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded-full bg-slate-200/70" />
        <div className="h-2 w-1/2 rounded-full bg-slate-100" />
      </div>
    </div>
  );
};

// Layer 2: Cisco Telephony (Telephony / Cloud / Contact Center feel)
export const CiscoCardContent: React.FC = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between font-mono text-[11px] text-slate-600 select-none">
      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="text-slate-400">sip</span>
          <span className="text-[#049FD9]">invite</span>
          <span className="text-slate-400">→</span>
          <span>ani: 678-360-8793 (United BMW)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="text-slate-400">rtp</span>
          <span className="text-[#049FD9]">stream</span>
          <span className="text-slate-400">→</span>
          <span>cisco webex cc</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-700">
          <span className="text-slate-400">ivr</span>
          <span className="text-[#049FD9]">CCAI Connector</span>
          <span className="text-slate-400">→</span>
          <span>Google Dialogflow CX</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="h-2 w-2/3 rounded-full bg-slate-200/60" />
      </div>
    </div>
  );
};

// Layer 3: Networking (Internet) - Grid of rounded squares of various colors matching reference image 2
export const InternetCardContent: React.FC = () => {
  // 3 rows x 8 columns grid of squares with muted colors (matching card 3 in reference image 2)
  const [tiles, setTiles] = useState<string[]>([
    'bg-[#E5E7EB]', 'bg-[#D1D5DB]', 'bg-[#E5E7EB]', 'bg-[#E5E7EB]', 'bg-[#9CA3AF]', 'bg-[#E5E7EB]', 'bg-[#D1D5DB]', 'bg-[#E5E7EB]',
    'bg-[#9CA3AF]', 'bg-[#E5E7EB]', 'bg-[#E5E7EB]', 'bg-[#9CA3AF]', 'bg-[#E5E7EB]', 'bg-[#E5E7EB]', 'bg-[#9CA3AF]', 'bg-[#E5E7EB]',
    'bg-[#E5E7EB]', 'bg-[#D1D5DB]', 'bg-[#E5E7EB]', 'bg-[#9CA3AF]', 'bg-[#D1D5DB]', 'bg-[#E5E7EB]', 'bg-[#E5E7EB]', 'bg-[#D1D5DB]',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiles(prev => {
        const next = [...prev];
        const randomIdx = Math.floor(Math.random() * next.length);
        const palette = ['bg-[#E5E7EB]', 'bg-[#D1D5DB]', 'bg-[#9CA3AF]', 'bg-[#6B7280]/60', 'bg-[#CBD5E1]'];
        next[randomIdx] = palette[Math.floor(Math.random() * palette.length)];
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col justify-center select-none">
      <div className="grid grid-cols-8 gap-2.5">
        {tiles.map((colorClass, idx) => (
          <div
            key={idx}
            className={`h-7 rounded-md transition-colors duration-500 ease-in-out ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

// Layer 4: Google (Transformers & AI) - Clean minimalist nodes matching bottom card of reference image 2
export const GoogleCardContent: React.FC = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-center select-none">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center font-mono text-[10px] sm:text-[11px] text-slate-500">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-4 h-4 rounded-full border-2 border-slate-700 bg-white" />
          <span className="tracking-wider">Dialogflow CX</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-4 h-4 rounded-full border-2 border-slate-700 bg-white" />
          <span className="tracking-wider">STT (Chirp)</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-4 h-4 rounded-full border-2 border-slate-700 bg-white" />
          <span className="tracking-wider">Webhook</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-4 h-4 rounded-full border-2 border-slate-700 bg-white" />
          <span className="tracking-wider">TTS (Chirp)</span>
        </div>
      </div>
    </div>
  );
};
