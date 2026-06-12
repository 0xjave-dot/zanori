import React, { useEffect, useState } from 'react';
import { useParallax } from '../hooks/useScrollReveal';

interface HeroProps {
  onOpenConsultationModal?: () => void;
}

export default function Hero({ onOpenConsultationModal }: HeroProps) {
  const [arrowTop, setArrowTop] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useParallax(0.4);

  useEffect(() => {
    const updateArrowTop = () => {
      const vh = window.innerHeight;
      const topPosition = Math.round(Math.min(vh * 0.78, vh - 100));
      setArrowTop(topPosition);
    };

    updateArrowTop();
    window.addEventListener('resize', updateArrowTop);
    return () => window.removeEventListener('resize', updateArrowTop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const kuulaHeroUrl = 'https://kuula.co/share/NjV1w?logo=0&info=0&fs=1&vr=0&sd=1&thumbs=1&gyro=0';

  const rotatingWords = ['Personality', 'Lifestyle', 'Taste', 'Vision'];
  const [highlightIdx, setHighlightIdx] = useState<number>(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHighlightIdx((current) => (current + 1) % rotatingWords.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section id="hero-section" className="relative pt-24 md:pt-32 pb-0 min-h-screen flex flex-col justify-between overflow-hidden bg-brand-base">
      {/* Parallax background with iframe */}
      <div className="absolute inset-0 overflow-hidden" ref={parallaxRef} style={{ willChange: 'transform' }}>
        <iframe
          src={kuulaHeroUrl}
          title="Zanori Spaces interactive interior tour"
          className="absolute left-0 right-0 top-[-56px] w-full border-0"
          style={{ height: 'calc(100% + 56px)' }}
          allow="xr-spatial-tracking"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Premium gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      
      {/* Content with animations */}
      <div className="relative flex flex-col justify-center space-y-8 z-10 px-6 md:px-12 py-8 flex-grow pointer-events-none">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-brand-ivory/70 flex items-center space-x-3 inline-flex">
              <span className="w-3 h-px bg-brand-cranberry"></span>
              <span></span>
            </span>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-brand-ivory">
              Spaces designed to reflect the
              <span className="block mt-3 text-brand-cranberry">
                {rotatingWords[highlightIdx]}
              </span>
              of each client.
            </h1>
            
            <p className="text-sm font-light leading-relaxed text-brand-ivory/80 uppercase tracking-[0.15em] max-w-2xl">
              SPACE STYLING. DESIGN POPULATION. TIMELESS FURNITURE
            </p>
          </div>

          {/* CTA Buttons with animations */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button
              id="cta-book-hero"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  handleCtaClick(e, 'contact-section');
                }
              }}
              className="pointer-events-auto px-8 py-4 bg-brand-cranberry text-brand-ivory hover:bg-brand-bark hover:text-brand-ivory text-xs uppercase tracking-[0.15em] font-semibold shadow-premium-md transition-all duration-400 text-center cursor-pointer rounded-lg btn-animated group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book a consultation
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={(e) => handleCtaClick(e, 'interactive-render-gallery')}
              className="pointer-events-auto px-8 py-4 border-2 border-brand-ivory/40 text-brand-ivory hover:border-brand-ivory hover:bg-brand-ivory/5 text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-400 text-center cursor-pointer rounded-lg btn-animated backdrop-blur-sm"
            >
              Explore Gallery
            </button>
          </div>
        </div>

        {/* Scroll indicator with animation */}
        <button
          type="button"
          onClick={(e) => handleCtaClick(e, 'interactive-render-gallery')}
          className="absolute right-6 z-30 inline-flex flex-col items-center pointer-events-auto text-brand-ivory hover:text-brand-cranberry transition-colors duration-300 lg:hidden animate-bounce"
          style={{ top: arrowTop }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] mb-3 text-brand-ivory/60">Scroll</span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-ivory/40 bg-brand-ivory/5 backdrop-blur-md hover:border-brand-cranberry/60 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 13L12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

