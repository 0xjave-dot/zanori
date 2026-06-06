import React from 'react';
import { Award, Compass, Heart } from 'lucide-react';

export default function DesignerBio() {
  return (
    <section id="designer-bio-section" className="py-24 md:py-32 bg-brand-warm border-b border-brand-wood/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Portrait & Architectural Artifact Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-brand-wood/25 shadow-xl group">
              <img
                src="https://i.ibb.co/qL2XrNxn/IMG-20260606-151745-913.jpg"
                alt="Adejumoke - Creative Director"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent pointer-events-none"></div>
              
            
            </div>

            {/* Behind-frame designer block decoration */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-sand/40 -z-10 rounded-2xl border border-brand-wood/15"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-bark/10 -z-10 rounded-3xl"></div>
          </div>

          {/* Biography & Philosophy Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-[#8B6F52] font-semibold">
                <span>THE CREATIVE EYE</span>
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-dark leading-tight">
                Adejumoke
                <span className="block font-sans text-sm tracking-widest uppercase text-brand-muted mt-2 font-medium">
                  Creative Director &amp; Founder
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-brand-muted text-[14px] leading-relaxed font-light">
              <p>
                Your bio goes here
              </p>
            </div>

            {/* Three Pillars Core Value list */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-brand-wood/20">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#8B6F52]">
                  <Compass size={14} />
                  <span className="text-xs uppercase font-medium tracking-wider">Background</span>
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                 
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#8B6F52]">
                  <Award size={14} />
                  <span className="text-xs uppercase font-medium tracking-wider">Experience</span>
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#8B6F52]">
                  <Heart size={14} />
                  <span className="text-xs uppercase font-medium tracking-wider">Passion</span>
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed font-light">
                  
                </p>
              </div>
            </div>

            {/* Personal signature */}
            <div className="pt-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="block font-serif text-3xl font-light italic text-[#2A2520]">
                  Adejumoke
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8B6F52] block font-medium">
                 
                </span>
              </div>
              <div className="text-[11px] font-mono text-brand-muted/70 tracking-wider">
                
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
