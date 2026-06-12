import React, { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const [count, setCount] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() => Array(paragraphs.length + 1).fill(false));
  const countRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasAnimated = useRef(false);
  const headline = 'So, Why Us?';

  const paragraphs = [
    'Welcome to Zanori Spaces',
    'This is the essence of what we do:',
    'Functional Interior and Exterior Design.',
    'Timeless Furnitures & 3D Visualization',
    'Project Management and Site Supervision',
    'For over four years, we have been transforming spaces into sanctuaries.',
    'My name is Adejumoke, I am a Certified Space Stylist and Interior Designer, and the Founder & Lead Designer of Zanori Spaces.',
    'For me, design goes beyond aesthetics. It is about creating intentional spaces that seamlessly blend beauty, functionality, and curated luxury. It is the art of crafting timeless interiors and bespoke furniture that reflect the personality, lifestyle, and vision of each client.',
    'My mission is simple: to create distinctive spaces where every detail is thoughtfully considered, every piece serves a purpose, and every corner tells a story.',
    'Because every space holds a story. At Zanori Spaces, we craft yours and make it timeless.'
  ];

  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout> | null = null;
    let restartTimeout: ReturnType<typeof setTimeout> | null = null;

    const startTyping = () => {
      setCursorBlinking(false);
      setTypedText('');
      let i = 0;

      const step = () => {
        const delay = 90 + Math.floor(Math.random() * 80);
        typingTimeout = setTimeout(() => {
          i += 1;
          setTypedText(headline.slice(0, i));
          if (i < headline.length) {
            step();
          } else {
            setCursorBlinking(true);
            restartTimeout = setTimeout(() => {
              setCursorBlinking(false);
              startTyping();
            }, 3000);
          }
        }, delay);
      };

      step();
    };

    startTyping();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const target = 50;
          const step = target / 40;

          const countInterval = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(countInterval);
              return;
            }
            setCount(Math.floor(current));
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
      if (restartTimeout) clearTimeout(restartTimeout);
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((current) => {
              if (current[index]) return current;
              const updated = [...current];
              updated[index] = true;
              return updated;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us-section" className="py-24 md:py-32 text-slate-900 relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-900/5 to-transparent" />
      <div className="absolute inset-x-0 top-16 text-[4rem] md:text-[6rem] leading-none font-black uppercase text-slate-900/5 select-none tracking-[0.6em] text-center" style={{ transform: `translateY(${scrollY * 0.04}px)` }}>
        ZANORI
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-10">
            <div className="max-w-3xl space-y-6">
              <div className="reveal reveal-visible">
                <p className="text-xs uppercase tracking-[0.4em] text-brand-cranberry font-semibold">
                  Welcome to Zanori Spaces
                </p>
                <h2 className="font-serif text-5xl md:text-6xl font-light leading-[1.05] text-white">
                  We create timeless spaces that feel intentional, elevated, and built to last.
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
                        <p className="z-subhead">This is the essence of what we do</p>

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
