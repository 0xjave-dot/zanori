import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

export default function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-rotate testimonials to make the site feel very alive and premium
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = TESTIMONIALS_DATA[activeIdx];

  return (
    <section id="testimonial-section" className="py-24 bg-brand-sand/75 text-brand-dark flex items-center justify-center border-b border-brand-wood/10 relative overflow-hidden">
      
      {/* Absolute Decorative Geometric Ambient Backplate Marks */}
      <div className="absolute top-8 left-8 text-[90px] font-serif italic text-brand-base/20 select-none pointer-events-none">“</div>
      <div className="absolute bottom-8 right-8 text-[90px] font-serif italic text-brand-base/20 select-none pointer-events-none">”</div>

      <div className="max-w-2xl mx-auto px-6 text-center space-y-8 relative z-10">
        
        {/* Underlines heading */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-bark block">
            WHAT OUR CLIENTS SAY
          </span>
          <div className="h-4 w-4 bg-brand-wood/30 rounded-full flex items-center justify-center">
            <div className="h-1.5 w-1.5 bg-brand-bark rounded-full"></div>
          </div>
        </div>

        {/* Big italic quote */}
        <div className="min-h-[140px] md:min-h-[120px] flex items-center justify-center transition-all duration-500">
          <blockquote className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed text-brand-dark/95">
            "{current.quote}"
          </blockquote>
        </div>

        {/* Thin rule split */}
        <div className="h-[1px] w-24 bg-brand-wood mx-auto"></div>

        {/* Author Metadata */}
        <div className="space-y-1">
          <cite className="not-italic text-sm font-semibold tracking-wide text-brand-dark block">
            {current.client}
          </cite>
          <span className="text-xs font-light text-brand-muted uppercase tracking-widest font-mono">
            {current.project}
          </span>
        </div>

        {/* Dots Indicator with Manual Click Trigger */}
        <div className="flex items-center justify-center space-x-2.5 pt-4">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeIdx === idx ? 'w-6 bg-brand-bark' : 'w-2 bg-brand-wood/60 hover:bg-brand-wood'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            ></button>
          ))}
        </div>

      </div>
    </section>
  );
}
