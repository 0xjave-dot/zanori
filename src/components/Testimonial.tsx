import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BadgeCheck, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

const ROTATION_MS = 10000;
const STAR_COLOR = '#4F6AF5';
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
        <Star key={idx} size={size} className="fill-[#4F6AF5] text-[#4F6AF5]" strokeWidth={1.8} />
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
    { left: '0%', translateX: '0%', scale: 0.78, zIndex: 10, opacity: 0.35, width: '56%' },
    { left: '16%', translateX: '0%', scale: 0.88, zIndex: 20, opacity: 0.66, width: '62%' },
    { left: '50%', translateX: '-50%', scale: 1, zIndex: 30, opacity: 1, width: '74%' },
    { left: '84%', translateX: '-100%', scale: 0.88, zIndex: 20, opacity: 0.66, width: '62%' },
    { left: '100%', translateX: '-100%', scale: 0.78, zIndex: 10, opacity: 0.35, width: '56%' }
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
      className="relative min-h-[620px] overflow-hidden border-b border-brand-wood/10 bg-[#12131A] py-12 text-[#1F2330] sm:min-h-[720px] sm:py-20 md:min-h-[640px]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/42" />

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 md:px-12">
        <div className="block sm:hidden">
          <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_80px_rgba(0,0,0,0.35)]">
            {mobileTestimonials.map((entry, idx) => {
              const style = mobilePositionStyles[idx];
              const isCenter = entry.offset === 0;

              return (
                <motion.article
                  key={`${entry.item.client}-${entry.offset}`}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  onClick={() => setActiveIdx(getCircularIndex(activeIdx + entry.offset))}
                  className={`absolute top-6 rounded-[24px] bg-white p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                    isCenter ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  style={{
                    left: style.left,
                    transform: `translateX(${style.translateX}) scale(${style.scale})`,
                    width: style.width,
                    opacity: style.opacity,
                    zIndex: style.zIndex
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Stars size={13} />
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold text-[#232742]">
                      <BadgeCheck size={10} className="fill-[#4F6AF5] text-white" />
                      Testimonial
                    </span>
                  </div>
                  <p className="line-clamp-4 min-h-[74px] text-[11px] leading-relaxed text-[#202124]">
                    {entry.item.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <img
                      src={profileImage}
                      alt={entry.item.client}
                      className="h-8 w-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-[#1F2330]">{entry.item.client}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {TESTIMONIALS_DATA.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIdx === idx ? 'w-9 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
                  }`}
                  aria-label={`Show testimonial from ${item.client}`}
                />
              ))}
            </div>
            <div className="h-1 w-full max-w-md overflow-hidden rounded-full bg-white/25">
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
                  className={`absolute rounded-[16px] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.10)] ${frame}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Stars size={13} />
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold text-[#232742]">
                      <BadgeCheck size={10} className="fill-[#4F6AF5] text-white" />
                      Testimonial
                    </span>
                  </div>

                  <p className="line-clamp-4 min-h-[74px] text-[11px] leading-relaxed text-[#202124]">
                    {item.quote}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <img
                      src={profileImage}
                      alt={item.client}
                      className="h-7 w-7 rounded-full object-cover sm:h-9 sm:w-9"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-[#1F2330]">{item.client}</p>
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
                className="rounded-[16px] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.10)] sm:p-8 md:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <img
                    src={profileImage}
                    alt={current.client}
                    className="h-14 w-14 rounded-full object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
                    referrerPolicy="no-referrer"
                  />
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F5FF] px-2 py-1 text-[8px] font-bold text-[#20254A] sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
                    <BadgeCheck size={14} className="fill-[#4F6AF5] text-white" />
                    Testimonial
                  </span>
                </div>

                <div className="mt-5 flex justify-end sm:mt-8">
                  <Stars size={18} />
                </div>

                <blockquote className="mt-5 text-[1.05rem] font-bold leading-tight text-[#161820] sm:mt-8 sm:text-[1.35rem] md:text-[1.5rem]">
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
                      <cite className="not-italic text-sm font-bold text-[#161820]">{current.client}</cite>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#20254A]">
                    <BadgeCheck size={18} className="fill-[#4F6AF5] text-white" />
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
                    activeIdx === idx ? 'w-9 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
                  }`}
                  aria-label={`Show testimonial from ${item.client}`}
                />
              ))}
            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/25">
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
