import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Premium section wrapper with scroll animations
 */
export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * Premium section heading with animations
 */
export function SectionHeading({ label, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : '';
  
  return (
    <div className={`mb-16 md:mb-24 scroll-reveal-up ${alignClass}`}>
      {label && (
        <div className="inline-flex items-center gap-3 mb-4">
          {align === 'center' && <span className="w-3 h-px bg-brand-cranberry"></span>}
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-brand-cranberry">
            {label}
          </span>
          {align === 'center' && <span className="w-3 h-px bg-brand-cranberry"></span>}
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-brand-dark mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-brand-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface PremiumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Premium animated button with hover effects
 */
export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: PremiumButtonProps) {
  const baseClasses = 'relative overflow-hidden btn-animated transition-all duration-300 font-semibold uppercase tracking-[0.15em] text-xs rounded-lg';

  const variants = {
    primary: 'bg-brand-cranberry text-brand-ivory hover:bg-brand-cranberry/90 shadow-premium-md hover:shadow-premium-lg',
    secondary: 'bg-brand-wood text-brand-ivory hover:bg-brand-wood/90 shadow-premium-md hover:shadow-premium-lg',
    outline: 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-ivory transition-all',
  };

  const sizes = {
    sm: 'px-5 py-2.5',
    md: 'px-7 py-3.5',
    lg: 'px-10 py-4',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'
      }`}
    >
      {children}
    </button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Premium card with glassmorphism and hover effects
 */
export function PremiumCard({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`${
        hover ? 'card-hover' : ''
      } bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Premium image card with zoom and overlay effects
 */
export function PremiumImageCard({ src, alt, title, description, className = '' }: ImageCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl image-hover-zoom ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {(title || description) && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
          {title && <h3 className="text-lg font-semibold text-brand-ivory mb-2">{title}</h3>}
          {description && <p className="text-sm text-brand-ivory/80">{description}</p>}
        </div>
      )}
    </div>
  );
}
