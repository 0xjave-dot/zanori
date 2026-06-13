import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenInquiryDrawer: () => void;
  inquiryCount: number;
  currentPage: string;
  user?: any;
  onBlockedNavigation: () => void;
  onOpenConsultationModal?: () => void;
}

export default function Navbar({ onOpenInquiryDrawer, inquiryCount, currentPage, user, onBlockedNavigation, onOpenConsultationModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHash: string, scrollToId?: string) => {
    setIsMobileMenuOpen(false);
    
    if (scrollToId) {
      // If we are navigating to home anchors
      if (window.location.hash !== '' && window.location.hash !== '#/') {
        // If not on home, go home first, then let hashchange handle it
        window.location.hash = `#/home-${scrollToId}`;
      } else {
        // Already on home, scroll directly
        const element = document.getElementById(scrollToId);
        if (element) {
          e.preventDefault();
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
      }
    } else if (targetHash !== '#/') {
      e.preventDefault();
      onBlockedNavigation();
    } else {
      window.location.hash = targetHash;
    }
  };

  return (
    <>
      <nav
        id="nav-bar"
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'py-3 bg-brand-base/80 backdrop-blur-xl shadow-premium-md border-b border-brand-ivory/10'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo with hover effect */}
          <a
            href="#/"
            onClick={(e) => handleLinkClick(e, '#/')}
            className="font-serif text-2xl font-light tracking-[0.2em] text-brand-ivory hover:text-brand-cranberry transition-all duration-300 transform hover:scale-105"
          >
            ZANORI SPACES
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-12 text-xs uppercase tracking-[0.15em] font-light text-brand-ivory/70">
            <a
              href="#/work"
              onClick={(e) => handleLinkClick(e, '#/work')}
              className={`transition-all duration-300 relative py-1 group hover:text-brand-ivory ${
                currentPage === 'work' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Work
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cranberry to-brand-cranberry transition-all duration-300 origin-left ${
                currentPage === 'work' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            
            <a
              href="#/services"
              onClick={(e) => handleLinkClick(e, '#/services')}
              className={`transition-all duration-300 relative py-1 group hover:text-brand-ivory ${
                currentPage === 'services' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cranberry to-brand-cranberry transition-all duration-300 origin-left ${
                currentPage === 'services' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>

            <a
              href="#/shop"
              onClick={(e) => handleLinkClick(e, '#/shop')}
              className={`transition-all duration-300 relative py-1 group hover:text-brand-ivory ${
                currentPage === 'shop' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Shop
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cranberry to-brand-cranberry transition-all duration-300 origin-left ${
                currentPage === 'shop' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>

            <a
              href="#/ai-renderer"
              onClick={(e) => handleLinkClick(e, '#/ai-renderer')}
              className={`transition-all duration-300 relative py-1 group hover:text-brand-ivory ${
                currentPage === 'ai-renderer' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              <span>My Space</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cranberry to-brand-cranberry transition-all duration-300 origin-left ${
                currentPage === 'ai-renderer' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>

            <a
              href="#/account"
              onClick={(e) => handleLinkClick(e, '#/account')}
              className={`transition-all duration-300 relative py-1 group hover:text-brand-ivory ${
                currentPage === 'account' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              <span>{user ? (user.displayName || user.email?.split('@')[0] || 'Member') : 'Account'}</span>
              <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-cranberry to-brand-cranberry transition-all duration-300 origin-left ${
                currentPage === 'account' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          </div>

          {/* Right Pillar */}
          <div className="hidden md:flex items-center space-x-5">
            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={onOpenInquiryDrawer}
                className="text-xs uppercase tracking-[0.1em] text-brand-ivory/70 hover:text-brand-cranberry transition-colors duration-300 py-1 cursor-pointer relative group"
              >
                Inquiry List ({inquiryCount})
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cranberry group-hover:w-full transition-all duration-300"></span>
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  handleLinkClick(e as any, '#/', 'contact-section');
                }
              }}
              className="px-6 py-2.5 bg-brand-cranberry text-brand-ivory hover:bg-brand-cranberry/80 rounded-lg text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-premium-md hover:shadow-premium-lg transform hover:scale-105 btn-animated"
            >
              Get in touch
            </button>
          </div>

          {/* Mobile controllers */}
          <div className="flex items-center space-x-4 md:hidden">
            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={onOpenInquiryDrawer}
                className="text-xs font-light text-brand-ivory underline underline-offset-4 hover:text-brand-cranberry transition-colors"
              >
                Inquiry ({inquiryCount})
              </button>
            )}
            <button
              type="button"
              id="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 text-brand-ivory transition-all duration-300 ease-in-out hover:text-brand-cranberry"
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-90 rotate-90' : 'opacity-100 scale-100'}`}>
                <Menu size={24} strokeWidth={1.5} />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -rotate-90'}`}>
                <X size={24} strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full screen mobile overlay menu */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-30 bg-gradient-to-b from-brand-base via-brand-base to-brand-warm flex flex-col justify-between p-8 md:p-12 transition-all duration-400 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col space-y-8 mt-12">
          <div className="text-[10px] uppercase tracking-[0.3em] text-brand-ivory/60 pb-4 border-b border-brand-ivory/20">
            
          </div>

          {[
            { label: 'Work', href: '#/work', current: currentPage === 'work' },
            { label: 'Services', href: '#/services', current: currentPage === 'services' },
            { label: 'Shop', href: '#/shop', current: currentPage === 'shop' },
            { label: 'My Space', href: '#/ai-renderer', current: currentPage === 'ai-renderer' },
            { label: user ? (user.displayName || user.email?.split('@')[0] || 'Member') : 'Account', href: '#/account', current: currentPage === 'account' }
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`mobile-menu-item text-sm uppercase tracking-[0.12em] font-light transition-all duration-300 ease-out ${item.current ? 'text-brand-ivory font-semibold' : 'text-brand-ivory/70 hover:text-brand-ivory'}`}
              style={{ transitionDelay: `${isMobileMenuOpen ? idx * 60 + 120 : 0}ms` }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col space-y-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenConsultationModal) {
                onOpenConsultationModal();
              } else {
                handleLinkClick(e as any, '#/', 'contact-section');
              }
            }}
            className="px-8 py-4 bg-brand-cranberry text-brand-ivory rounded-lg hover:bg-brand-cranberry/90 text-center text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-premium-md btn-animated"
            style={{ transitionDelay: `${isMobileMenuOpen ? 420 : 0}ms` }}
          >
            Book a consultation
          </button>
          <div className="flex flex-col gap-3 text-[9px] text-brand-ivory/50 tracking-[0.15em] pt-4 opacity-80 transition-all duration-300" style={{ transitionDelay: `${isMobileMenuOpen ? 460 : 0}ms` }}>
            <span>LAGOS, NIGERIA</span>
            <span>ZANORI SPACES © 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
