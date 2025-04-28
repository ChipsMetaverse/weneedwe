import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
) {
  const { threshold = 0, rootMargin = '0px', root = null } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<Element | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    const currentRef = observerRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, root]);

  return { observerRef, isIntersecting };
}
