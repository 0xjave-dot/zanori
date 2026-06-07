import React, { useEffect, useRef, useState } from 'react';
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
    conceptTag: "HERITAGE COUTURE RESIDENCE"
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
    conceptTag: "HERITAGE COUTURE RESIDENCE"
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
    <section id="interactive-render-gallery" className="py-24 md:py-32 bg-brand-sand text-brand-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-0">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 pb-2">
          <div className="space-y-0">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-none">
              Immerse Yourself
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

        {/* Navigation arrows for featured spaces */}
        <div className="space-y-0">
          <div className="relative h-[100px] overflow-hidden rounded-[28px] border border-brand-wood/15 bg-brand-base/95 flex items-center justify-center px-6">
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveIdx(getCircularIndex(activeIdx - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-wood/15 bg-brand-base/95 text-brand-dark shadow-sm transition hover:bg-brand-wood/5"
                aria-label="Previous featured space"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx(getCircularIndex(activeIdx + 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-wood/15 bg-brand-base/95 text-brand-dark shadow-sm transition hover:bg-brand-wood/5"
                aria-label="Next featured space"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Display Frame Layout */}
        <div className="flex justify-center">
          {/* MAIN PANORAMA VIEWER WINDOW: Centered */}
          <div className="w-full max-w-4xl">
            <div className="relative w-full rounded-3xl overflow-hidden border border-brand-wood/25 shadow-2xl bg-brand-bark h-[420px] sm:h-[560px] md:h-[640px] lg:h-[720px]">
              
              {/* Decorative premium framing details */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className="bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cranberry animate-pulse"></span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand-wood font-semibold">
                    
                  </span>
                </div>
              </div>

              {/* Overlays to hide Kuula logo/info badges in top corners (non-interactive) */}
              <div className="absolute top-3 left-3 z-40 pointer-events-none">
                <div className="w-16 h-8 bg-brand-bark rounded-md opacity-95"></div>
              </div>
              <div className="absolute top-3 right-3 z-40 pointer-events-none">
                <div className="w-16 h-8 bg-brand-bark rounded-md opacity-95"></div>
              </div>

              {/* Native responsive iframe or collection embed for selected featured space */}
              <div className="relative w-full h-full overflow-hidden">
                {activeSpace.embed ? (
                  <div ref={kuulaEmbedRef} className="w-full h-full"></div>
                ) : (
                  <iframe
                    key={activeSpace.id} // Ensure key refreshes iframe beautifully on switch
                    src={activeSpace.url}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', pointerEvents: 'auto', touchAction: 'auto', position: 'absolute', top: '-35px', left: 0, height: 'calc(100% + 32px)' }}
                    allowFullScreen
                    allow="xr-spatial-tracking"
                    title={`${activeSpace.name} - 3D Interactive Room Render`}
                    referrerPolicy="no-referrer"
                    className="w-full"
                  ></iframe>
                )}
              </div>

              {/* Dark branding waterlines at footer */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-sand/70 bg-brand-bark/80 px-3 py-1 rounded-md border border-brand-sand/10">
                  DESIGN SUITE // {activeSpace.id}
                </span>
              </div>

              {/* Mobile-friendly open button for touchscreens */}
              <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center sm:hidden px-4">
                <a
                  href={activeSpace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-dark px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-base shadow-lg shadow-brand-bark/30"
                >
                  
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

