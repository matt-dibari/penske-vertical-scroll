import React, { useEffect } from 'react';
import { WillowSection } from './sections/WillowSection';
import { CiscoSection } from './sections/CiscoSection';
import { NetworkSection } from './sections/NetworkSection';
import { GoogleSection } from './sections/GoogleSection';
import type { LayerId } from '../types';

interface ScrollytellingSectionProps {
  onLayerHighlight: (layerId: LayerId | null) => void;
  activeLayer?: LayerId | null;
}

export const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({
  onLayerHighlight,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const triggerLine = windowHeight * 0.45;

      const layerIds: LayerId[] = ['willow', 'cisco', 'network', 'google'];
      let active: LayerId | null = null;

      for (const id of layerIds) {
        const el = document.getElementById(`layer-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
            active = id;
            break;
          }
        }
      }

      if (active) {
        onLayerHighlight(active);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLayerHighlight]);

  return (
    <div className="space-y-16">
      <WillowSection />
      <CiscoSection />
      <NetworkSection />
      <GoogleSection />
    </div>
  );
};
