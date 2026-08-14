import React from 'react';
import { motion } from 'framer-motion';
import {
  WillowCardContent,
  CiscoCardContent,
  InternetCardContent,
  GoogleCardContent
} from './LayerCardContents';

interface LayerStack3DProps {
  expansion: number; // 0 (fully stacked) to 1 (fully separated)
  activeLayer?: string | null; // 'willow' | 'cisco' | 'network' | 'google' | null
  compact?: boolean;
  showLabels?: boolean;
}

const LAYERS = [
  {
    id: 'willow',
    label: 'WILLOW',
    sublabel: 'AI Virtual Agent',
    component: <WillowCardContent />,
  },
  {
    id: 'cisco',
    label: 'CISCO',
    sublabel: 'Telephony',
    component: <CiscoCardContent />,
  },
  {
    id: 'network',
    label: 'NETWORKING',
    sublabel: 'Cloud-to-Cloud Networking',
    component: <InternetCardContent />,
  },
  {
    id: 'google',
    label: 'GOOGLE',
    sublabel: 'Transformers & AI',
    component: <GoogleCardContent />,
  },
];

export const LayerStack3D: React.FC<LayerStack3DProps> = ({
  expansion,
  activeLayer = null,
  compact = false,
  showLabels = true,
}) => {
  // Compute Y & Z 3D offset for each layer based on expansion
  // Index 0 is top (Willow), index 3 is bottom (Google)
  const getOffsets = (index: number) => {
    const collapsedY = index * 6; // subtle stair step when stacked
    const collapsedZ = -index * 8;

    // Exploded offsets (top floats high, bottom stays low)
    const explodedY = compact ? [-130, -40, 48, 138] : [-160, -50, 60, 170];
    const explodedZ = compact ? [75, 22, -30, -85] : [100, 30, -40, -110];

    const y = collapsedY + (explodedY[index] - collapsedY) * expansion;
    const z = collapsedZ + (explodedZ[index] - collapsedZ) * expansion;

    return { y, z };
  };

  return (
    <div
      className={`relative w-full mx-auto flex items-center justify-center select-none perspective-container overflow-visible transition-all duration-300 ${
        compact
          ? 'h-[440px] max-w-lg scale-[0.88] sm:scale-[0.95] xl:scale-[1.0] origin-center'
          : 'h-[620px] max-w-6xl'
      }`}
    >
      {/* 3D Isometric Stage Column (Centered organically when showLabels is false, or shifted left for hero leader lines) */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 ${
          !showLabels || compact
            ? 'translate-x-0'
            : '-translate-x-12 sm:-translate-x-24 md:-translate-x-36 lg:-translate-x-44'
        }`}
      >
        {/* Soft floor shadow */}
        <div
          className={`absolute ${
            compact ? 'w-[380px] sm:w-[440px] h-[140px]' : 'w-[440px] sm:w-[520px] h-[160px]'
          } bg-black/10 blur-3xl rounded-full transition-all duration-500 pointer-events-none`}
          style={{
            transform: `translateY(${150 + expansion * 45}px) scale(${1 + expansion * 0.2})`,
            opacity: 0.8 - expansion * 0.4,
          }}
        />

        {/* 3D Perspective Stage */}
        <div
          className={`isometric-transform-base relative ${
            compact ? 'w-[320px] sm:w-[400px] h-[175px]' : 'w-[340px] sm:w-[440px] md:w-[490px] h-[185px]'
          } flex items-center justify-center`}
          style={{
            transform: 'rotateX(52deg) rotateZ(-12deg) rotateY(0deg)',
          }}
        >
          {/* The 4 Cards (rendered bottom-up for proper z-layering) */}
          {LAYERS.map((layer, index) => {
            const { y, z } = getOffsets(index);
            const isHighlighted = activeLayer === layer.id;
            const isDimmed = Boolean(activeLayer && !isHighlighted);

            return (
              <motion.div
                key={layer.id}
                className={`absolute inset-0 rounded-3xl bg-white transition-all duration-400 ${
                  isHighlighted
                    ? 'border-2 border-blue-500 ring-4 ring-blue-500/25 shadow-[0_20px_45px_rgba(59,130,246,0.35)] opacity-100'
                    : isDimmed
                    ? 'border border-slate-200/50 opacity-30 blur-[0.2px]'
                    : 'border border-slate-200/80 opacity-100'
                }`}
                style={{
                  transform: `translateY(${y}px) translateZ(${z + (isHighlighted ? 35 : 0)}px) scale(${
                    isHighlighted ? 1.03 : 1
                  })`,
                  boxShadow: isHighlighted
                    ? '0 25px 50px -12px rgba(59, 130, 246, 0.35)'
                    : `0 ${10 + index * 6}px ${20 + index * 10}px -8px rgba(0, 0, 0, ${
                        0.08 + (1 - expansion) * 0.06
                      })`,
                  zIndex: isHighlighted ? 40 : 10 - index,
                }}
              >
                {/* Card Interior */}
                {layer.component}

                {/* Subtle top edge highlight */}
                <div
                  className={`absolute inset-x-0 top-0 h-[1px] rounded-t-3xl pointer-events-none ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-white to-transparent'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right-Hand Connecting Lines and Minimalist Uppercase Labels (Only rendered if showLabels is true) */}
      {showLabels && !compact && (
        <div className="absolute right-2 sm:right-6 md:right-10 lg:right-14 inset-y-0 flex flex-col justify-between py-24 pointer-events-none">
          {LAYERS.map((layer, index) => {
            const topPercentages = ['20%', '39%', '58%', '78%'];
            const isLabelHighlighted = activeLayer === layer.id;
            const isLabelDimmed = Boolean(activeLayer && !isLabelHighlighted);

            return (
              <div
                key={layer.id}
                className="flex items-center gap-4 sm:gap-6 transition-all duration-300"
                style={{
                  position: 'absolute',
                  top: topPercentages[index],
                  right: 0,
                  opacity: isLabelDimmed
                    ? 0.3
                    : Math.max(0, Math.min(1, (expansion - 0.1) * 1.5)),
                  transform: `translateX(${(1 - expansion) * 20}px) ${
                    isLabelHighlighted ? 'scale(1.05)' : 'scale(1)'
                  }`,
                }}
              >
                {/* Horizontal connecting line */}
                <div
                  className={`transition-all duration-300 ${
                    isLabelHighlighted
                      ? 'w-20 sm:w-28 md:w-36 lg:w-44 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                      : 'w-16 sm:w-24 md:w-32 lg:w-40 h-[1px] bg-slate-300'
                  }`}
                />

                {/* Minimalist Uppercase Typography */}
                <div className="text-left w-40 sm:w-48">
                  <div
                    className={`font-mono text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                      isLabelHighlighted
                        ? 'font-bold text-blue-600'
                        : isLabelDimmed
                        ? 'font-medium text-slate-400'
                        : 'font-semibold text-slate-700'
                    }`}
                  >
                    {layer.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
