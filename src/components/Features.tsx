import React from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { 
  Zap, 
  Shield, 
  Sparkles, 
  Layers
} from 'lucide-react';

const features = [
  {
    title: 'Beautiful Design',
    description: 'Impeccable attention to detail with a clean, minimalist aesthetic that stands the test of time.',
    icon: Sparkles,
    delay: 0
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized performance delivers a snappy and responsive experience across all devices.',
    icon: Zap,
    delay: 0.1
  },
  {
    title: 'Rock Solid Security',
    description: 'Built with security as a foundation, ensuring your data is protected at all times.',
    icon: Shield,
    delay: 0.2
  },
  {
    title: 'Thoughtful Details',
    description: 'Every interaction and element carefully crafted to create a seamless user experience.',
    icon: Layers,
    delay: 0.3
  }
];

const FeatureCard = ({ title, description, icon: Icon, delay }: {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "bg-white rounded-2xl p-8 shadow-sm border border-border transition-all",
        "hover:shadow-md hover:border-primary/30 hover:translate-y-[-4px]",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
      style={{ animationDelay: `${0.2 + delay}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section id="about" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          )}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-white text-primary">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Thoughtfully Crafted Details
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            We combine innovative technology with timeless design principles to create
            experiences that are both beautiful and functional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
