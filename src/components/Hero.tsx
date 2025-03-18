
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/utils/animations';
import DonationForm from './DonationForm';
import PaymentProcessor from './PaymentProcessor';
import { DonationInput } from '@/hooks/useDonations';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false);
  const [donationDetails, setDonationDetails] = useState<DonationInput | null>(null);

  const handleDonationSubmit = (data: DonationInput) => {
    setDonationDetails(data);
    setShowPaymentProcessor(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentProcessor(false);
    toast.success("Thank you for your donation!");
  };

  const handlePaymentCancel = () => {
    setShowPaymentProcessor(false);
  };

  return (
    <section 
      ref={ref}
      className={`relative py-20 md:py-28 overflow-hidden bg-pattern transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="hero"
    >
      {/* Improved background elements with better positioning */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-60 translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col gap-6">
            <div className="space-y-5">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Community-driven support platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent reveal-text">
                Supporting Our<br className="hidden md:block" /> Community Together
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[540px]">
                Join us in our mission to provide essential services and support to those in need. 
                <span className="font-semibold text-foreground"> Together, we can make a difference.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="button-primary w-full sm:w-auto text-base group">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/50 hover:bg-primary/5">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center overflow-hidden shadow-sm">
                    <span className="text-xs font-semibold text-primary">{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">250+ people</span> joined our community this month
              </p>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="gradient-card tilt-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="tilt-content p-1">
                {showPaymentProcessor && donationDetails ? (
                  <PaymentProcessor 
                    donationDetails={donationDetails}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                  />
                ) : (
                  <DonationForm onSubmit={handleDonationSubmit} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
