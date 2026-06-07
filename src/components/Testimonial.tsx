import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeCheck, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

const ROTATION_MS = 10000;
const STAR_COLOR = 'var(--color-brand-cranberry)';
const backgroundImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85';
const profileImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s';

const collageFrames = [
  { className: 'left-[-12%] top-[8%] w-[118px] -rotate-[5deg] opacity-80 z-10 sm:left-[0%] sm:top-[14%] sm:w-[170px] lg:w-[210px]' },
  { className: 'left-[18%] top-[2%] w-[128px] rotate-[3deg] z-30 sm:left-[16%] sm:top-[7%] sm:w-[185px] lg:w-[220px]' },
  { className: 'left-[2%] top-[38%] w-[122px] rotate-[5deg] z-20 sm:left-[8%] sm:top-[43%] sm:w-[170px] lg:w-[205px]' },
  { className: 'left-[38%] top-[27%] w-[130px] -rotate-[3deg] z-40 sm:left-[32%] sm:top-[31%] sm:w-[185px] lg:w-[220px]' },
  { className: 'left-[25%] top-[66%] w-[120px] rotate-[2deg] z-20 sm:w-[170px] lg:w-[205px]' }
];

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} size={size} className="fill-brand-cranberry text-brand-cranberry" strokeWidth={1.8} />
      ))}
    </div>
  );
}

