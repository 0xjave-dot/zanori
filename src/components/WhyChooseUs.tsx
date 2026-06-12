import React, { useEffect, useRef } from 'react';

export default function WhyChooseUs() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bioRef = useRef<HTMLElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bio = bioRef.current;
    const philosophy = philosophyRef.current;
    const grid = gridRef.current;

    if (hero) setTimeout(() => hero.classList.add('is-visible'), 120);

    const bioObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && bio) bio.classList.add('bio-visible'); });
    }, { threshold: 0.2 });

    const quoteObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && philosophy) philosophy.classList.add('quote-visible'); });
    }, { threshold: 0.3 });

    if (bio) bioObs.observe(bio);
    if (philosophy) quoteObs.observe(philosophy);

    let ticking = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!grid) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rx = (e.clientX / window.innerWidth - 0.5) * 14;
          const ry = (e.clientY / window.innerHeight - 0.5) * 10;
          grid.style.transform = `translate(${rx}px, ${ry}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onScroll = () => {
      if (!grid) return;
      grid.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      bioObs.disconnect();
      quoteObs.disconnect();
    };
  }, []);

  return (
    <div className="z-root" id="zRoot" ref={rootRef}>
      <div className="z-parallax-bg">
        <svg className="z-grid-lines" id="gridSvg" viewBox="0 0 600 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" ref={gridRef}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C4A882" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <line x1="0" y1="0" x2="600" y2="800" stroke="#C4A882" strokeWidth="0.3" />
          <line x1="300" y1="0" x2="300" y2="800" stroke="#C4A882" strokeWidth="0.3" />
          <line x1="0" y1="400" x2="600" y2="400" stroke="#C4A882" strokeWidth="0.3" />
        </svg>
      </div>

      <section className="z-hero" id="zHero" ref={heroRef}>
        <p className="z-eyebrow">Est. Lagos, Nigeria</p>
        <h1 className="z-headline">Welcome to<br /><em>Zanori Spaces</em></h1>
        <p className="z-subhead"></p>

        <div className="z-services">
          <div className="z-service">
            <p className="z-service-num">I</p>
            <p className="z-service-title">Functional Interior &amp; Exterior Design</p>
          </div>
          <div className="z-service">
            <p className="z-service-num">II</p>
            <p className="z-service-title">Timeless Furniture &amp; 3D Visualisation</p>
          </div>
          <div className="z-service">
            <p className="z-service-num">III</p>
            <p className="z-service-title">Project Management &amp; Site Supervision</p>
          </div>
        </div>
      </section>

      <section className="z-bio" id="zBio" ref={bioRef}>
        <div className="z-portrait-col">
          <div className="z-portrait-frame">
            <div className="z-portrait-inner">
              Adejumoke<br />Founder &amp; Lead Designer<br /><br />
              <span style={{ fontSize: 11, opacity: 0.5 }}>[ portrait ]</span>
            </div>
            <div className="z-portrait-accent" />
          </div>
          <div className="z-founder-tag">
            <p className="z-founder-name">Adejumoke</p>
            <p className="z-founder-title">Certified Space Stylist &middot; Founder &amp; Lead Designer</p>
          </div>
        </div>

        <div className="z-story-col">
          <p className="z-story-label">The Designer</p>

          <div className="z-years-badge">
            <span className="z-years-num">4+</span>
            <span className="z-years-label">Years<br />transforming spaces</span>
          </div>

          <h2 className="z-story-heading">Design beyond<br />aesthetics</h2>

          <p className="z-story-body">My name is Adejumoke, a Certified Space Stylist and Interior Designer, and the Founder &amp; Lead Designer of Zanori Spaces. For over four years, we have been transforming spaces into sanctuaries.</p>

          <p className="z-story-body">For me, design goes beyond aesthetics. It is about creating intentional spaces that seamlessly blend beauty, functionality, and curated luxury. It is the art of crafting timeless interiors and bespoke furniture that reflect the personality, lifestyle, and vision of each client.</p>

          <div className="z-divider" />

          <p className="z-story-body">My mission is simple: to create distinctive spaces where every detail is thoughtfully considered, every piece serves a purpose, and every corner tells a story.</p>

          <p className="z-story-body" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic', color: 'rgba(245,240,234,0.6)' }}>Because every space holds a story. At Zanori Spaces, we craft yours and make it timeless.</p>
        </div>
      </section>

      <section className="z-philosophy" id="zPhilosophy" ref={philosophyRef}>
        <span className="z-quote-mark">"</span>
        <p className="z-quote-text">Every space holds a story. At Zanori Spaces, we craft yours and make it <em>timeless.</em></p>
        <p className="z-location">Founded in Lagos, Nigeria</p>
      </section>
    </div>
  );
}


