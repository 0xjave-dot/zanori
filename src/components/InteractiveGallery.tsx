import React, { useState } from 'react';
import { Compass, Info, Box, ExternalLink, HelpCircle, Eye } from 'lucide-react';

interface KuulaSpace {
  id: string;
  name: string;
  location: string;
  description: string;
  url: string;
  conceptTag: string;
}

const KUULA_SPACES: KuulaSpace[] = [
  {
    id: "h5Hpv",
    name: "Private Interior Lounge",
    location: "",
    description: "Designed to frame natural morning skylights, this panoramic blueprint embeds double-sanded local teak cabinetry, high-contrast granite platforms, and open tropical ventilation pathways suited for modern climates.",
    url: "https://kuula.co/share/h5Hpv?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0&pitch=0",
    conceptTag: "LAGOS HEIRLOOM APARTMENT"
  },
  {
    id: "hb9t7",
    name: "Luxury Cafe",
    location: "",
    description: "An organic luxury sanctuary emphasizing warm clay-baked pigments, intricate woven West African heritage accents, custom ceiling light integration, and low-profile premium mahogany loungers.",
    url: "https://kuula.co/share/hb9t7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0&pitch=0",
    conceptTag: "HERITAGE COUTURE RESIDENCE"
  },
  {
    id: "5H7Z7",
    name: "Custom Wood-finish Livingroom",
    location: "",
    description: "An executive screen-free mental sanctuary. Showcases basalt countertops, custom recessed task spotlights, scorched cedar walls, and dynamic double-padded seating zones for focused thought.",
    url: "https://kuula.co/share/5H7Z7?logo=0&info=0&ui=0&fs=1&vr=0&sd=1&thumbs=0&pitch=0",
    conceptTag: "OBSIDIAN INTELLECTUAL SUITE"
  }
];

export default function InteractiveGallery() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeSpace = KUULA_SPACES[activeIdx];

  return (
    <section id="interactive-render-gallery" className="py-24 md:py-32 bg-[#F7F4EF] border-b border-brand-wood/15 text-brand-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-wood/15 pb-8">
          <div className="space-y-3">
            <span className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#8B6F52] font-semibold">
            
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-none">
              Featured Spaces
            </h2>
            <p className="text-xs text-brand-muted max-w-xl font-light leading-relaxed">
              
            </p>
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

        {/* Master Selector Tabs for the 3 spaces */}
        <div className="grid grid-cols-3 gap-4">
          {KUULA_SPACES.map((space, idx) => (
            <button
              key={space.id}
              onClick={() => setActiveIdx(idx)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start space-x-4 cursor-pointer relative group ${
                activeIdx === idx
                  ? 'bg-[#2A2520] text-brand-base border-transparent shadow-[#2A2520]/20 shadow-lg -translate-y-1'
                  : 'bg-white/70 hover:bg-white text-brand-dark border-brand-wood/15 hover:border-brand-wood/40'
              }`}
            >
              <div className={`p-2.5 rounded-xl text-center font-mono text-xs ${
                activeIdx === idx ? 'bg-brand-wood/20 text-brand-wood' : 'bg-brand-warm text-brand-muted'
              }`}>
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <span className={`text-[9px] font-mono tracking-widest ${
                  activeIdx === idx ? 'text-brand-sand' : 'text-brand-muted'
                }`}>
                  {space.location.toUpperCase()}
                </span>
                <h4 className="font-serif text-base font-light">
                  {space.name}
                </h4>
              </div>
              {activeIdx === idx && (
                <span className="absolute top-4 right-4 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sand opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sand"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Display Frame Layout */}
        <div className="flex justify-center">
          {/* MAIN PANORAMA VIEWER WINDOW: Centered */}
          <div className="w-full max-w-4xl">
            <div className="relative w-full rounded-3xl overflow-hidden border border-brand-wood/25 shadow-2xl bg-[#120F0D]">
              
              {/* Decorative premium framing details */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C4A882] font-semibold">
                    
                  </span>
                </div>
              </div>

              {/* Native responsive iframe directly referencing requested Kuula panoramic tour URL */}
              <iframe 
                key={activeSpace.id} // Ensure key refreshes iframe beautifully on switch
                src={activeSpace.url}
                width="100%" 
                height="640px" 
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
                title={`${activeSpace.name} - 3D Interactive Room Render`}
                referrerPolicy="no-referrer"
                className="w-full h-[520px] sm:h-[640px] select-none -mt-8"
              ></iframe>

              {/* Dark branding waterlines at footer */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:block">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/50 bg-[#2A2520]/80 px-3 py-1 rounded-md border border-white/5">
                  DESIGN SUITE // {activeSpace.id}
                </span>
              </div>

              {/* Mobile-friendly open button for touchscreens */}
              <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center sm:hidden px-4">
                <a
                  href={activeSpace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-dark px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-base shadow-lg shadow-black/20"
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