export default function Testimonial() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, ROTATION_MS);

    return () => window.clearInterval(interval);
  }, []);

  const current = TESTIMONIALS_DATA[activeIdx];
  const totalTestimonials = TESTIMONIALS_DATA.length;
  const getCircularIndex = (index: number) => (index + totalTestimonials) % totalTestimonials;
  const mobileOffsets = [-2, -1, 0, 1, 2];
  const mobileTestimonials = mobileOffsets.map((offset) => ({
    item: TESTIMONIALS_DATA[getCircularIndex(activeIdx + offset)],
    offset
  }));

  const mobilePositionStyles = [
    { left: '0%', translateX: '0%', scale: 0.72, zIndex: 10, opacity: 0.3, width: '50%' },
    { left: '12%', translateX: '0%', scale: 0.85, zIndex: 20, opacity: 0.65, width: '58%' },
    { left: '50%', translateX: '-50%', scale: 1, zIndex: 30, opacity: 1, width: '72%' },
    { left: '84%', translateX: '-100%', scale: 0.85, zIndex: 20, opacity: 0.65, width: '58%' },
    { left: '100%', translateX: '-100%', scale: 0.72, zIndex: 10, opacity: 0.3, width: '50%' }
  ];

  const scattered = collageFrames.map((frame, idx) => {
    const itemIndex = (activeIdx + idx + 1) % TESTIMONIALS_DATA.length;
    return {
      frame: frame.className,
      item: TESTIMONIALS_DATA[itemIndex]
    };
  });

  return (
    <section
      id="testimonial-section"
      className="relative overflow-hidden border-b border-brand-wood/10 bg-brand-bark py-12 sm:min-h-[720px] sm:py-20 md:min-h-[640px] text-brand-base"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-brand-bark/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 md:px-12">
        {/* Mobile: Layered depth stack testimonials */}
        <div className="block sm:hidden space-y-8">
          {/* Section title */}
          <div className="relative h-16 flex items-center">
            <h2 className="font-serif text-5xl font-light text-brand-ivory -rotate-6 italic origin-left">
              Testimonials
            </h2>
          </div>

          {/* Three-card depth stack */}
          <div className="relative h-96 flex items-center justify-center px-4" style={{ perspective: '1200px' }}>
            <div className="relative w-96 h-80 flex items-center justify-center" style={{ overflow: 'visible' }}>
              <AnimatePresence mode="wait">
                {/* Left card (behind, rotated, blurred) */}
                <motion.div
                  key={`left-${activeIdx}`}
                  initial={{ opacity: 0, x: -100, rotateZ: -6, scale: 0.7 }}
                  animate={{ opacity: 0.55, x: 0, rotateZ: -6, scale: 0.82 }}
                  exit={{ opacity: 0, x: -100, rotateZ: -6, scale: 0.7 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute w-72 h-80 rounded-[20px] bg-testimonial-card film-grain p-6 border border-brand-wood/10 cursor-pointer"
                  style={{
                    filter: 'blur(2.5px)',
                    zIndex: 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    transform: 'translateX(-55%) rotateZ(-6deg) scale(0.82)',
                    marginLeft: '-110px',
                  }}
                >
                  <div className="opacity-40 text-6xl font-serif text-brand-cranberry leading-none mb-2">
                    "
                  </div>
                </motion.div>

                {/* Center card (front, sharp) */}
                <motion.div
                  key={`center-${activeIdx}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -28 }}
                  className="relative w-72 h-80 rounded-[20px] bg-testimonial-card film-grain p-6 border border-brand-wood/10 z-30 cursor-pointer"
                  style={{
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Floating badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-brand-cranberry text-brand-ivory rounded-full px-3 py-2 flex items-center gap-2 text-xs font-bold shadow-lg z-40 animate-float-bob"
                  >
                    <span>❤</span>
                    <span>125</span>
                  </motion.div>

                  {/* Quote mark */}
                  <div className="text-6xl font-serif text-brand-cranberry opacity-40 leading-none mb-3">
                    "
                  </div>

                  {/* Avatar + name + stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-wood/30 flex items-center justify-center">
                      <img
                        src={profileImage}
                        alt={current.client}
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-brand-ivory">{current.client}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} className="fill-testimonial-gold text-testimonial-gold" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review body */}
                  <p className="text-sm leading-relaxed text-brand-base mb-4 line-clamp-4">
                    {current.quote}
                  </p>

                  {/* Bottom icons */}
                  <div className="flex gap-6 text-testimonial-icons mt-auto pt-4 border-t border-brand-wood/20">
                    <button className="hover:text-brand-ivory transition-colors">
                      <span className="text-lg">❤</span>
                    </button>
                    <button className="hover:text-brand-ivory transition-colors">
                      <span className="text-lg">💬</span>
                    </button>
                    <button className="hover:text-brand-ivory transition-colors">
                      <span className="text-lg">↗</span>
                    </button>
                  </div>
                </motion.div>

                {/* Right card (behind, rotated, blurred) */}
                <motion.div
                  key={`right-${activeIdx}`}
                  initial={{ opacity: 0, x: 100, rotateZ: 6, scale: 0.7 }}
                  animate={{ opacity: 0.55, x: 0, rotateZ: 6, scale: 0.82 }}
                  exit={{ opacity: 0, x: 100, rotateZ: 6, scale: 0.7 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute w-72 h-80 rounded-[20px] bg-testimonial-card film-grain p-6 border border-brand-wood/10 cursor-pointer"
                  style={{
                    filter: 'blur(2.5px)',
                    zIndex: 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    transform: 'translateX(55%) rotateZ(6deg) scale(0.82)',
                    marginRight: '-110px',
                  }}
                >
                  <div className="opacity-40 text-6xl font-serif text-brand-cranberry leading-none mb-2">
                    "
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-7 bg-brand-ivory' : 'w-2.5 bg-brand-ivory/40 hover:bg-brand-ivory/60'
                  }`}
                  aria-label={`Show testimonial from ${item.client}`}
                />
              ))}
            </div>
            <div className="h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-brand-wood/20">
              <motion.div
                key={activeIdx}
                className="h-full rounded-full bg-brand-ivory"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: ROTATION_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-[0.82fr_1.18fr] items-center gap-2 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="relative min-h-[510px] sm:min-h-[540px] lg:min-h-[520px]">
            <AnimatePresence mode="popLayout">
              {scattered.map(({ item, frame }, idx) => (
                <motion.article
                  key={`${activeIdx}-${idx}`}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, delay: idx * 0.04 }}
                  className={`absolute rounded-[16px] bg-brand-base p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${frame}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Stars size={13} />
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold text-brand-dark/90">
                      <BadgeCheck size={10} className="fill-brand-cranberry text-white" />
                      Testimonial
                    </span>
                  </div>

                  <p className="line-clamp-4 min-h-[74px] text-[11px] leading-relaxed text-brand-dark/90">
                    {item.quote}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-brand-wood/15 pt-3">
                    <img
                      src={profileImage}
                      alt={item.client}
                      className="h-7 w-7 rounded-full object-cover sm:h-9 sm:w-9"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-brand-dark">{item.client}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeIdx}
                initial={{ opacity: 0, x: 140 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -140 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[16px] bg-brand-base p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-8 md:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <img
                    src={profileImage}
                    alt={current.client}
                    className="h-14 w-14 rounded-full object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
                    referrerPolicy="no-referrer"
                  />
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-base/95 px-2 py-1 text-[8px] font-bold text-brand-dark sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
                    <BadgeCheck size={14} className="fill-brand-cranberry text-white" />
                    Testimonial
                  </span>
                </div>

                <div className="mt-5 flex justify-end sm:mt-8">
                  <Stars size={18} />
                </div>

                <blockquote className="mt-5 text-[1.05rem] font-bold leading-tight text-brand-dark sm:mt-8 sm:text-[1.35rem] md:text-[1.5rem]">
                  {current.quote}
                </blockquote>

                <div className="mt-7 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-7">
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImage}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <cite className="not-italic text-sm font-bold text-brand-dark">{current.client}</cite>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-dark">
                    <BadgeCheck size={18} className="fill-brand-cranberry text-white" />
                    Testimonial
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-3">
              {TESTIMONIALS_DATA.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-9 bg-brand-bark' : 'w-2.5 bg-brand-wood/40 hover:bg-brand-wood/60'
                  }`}
                  aria-label={`Show testimonial from ${item.client}`}
                />
              ))}
            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-brand-wood/20">
              <motion.div
                key={activeIdx}
                className="h-full rounded-full"
                style={{ backgroundColor: STAR_COLOR }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: ROTATION_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
