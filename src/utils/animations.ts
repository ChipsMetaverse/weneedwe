
import { useEffect, useState, useRef } from 'react';

// Intersection Observer hook for scroll-based animations
export const useIntersectionObserver = (
  options = { threshold: 0.1, triggerOnce: true }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && (!options.triggerOnce || !wasTriggered)) {
        setIsVisible(true);
        setWasTriggered(true);
      } else if (!entry.isIntersecting && !options.triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce, wasTriggered]);

  return { ref, isVisible };
};

// Staggered animation for multiple children
export const useStaggeredAnimation = (
  count: number, 
  delay = 0.1, 
  baseDelay = 0.2
) => {
  return Array.from({ length: count }).map((_, i) => ({
    style: {
      animationDelay: `${baseDelay + i * delay}s`,
      opacity: 0
    }
  }));
};

// Parallax effect hook
export const useParallax = (speed = 0.1) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollOffset = windowHeight - elementTop;
      
      if (scrollOffset > 0 && elementTop < windowHeight) {
        setOffset(scrollOffset * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, style: { transform: `translateY(${offset}px)` } };
};

// Image loading with blur effect
export const useImageLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return { 
    isLoaded, 
    handleLoad, 
    className: isLoaded ? 'opacity-100' : 'opacity-0',
    style: { transition: 'opacity 0.5s ease-in-out' }
  };
};
