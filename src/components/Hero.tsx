
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useImageLoading } from '@/utils/animations';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageLoading = useImageLoading();
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      const heroTop = heroElement.getBoundingClientRect().top + window.scrollY;
      const offset = (scrollY - heroTop) * 0.3;
      
      if (scrollY > heroTop) {
        heroElement.style.transform = `translateY(${offset}px)`;
      } else {
        heroElement.style.transform = 'translateY(0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-20 overflow-hidden"
    >
      {/* Background elements - abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-primary/20 blur-[100px] animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-secondary text-primary animate-fade-in-down">
            A New Beginning
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Beautiful Design with <span className="text-primary">Purpose</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in opacity-0 text-balance" style={{ animationDelay: '0.4s' }}>
            Discover a new way to create and experience digital products with our minimalist, function-first approach that puts users at the center.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <button className="button-primary w-full sm:w-auto flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="button-secondary w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature image */}
        <div 
          className={cn(
            "mt-16 relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-700",
            "animate-scale-in opacity-0"
          )} 
          style={{ animationDelay: '0.8s' }}
        >
          {/* Loading placeholder */}
          <div className="absolute inset-0 bg-secondary animate-pulse"></div>
          
          {/* Actual image */}
          <img
            src="https://source.unsplash.com/random/1200x800/?minimal,design,white"
            alt="Minimalist design showcase"
            className={cn(
              "w-full h-auto object-cover transition-opacity duration-500",
              imageLoading.isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={imageLoading.handleLoad}
          />
          
          {/* Glass overlay with text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 glass text-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">Design Reimagined</h3>
                <p className="text-sm text-muted-foreground">Form follows function in perfect harmony</p>
              </div>
              <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                Explore <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-foreground/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
