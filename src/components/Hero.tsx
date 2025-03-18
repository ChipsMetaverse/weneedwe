
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Heart, DollarSign, Handshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useImageLoading } from '@/utils/animations';

// Progress bar component for donation goals
const ProgressBar = ({ goal, raised, label }: { goal: number; raised: number; label: string }) => {
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="font-bold text-primary">${raised.toLocaleString()} <span className="text-muted-foreground font-normal">of ${goal.toLocaleString()}</span></span>
      </div>
      <div className="h-4 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="mt-1 text-xs text-right text-muted-foreground">
        {percentage}% towards our goal
      </div>
    </div>
  );
};

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
      {/* Background elements - warm community colors */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-orange-500/20 blur-[100px] animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-red-500/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-64 h-64 rounded-full bg-amber-500/20 blur-[90px] animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-secondary text-primary animate-fade-in-down">
            Community Support Network
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Together We Can <span className="text-primary">Make a Difference</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in opacity-0 text-balance" style={{ animationDelay: '0.4s' }}>
            Empowering underserved communities through comprehensive support services, education programs, and community development initiatives.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="button-primary w-full sm:w-auto flex items-center justify-center gap-2">
              Get Involved
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#about" className="button-secondary w-full sm:w-auto">
              Our Services
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          {/* Donate Card */}
          <div className="bg-white rounded-2xl shadow-md border border-border p-6 transition-all hover:shadow-lg hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Donate</h3>
            <p className="text-muted-foreground mb-5">
              Your contribution helps us provide essential services to those in need.
            </p>
            <ProgressBar goal={50000} raised={32750} label="Summer Campaign" />
            <button className="mt-6 w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4" />
              Donate Now
            </button>
          </div>
          
          {/* Feature image */}
          <div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden shadow-md border border-border h-full min-h-[300px]">
            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-secondary animate-pulse"></div>
            
            {/* Actual image */}
            <img
              src="https://source.unsplash.com/random/1200x800/?community,diverse,volunteer"
              alt="Community support volunteers"
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500",
                imageLoading.isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={imageLoading.handleLoad}
            />
            
            {/* Glass overlay with text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm">
                  Upcoming Event
                </span>
                <span className="text-sm">June 15, 2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">Community Resource Fair</h3>
              <p className="text-white/80 mb-4">Join us for a day of connection and support at our annual resource fair.</p>
              <a href="#" className="inline-flex items-center gap-1 text-white font-medium text-sm hover:underline">
                Learn More <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Partner section */}
        <div className="mt-16 w-full max-w-5xl animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Handshake className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Trusted by our partners</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {/* These would be actual partner logos in production */}
              {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'].map((partner, index) => (
                <div key={index} className="h-8 flex items-center">
                  <span className="text-muted-foreground font-medium">{partner}</span>
                </div>
              ))}
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
