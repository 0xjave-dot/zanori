import { useEffect } from 'react';

/**
 * Initialize scroll animations globally for all elements with scroll animation classes
 */
export function initializeScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Add in-view class when element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale-reveal'
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}

/**
 * Add scroll animations to elements programmatically
 */
export function addScrollAnimation(
  element: HTMLElement | null,
  animationType: 'up' | 'left' | 'right' | 'scale' = 'up'
) {
  if (!element) return;

  const classMap = {
    up: 'scroll-reveal-up',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    scale: 'scroll-scale-reveal'
  };

  element.classList.add(classMap[animationType]);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  observer.observe(element);
}

/**
 * Add staggered animations to child elements
 */
export function addStaggeredAnimations(
  container: HTMLElement | null,
  selector: string = '.stagger-item'
) {
  if (!container) return;

  const items = container.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((item, index) => {
          const delay = index * 100;
          (item as HTMLElement).style.transitionDelay = `${delay}ms`;
          item.classList.add('in-view');
        });
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  observer.observe(container);
}

/**
 * Parallax scroll effect
 */
export function createParallaxEffect(
  element: HTMLElement | null,
  speed: number = 0.5
) {
  if (!element) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const elementOffsetTop = element.getBoundingClientRect().top + scrollY;
    const distance = scrollY - elementOffsetTop;

    if (distance > -window.innerHeight && distance < window.innerHeight * 2) {
      element.style.transform = `translateY(${distance * speed}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Counter animation for numbers
 */
export function animateCounter(
  element: HTMLElement | null,
  endValue: number,
  duration: number = 2000
) {
  if (!element) return;

  let currentValue = 0;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    currentValue = Math.floor(endValue * progress);
    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
