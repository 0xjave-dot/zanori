import React, { useEffect, useRef, useState } from 'react';
import InfiniteGallery from './InfiniteGallery';
import { ChevronLeft, ChevronRight, Compass, Info, Box, ExternalLink, HelpCircle, Eye } from 'lucide-react';

interface KuulaSpace {
  id: string;
  name: string;
  location: string;
  description: string;
  url: string;
  conceptTag: string;
  embed?: boolean;
}

const KUULA_SPACES: KuulaSpace[] = [
  {
    id: "h5Hpv",
    name: "Private Interior Lounge",
    location: "",
    description: "Designed to frame natural morning skylights, this panoramic blueprint embeds double-sanded local teak cabinetry, high-contrast granite platforms, and open tropical ventilation pathways suited for modern climates.",
    url: "https://kuula.co/share/h5Hpv?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0",
    conceptTag: "LAGOS HEIRLOOM APARTMENT"
  },
  {
    id: "hb9t7",
    name: "Luxury Cafe",
    location: "",
    description: "An organic luxury sanctuary emphasizing warm clay-baked pigments, intricate woven West African heritage accents, custom ceiling light integration, and low-profile premium mahogany loungers.",
    url: "https://kuula.co/share/hb9t7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0",
    conceptTag: "HERITAGE  RESIDENCE"
  },
  {
    id: "5H7Z7",
    name: "Custom Wood-finish Livingroom",
    location: "",
    description: "An executive screen-free mental sanctuary. Showcases basalt countertops, custom recessed task spotlights, scorched cedar walls, and dynamic double-padded seating zones for focused thought.",
    url: "https://kuula.co/share/5H7Z7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0",
    conceptTag: "OBSIDIAN INTELLECTUAL SUITE"
  },
  {
    id: "hb9t7-alt",
    name: "Luxury Cafe",
    location: "",
    description: "An organic luxury sanctuary emphasizing warm clay-baked pigments, intricate woven West African heritage accents, custom ceiling light integration, and low-profile premium mahogany loungers.",
    url: "https://kuula.co/share/5DQfs?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    conceptTag: "HERITAGE  RESIDENCE"
  },
  {
    id: "5H7Z7-alt",
    name: "Custom Wood-finish Livingroom",
    location: "",
    description: "An executive screen-free mental sanctuary. Showcases basalt countertops, custom recessed task spotlights, scorched cedar walls, and dynamic double-padded seating zones for focused thought.",
    url: "https://kuula.co/share/5DQfs?logo=0&info=1&fs=1&vr=0&sd=1&thumbs=1",
    conceptTag: "OBSIDIAN INTELLECTUAL SUITE"
  }
];

export default function InteractiveGallery() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeSpace = KUULA_SPACES[activeIdx];
  const totalSpaces = KUULA_SPACES.length;
  const kuulaEmbedRef = useRef<HTMLDivElement | null>(null);

  const getCircularIndex = (index: number) => (index + totalSpaces) % totalSpaces;

  useEffect(() => {
    if (!activeSpace.embed || !kuulaEmbedRef.current) return;
    if (kuulaEmbedRef.current.querySelector('script[src="https://static.kuula.io/embed.js"]')) return;

    kuulaEmbedRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://static.kuula.io/embed.js';
    script.async = true;
    script.dataset.kuula = activeSpace.url;
    script.dataset.width = '100%';
    script.dataset.height = '640px';
    kuulaEmbedRef.current.appendChild(script);
  }, [activeSpace]);

  return (
    <section id="interactive-render-gallery" className="py-0 bg-brand-sand text-brand-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-0">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 pb-2">
          <div className="space-y-0">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-none">
              
            </h2>
          </div>

          <div className="flex items-center space-x-4 text-right">
            <div className="font-mono text-xs text-brand-muted">
              
              
            </div>
            <div className="h-8 w-[1px] bg-brand-wood/15"></div>
            <a 
              href={activeSpace.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 font-mono text-[10px] text-brand-muted hover:text-brand-dark uppercase tracking-wider transition-colors group"
            >
              
             </a>
          </div>
        </div>

        {/* (Navigation buttons removed per design) */}

        {/* Full-width auto-sliding gallery for 'Immerse Yourself' */}
      </div>

      {/* Place the full-bleed gallery outside the centered container to achieve edge-to-edge layout */}
      <InfiniteGallery />
    </section>
  );
}

