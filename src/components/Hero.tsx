import React from 'react';

export default function Hero() {
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

  const kuulaHeroUrl = 'https://kuula.co/share/NjV1w?logo=0&info=0&fs=1&vr=0&sd=1&thumbs=1';

  return (
    <section id="hero-section" className="relative pt-24 md:pt-32 md:pb-16 min-h-screen flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={kuulaHeroUrl}
          title="Zanori Spaces interactive interior tour"
          className="absolute left-0 right-0 top-[-56px] w-full border-0"
          style={{ height: 'calc(100% + 56px)' }}
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-brand-dark/30 pointer-events-none" />
      
      <div className="relative flex flex-col justify-center space-y-8 z-10 px-6 md:px-12 py-8 flex-grow">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-brand-bark/80 flex items-center space-x-2">
              <span></span>
            </span>
            <div className="h-[1px] w-full bg-brand-wood/25"></div>
            <h1 className="font-serif text-5xl md:text-6xl font-light leading-[1.1] text-brand-base">
              Spaces designed around the way <span className="italic">you live.</span>
            </h1>
            <div className="h-[1px] w-full bg-brand-wood/25"></div>
          </div>

          <p className="text-sm font-light leading-relaxed text-brand-base/80 uppercase tracking-[0.1em]">
            Space Styling · Design Consultation · Curated Furniture 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="cta-book-hero"
              onClick={(e) => handleCtaClick(e, 'contact-section')}
              className="px-8 py-3.5 bg-brand-dark text-brand-base rounded-full hover:bg-[#8B6F52] hover:text-white text-xs uppercase tracking-[0.15em] font-medium shadow-sm transition-all duration-300 text-center cursor-pointer"
            >
              Book a consultation
            </button>
          
          </div>
        </div>
      </div>
    </section>
  );
}
