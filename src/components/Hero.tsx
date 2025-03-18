import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/utils/animations';
import DonationForm from './DonationForm';
import PaymentProcessor from './PaymentProcessor';
import { DonationInput } from '@/hooks/useDonations';
import { toast } from 'sonner';

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
      className={`relative py-24 md:py-32 overflow-hidden bg-pattern transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="hero"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Community-driven support platform
              </div>
              
              <h1 className="reveal-text">
                Supporting Our Community Together
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                Join us in our mission to provide essential services and support to those in need. 
                <span className="font-semibold text-foreground"> Together, we can make a difference.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="button-primary w-full sm:w-auto text-base">
                Get Involved
              </Button>
              <Button size="lg" className="button-outline w-full sm:w-auto text-base">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-semibold">{i}</span>
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
            <div className="gradient-card tilt-card">
              <div className="tilt-content">
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
