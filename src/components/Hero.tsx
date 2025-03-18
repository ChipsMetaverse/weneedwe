
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/use-mobile';
import DonationForm from './DonationForm';

const Hero = () => {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="hero"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Supporting Our Community Together
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join us in our mission to provide essential services and support to those in need. Together, we can make a difference.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="w-full sm:w-auto">
                Get Involved
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <DonationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
