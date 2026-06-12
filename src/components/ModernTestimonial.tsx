import React, { ReactNode } from 'react';
import { Star, Quote } from 'lucide-react';

interface ModernTestimonialProps {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  image?: string;
  className?: string;
}

/**
 * Modern glassmorphic testimonial card with premium styling
 */
export function ModernTestimonialCard({
  quote,
  author,
  role = '',
  rating = 5,
  image,
  className = ''
}: ModernTestimonialProps) {
  return (
    <div className={`group relative scroll-reveal-up ${className}`}>
      {/* Backdrop blur card */}
      <div className="relative backdrop-blur-xl bg-white/[0.08] border border-white/20 rounded-2xl p-8 md:p-10 shadow-premium-lg overflow-hidden card-hover transition-all duration-300">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cranberry/5 via-transparent to-brand-wood/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Quote icon */}
          <div className="mb-6 text-brand-cranberry/20 group-hover:text-brand-cranberry/40 transition-colors">
            <Quote size={32} strokeWidth={1.5} />
          </div>

          {/* Quote text */}
          <p className="text-base md:text-lg text-brand-ivory/90 font-light leading-relaxed mb-8 italic">
            "{quote}"
          </p>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex gap-1 mb-6">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-brand-cranberry text-brand-cranberry" strokeWidth={1.5} />
              ))}
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            {image && (
              <img
                src={image}
                alt={author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-cranberry/20"
              />
            )}
            <div>
              <p className="font-semibold text-brand-ivory text-sm">{author}</p>
              {role && <p className="text-xs text-brand-ivory/60 uppercase tracking-wider">{role}</p>}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-cranberry/0 via-brand-cranberry/0 to-brand-cranberry/0 group-hover:from-brand-cranberry/10 group-hover:via-transparent group-hover:to-brand-cranberry/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}

/**
 * Testimonials grid with staggered animations
 */
interface TestimonialGridProps {
  testimonials: ModernTestimonialProps[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function TestimonialGrid({
  testimonials,
  columns = 3,
  className = ''
}: TestimonialGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-8 md:gap-10 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="stagger-item"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <ModernTestimonialCard {...testimonial} />
        </div>
      ))}
    </div>
  );
}

/**
 * Hero testimonial with large quote
 */
interface HeroTestimonialProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
}

export function HeroTestimonial({
  quote,
  author,
  role = '',
  image
}: HeroTestimonialProps) {
  return (
    <div className="relative py-20 md:py-32 px-6 md:px-12 scroll-reveal-up">
      <div className="max-w-3xl mx-auto">
        {/* Large quote mark */}
        <div className="text-8xl md:text-9xl text-brand-cranberry/20 font-serif leading-none mb-8">
          "
        </div>

        {/* Quote text */}
        <p className="text-2xl md:text-4xl font-serif font-light text-brand-dark leading-relaxed mb-8 italic">
          {quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-8 border-t border-brand-dark/20">
          {image && (
            <img
              src={image}
              alt={author}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-cranberry/30"
            />
          )}
          <div>
            <p className="font-semibold text-brand-dark">{author}</p>
            {role && <p className="text-sm text-brand-muted uppercase tracking-wider">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
