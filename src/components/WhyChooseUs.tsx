import React, { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const [count, setCount] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(false);
  const countRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);
  const headline = 'So, Why Us?';

  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout> | null = null;
    let restartTimeout: ReturnType<typeof setTimeout> | null = null;

    const startTyping = () => {
      setCursorBlinking(false);
      setTypedText('');
      let i = 0;

      const step = () => {
        const delay = 90 + Math.floor(Math.random() * 80); // 90-170ms per char for natural rhythm
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
            }, 3000); // shorter pause before restart
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

  return (
    <section
      id="why-choose-us-section"
      className="py-24 md:py-32 lg:pt-32 text-white relative"
      style={{
        backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/63aeb3477b2cb6535cef4570/bcf48934-d3b6-44d9-a91e-4db949227e03/Trauma+lily+okamoto+abstract+painting.JPG")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-10">
          {/* Left: Headline + paragraph - sticks to left edge on md+ */}
          <div className="w-full md:w-1/2 flex md:justify-start justify-center">
            <div className="max-w-xl md:text-left text-center space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-[1.2] text-white">
                <span className="typewriter-text">{typedText}</span>
                <span className={`typewriter-cursor ${cursorBlinking ? 'blinking' : ''}`}>|</span>
              </h2>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/90">
                At Zanori Spaces, we're more than interior designers, we're people, and we build bridges between how you live and how your space looks. We are passionate about intentional design and an unreal commitment to quality. We've been transforming spaces into sanctuaries for over 4 years and we're dedicated to making environments that reflect your unique taste and the rhythm of your everyday life.
              </p>
            </div>
          </div>

          {/* Right: Count - sticks to right edge on md+ */}
          <div className="w-full md:w-1/2 flex md:justify-end justify-center" ref={countRef}>
            <div className="flex flex-col items-end gap-2">
              <div className="font-serif text-7xl md:text-[156px] leading-none font-light text-brand-cranberry">
                {count}
                <span className="inline-block align-super text-4xl md:text-6xl">+</span>
              </div>
              <div className="text-sm md:text-base font-light text-white/90">Satisfied Clients & Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
