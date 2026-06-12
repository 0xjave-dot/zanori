# UI Modernization Guide - Using New Components & Animations

## Quick Start Guide

### 1. Using Scroll Animations

Add scroll reveal animations to any element by adding one of these classes:

```jsx
// Reveal from bottom
<div className="scroll-reveal-up">Content here</div>

// Reveal from left
<div className="scroll-reveal-left">Content here</div>

// Reveal from right
<div className="scroll-reveal-right">Content here</div>

// Scale and fade
<div className="scroll-scale-reveal">Content here</div>
```

### 2. Using Premium Components

```jsx
import { SectionWrapper, SectionHeading, PremiumButton, PremiumCard, PremiumImageCard } from './components/PremiumComponents';

export default function MySection() {
  return (
    <SectionWrapper id="my-section">
      <SectionHeading
        label="Featured"
        title="Amazing Section"
        subtitle="This is a beautiful subtitle"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PremiumCard>
          <h3 className="font-serif text-2xl mb-4">Card Title</h3>
          <p>Card content goes here</p>
        </PremiumCard>
      </div>

      <PremiumButton variant="primary" size="lg" onClick={() => {}}>
        Click Me
      </PremiumButton>
    </SectionWrapper>
  );
}
```

### 3. Staggered Grid Animations

```jsx
<div className="grid grid-cols-3 gap-8">
  {items.map((item, idx) => (
    <div key={idx} className="stagger-item" style={{ transitionDelay: `${idx * 100}ms` }}>
      {/* Content */}
    </div>
  ))}
</div>
```

### 4. Modern Testimonial Components

```jsx
import { ModernTestimonialCard, TestimonialGrid, HeroTestimonial } from './components/ModernTestimonial';

// Single testimonial card
<ModernTestimonialCard
  quote="This is an amazing quote about the service."
  author="John Doe"
  role="Creative Director"
  rating={5}
  image="https://..."
/>

// Grid of testimonials
<TestimonialGrid
  testimonials={[
    { quote: "...", author: "Alice", role: "CEO" },
    { quote: "...", author: "Bob", role: "Designer" }
  ]}
  columns={3}
/>

// Hero testimonial
<HeroTestimonial
  quote="A transformative experience that changed everything."
  author="Jane Smith"
  role="Founder"
  image="https://..."
/>
```

### 5. Using Animation Hooks

```jsx
import { useScrollReveal, useStaggeredScroll, useParallax } from './hooks/useScrollReveal';

function MyComponent() {
  // Scroll reveal animation
  const ref = useScrollReveal();
  
  return <div ref={ref} className="scroll-reveal-up">Animated content</div>;
}

function ParallaxSection() {
  // Parallax effect
  const parallaxRef = useParallax(0.5);
  
  return <div ref={parallaxRef} style={{ willChange: 'transform' }}>
    Content moves slower than scroll
  </div>;
}
```

### 6. CSS Classes Reference

#### Animation Utilities
- `.animate-fade-in` - Fade in animation
- `.animate-slide-up` - Slide up animation
- `.animate-slide-left` - Slide left animation
- `.animate-scale-up` - Scale up animation
- `.animate-float-slow` - Slow floating effect
- `.animate-float-fast` - Fast floating effect
- `.animate-pulse` - Pulsing loading animation

#### Hover Effects
- `.card-hover` - Lift and shadow on hover
- `.image-hover-zoom` - Image zoom on parent hover
- `.btn-animated` - Button animation with shine effect

#### Shadow System
- `.shadow-premium-sm` - Small premium shadow
- `.shadow-premium-md` - Medium premium shadow
- `.shadow-premium-lg` - Large premium shadow
- `.shadow-premium-xl` - Extra large premium shadow

#### Glassmorphism
- `.glassmorphism` - Blur + transparency effect
- `.backdrop-blur-premium` - Enhanced backdrop blur

#### Typography
- `.text-gradient` - Text with gradient color

#### Effects
- `.film-grain` - Subtle film grain texture
- `.shimmer-loading` - Loading shimmer effect
- `.line-accent` - Line accent underline

## Implementation Examples

### Example 1: Modern Service Card

```jsx
<PremiumCard className="group">
  <div className="mb-6 text-brand-cranberry/50 group-hover:text-brand-cranberry transition-colors">
    <Icon size={40} />
  </div>
  <h3 className="font-serif text-2xl mb-4">Service Name</h3>
  <p className="text-brand-muted mb-6">Service description</p>
  <PremiumButton variant="outline">Learn More</PremiumButton>
</PremiumCard>
```

### Example 2: Animated Gallery Grid

```jsx
<div className="grid grid-cols-3 gap-8">
  {images.map((img, idx) => (
    <div 
      key={idx} 
      className="scroll-scale-reveal stagger-item image-hover-zoom"
      style={{ transitionDelay: `${idx * 100}ms` }}
    >
      <img src={img} alt="" className="w-full h-64 object-cover rounded-lg" />
    </div>
  ))}
</div>
```

### Example 3: Hero Section with Animations

```jsx
<section className="relative min-h-screen overflow-hidden">
  <div className="absolute inset-0 parallax-bg" ref={parallaxRef}>
    <img src="background" alt="" className="w-full h-full object-cover" />
  </div>

  <div className="relative z-10 flex flex-col justify-center h-screen">
    <h1 className="font-serif text-7xl animate-fade-in">
      Stunning Headline
    </h1>
    <p className="text-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
      Captivating subtitle
    </p>
  </div>
</section>
```

### Example 4: Statistic Counter Section

```jsx
<SectionWrapper className="scroll-reveal-up">
  <div className="grid grid-cols-3 gap-8">
    {stats.map((stat, idx) => (
      <div key={idx} className="stagger-item text-center" style={{ transitionDelay: `${idx * 100}ms` }}>
        <div className="text-5xl font-serif text-brand-cranberry mb-2" ref={el => animateCounter(el, stat.value)}>
          0
        </div>
        <p className="text-brand-muted uppercase tracking-wider">{stat.label}</p>
      </div>
    ))}
  </div>
</SectionWrapper>
```

## Animation Timings

Recommended timings for consistency:
- **Entrance animations**: 0.6s - 0.8s
- **Hover effects**: 0.3s - 0.4s
- **Transitions**: 0.3s cubic-bezier(0.16, 1, 0.3, 1)
- **Scroll reveals**: 0.8s with easing
- **Stagger delay**: 100ms between items

## Performance Tips

1. Use `will-change` on animated elements
2. Prefer `transform` and `opacity` for animations (GPU-friendly)
3. Use `transition-delay` for staggered effects
4. Enable `prefers-reduced-motion` respect in CSS
5. Lazy load images and use proper sizing
6. Test on mobile devices (lower-end processors)

## Browser Support

All animations use standard CSS and JavaScript APIs:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari 12+, Android Chrome)

## Accessibility

- All animations respect `prefers-reduced-motion` setting
- Animations use `will-change` for performance
- Focus states are enhanced with outlines
- Color contrast maintained throughout
- Semantic HTML structure preserved

## Further Customization

Modify animation speeds in `/src/index.css`:
- Change `0.8s` to `1.2s` for slower animations
- Change easing from `cubic-bezier(0.16, 1, 0.3, 1)` to your preference
- Adjust shadow values for different elevation levels
- Modify blur amounts in glassmorphism effects
