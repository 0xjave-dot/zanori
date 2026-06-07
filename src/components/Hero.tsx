import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [arrowTop, setArrowTop] = useState<number>(0);

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

  // Rotating verb settings
  const verbs = ['feel', 'breathe', 'move', 'flow', 'love'];
  const [verbIdx, setVerbIdx] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerbIdx((v) => (v + 1) % verbs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative pt-24 md:pt-32 md:pb-16 min-h-screen flex flex-col justify-between overflow-hidden bg-brand-base">
      <div className="absolute inset-0 overflow-hidden">
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
      <div className="absolute inset-0 bg-brand-dark/30 pointer-events-none" />
      
      <div className="relative flex flex-col justify-center space-y-8 z-10 px-6 md:px-12 py-8 flex-grow pointer-events-none">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark/80 flex items-center space-x-2">
              <span></span>
            </span>
            
            <h1 className="font-serif text-5xl md:text-6xl font-light leading-[1.1] text-brand-ivory">
              Spaces designed around the way you{' '}
              <span className="italic">
                <span key={verbs[verbIdx]} className="dynamic-verb drop-in text-brand-cranberry">{verbs[verbIdx]}</span>
              </span>
              .
            </h1>
            
          </div>

          <p className="text-sm font-light leading-relaxed text-brand-ivory/80 uppercase tracking-[0.1em]">
            Space Styling . Design Consultation . Curated Furniture 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="cta-book-hero"
              onClick={(e) => handleCtaClick(e, 'contact-section')}
              className="pointer-events-auto px-8 py-3.5 bg-brand-cranberry text-brand-base rounded-full hover:bg-brand-bark/90 hover:text-brand-base text-xs uppercase tracking-[0.15em] font-medium shadow-sm transition-all duration-300 text-center cursor-pointer"
            >
              Book a consultation
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => handleCtaClick(e, 'interactive-render-gallery')}
          className="absolute right-6 z-30 inline-flex flex-col items-center pointer-events-auto text-black hover:text-black transition-colors duration-300 lg:hidden"
          style={{ top: arrowTop }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] mb-2"></span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-base/40 bg-brand-base/90 backdrop-blur-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M18 13L12 19L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

