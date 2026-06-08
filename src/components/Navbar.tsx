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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'py-4 bg-brand-base/95 backdrop-blur-md shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#/"
            onClick={(e) => handleLinkClick(e, '#/')}
            className="font-serif text-2xl font-light tracking-[0.2em] text-brand-ivory hover:opacity-80 transition-opacity"
          >
            ZANORI SPACES
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.15em] font-light text-brand-muted">
            <a
              href="#/work"
              onClick={(e) => handleLinkClick(e, '#/work')}
              className={`hover:text-brand-dark transition-colors duration-300 relative py-1 group ${
                currentPage === 'work' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Work
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-bark transition-transform duration-300 origin-left ${
                currentPage === 'work' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>
            
            <a
              href="#/services"
              onClick={(e) => handleLinkClick(e, '#/services')}
              className={`hover:text-brand-dark transition-colors duration-300 relative py-1 group ${
                currentPage === 'services' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-bark transition-transform duration-300 origin-left ${
                currentPage === 'services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>

            <a
              href="#/shop"
              onClick={(e) => handleLinkClick(e, '#/shop')}
              className={`hover:text-brand-dark transition-colors duration-300 relative py-1 group ${
                currentPage === 'shop' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              Shop
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-bark transition-transform duration-300 origin-left ${
                currentPage === 'shop' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>

            <a
              href="#/ai-renderer"
              onClick={(e) => handleLinkClick(e, '#/ai-renderer')}
              className={`hover:text-brand-dark transition-colors duration-300 relative py-1 group ${
                currentPage === 'ai-renderer' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              <span>My Space</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-bark transition-transform duration-300 origin-left ${
                currentPage === 'ai-renderer' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>

            <a
              href="#/account"
              onClick={(e) => handleLinkClick(e, '#/account')}
              className={`hover:text-brand-dark transition-colors duration-300 relative py-1 group ${
                currentPage === 'account' ? 'text-brand-ivory font-medium' : ''
              }`}
            >
              <span>{user ? (user.displayName || user.email?.split('@')[0] || 'Member') : 'Account'}</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-bark transition-transform duration-300 origin-left ${
                currentPage === 'account' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </a>
          </div>

          {/* Right Pillar */}
          <div className="hidden md:flex items-center space-x-4">
            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={onOpenInquiryDrawer}
                className="text-xs uppercase tracking-[0.1em] text-brand-bark transition-colors py-1 cursor-pointer"
              >
                Inquiry List ({inquiryCount})
              </button>
            )}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#/', 'contact-section')}
              className="px-6 py-2.5 bg-brand-cranberry text-brand-base rounded-full hover:bg-brand-bark/90 hover:text-brand-base text-xs uppercase tracking-[0.15em] transition-all duration-300"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile controllers */}
          <div className="flex items-center space-x-4 md:hidden">
            {inquiryCount > 0 && (
              <button
                type="button"
                onClick={onOpenInquiryDrawer}
                className="text-xs font-light text-brand-bark underline underline-offset-4"
              >
                Inquiry ({inquiryCount})
              </button>
            )}
            <button
              type="button"
              id="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-ivory hover:opacity-75 transition-opacity"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full screen mobile overlay menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-30 bg-brand-base flex flex-col justify-between p-12 transition-all duration-300"
        >
          <div className="flex flex-col space-y-8 mt-24">
            <div className="text-[10px] uppercase tracking-[0.25em] text-brand-muted pb-2">
              
            </div>
            
            <a
              href="#/work"
              onClick={(e) => handleLinkClick(e, '#/work')}
              className={`text-xs uppercase tracking-[0.15em] font-light ${currentPage === 'work' ? 'text-brand-ivory font-medium' : 'text-brand-muted hover:text-brand-dark'}`}
            >
              Work
            </a>
            
            <a
              href="#/services"
              onClick={(e) => handleLinkClick(e, '#/services')}
              className={`text-xs uppercase tracking-[0.15em] font-light ${currentPage === 'services' ? 'text-brand-ivory font-medium' : 'text-brand-muted hover:text-brand-dark'}`}
            >
              Services
            </a>

            <a
              href="#/shop"
              onClick={(e) => handleLinkClick(e, '#/shop')}
              className={`text-xs uppercase tracking-[0.15em] font-light ${currentPage === 'shop' ? 'text-brand-ivory font-medium' : 'text-brand-muted hover:text-brand-dark'}`}
            >
              Shop
            </a>

            <a
              href="#/ai-renderer"
              onClick={(e) => handleLinkClick(e, '#/ai-renderer')}
              className={`text-xs uppercase tracking-[0.15em] font-light ${currentPage === 'ai-renderer' ? 'text-brand-ivory font-medium' : 'text-brand-muted hover:text-brand-dark'}`}
            >
              My Space
            </a>

            <a
              href="#/account"
              onClick={(e) => handleLinkClick(e, '#/account')}
              className={`text-xs uppercase tracking-[0.15em] font-light ${currentPage === 'account' ? 'text-brand-ivory font-medium' : 'text-brand-muted hover:text-brand-dark'}`}
            >
              {user ? (user.displayName || user.email?.split('@')[0] || 'Member') : 'Account'}
            </a>
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
              className="px-8 py-4 bg-brand-dark text-brand-base rounded-full hover:bg-brand-wood hover:text-brand-dark text-center text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              Book a consultation
            </button>
            <div className="flex items-center justify-between text-[10px] text-brand-muted tracking-[0.1em] pt-4">
              <span>LAGOS, NIGERIA</span>
              <span>ZANORI SPACES © 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

