import React from 'react';
import { Instagram, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handlesScrollUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHash: string, scrollToId?: string) => {
    if (scrollToId) {
      if (window.location.hash !== '' && window.location.hash !== '#/') {
        // Go home with specific anchor
        window.location.hash = `#/home-${scrollToId}`;
      } else {
        // Already on home, scroll
        e.preventDefault();
        const element = document.getElementById(scrollToId);
        if (element) {
          const offset = 85;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      window.location.hash = targetHash;
    }
  };

  return (
    <footer className="bg-brand-bark text-brand-base pt-16 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Very top: Thin wood-tone hairline */}
        <div className="h-[1px] w-full bg-brand-cranberry/15"></div>

        {/* Brand layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="font-serif text-3xl font-light tracking-[0.2em] text-white">
              ZANORI SPACES
            </h3>
            <p className="text-xs font-light text-brand-sand/60 italic font-mono uppercase tracking-wider leading-relaxed max-w-sm">
              Spaces designed around the way you live.
            </p>
          </div>

          {/* Nav links repeated */}
          <div className="md:col-span-4 flex flex-col space-y-3.5 text-xs font-light uppercase tracking-[0.15em] text-brand-sand">
            <span className="text-[10px] text-brand-wood font-mono tracking-widest font-semibold block mb-1">
              
            </span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <a
                href="#/work"
                onClick={(e) => handleLinkClick(e, '#/work')}
                className="hover:text-white transition-colors duration-200"
              >
                Work
              </a>
              <a
                href="#/services"
                onClick={(e) => handleLinkClick(e, '#/services')}
                className="hover:text-white transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#/shop"
                onClick={(e) => handleLinkClick(e, '#/shop')}
                className="hover:text-white transition-colors duration-200"
              >
                Shop
              </a>
              <a
                href="#/ai-renderer"
                onClick={(e) => handleLinkClick(e, '#/ai-renderer')}
                className="hover:text-white transition-colors duration-200"
              >
                My Spaces
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#/', 'contact-section')}
                className="hover:text-white transition-colors duration-200 font-medium text-brand-wood font-mono"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Back to top & Socials */}
          <div className="md:col-span-3 flex flex-col justify-between h-full space-y-6 md:text-right">
            <div>
              <span className="text-[10px] text-brand-wood font-mono tracking-widest font-semibold block mb-3">
                FOLLOW US
              </span>
              <div className="flex items-center space-x-4 md:justify-end">
                <a
                  href="#ig"
                  aria-label="Instagram Link"
                  className="p-2 bg-brand-base/70 hover:bg-brand-cranberry hover:text-brand-base rounded-full transition-all border border-brand-wood/15"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="#tel"
                  aria-label="WhatsApp Link"
                  className="p-2 bg-brand-base/70 hover:bg-brand-cranberry hover:text-brand-base rounded-full transition-all border border-brand-wood/15"
                >
                  <Phone size={14} />
                </a>
                <button
                  type="button"
                  onClick={handlesScrollUp}
                  className="p-2 bg-brand-base/5 hover:bg-brand-base hover:text-brand-dark rounded-full transition-all border border-brand-base/15 group cursor-pointer"
                  aria-label="Scroll back to top"
                >
                  <ArrowUp size={14} className="transform transition-transform duration-300 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lower copyright row */}
        <div className="pt-8 border-t border-brand-wood/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-muted/70 tracking-widest font-light gap-4">
          <span>ZANORI SPACES</span>
          <span>&copy; 2026 ZANORI SPACES STUDIO &bull; INC. ALL RIGHTS RESERVED &bull; <a href="#/admin" className="text-brand-sand/70 hover:text-brand-base transition-colors duration-300">Admin</a></span>
        </div>
      </div>
    </footer>
  );
}
