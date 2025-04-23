import React from 'react';
import { 
  Heart, 
  HeartHandshake, 
  Calendar,
  Users, 
  Sparkles,
  Globe,
  HandHeart
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "../components/ui/button";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container px-4 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
                <div className="hiv-ribbon-container">
                  <div className="hiv-ribbon"></div>
                </div>
                <span>BLACK WOMEN SELF EMPOWERING LIFESTYLE FACTORS</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl text-foreground">
                OUR POWER, OUR VOICE, <span className="text-primary">OUR CONTROL!</span>
              </h1>
              
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                BW-SELF is a workgroup of Black and African women health ambassadors. As an agency of change on how women access healthcare free of biases and health disparities that Black women face that can lead to HIV positive cisgender heterosexual women to not achieve viral suppression and prevent HIV negative cisgender heterosexual women to remain negative.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg">
                  Learn More
                </Button>
                <Button 
                  variant="accent" 
                  className="text-white"
                  onClick={() => window.open('/donate', '_self')}
                >
                  Support Our Cause
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden border rounded-lg shadow-xl" style={{ aspectRatio: '14/12' }}>
                <img 
                  src="https://weneedwe.org/x/cdn/?https://images.unsplash.com/photo-1521510186458-bbbda7aef46b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" 
                  alt="Community Support" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
                <div className="p-6 rounded-lg shadow-lg ribbon-card">
                  <div className="flex items-center space-x-4">
                    <div className="hiv-ribbon-container">
                      <div className="hiv-ribbon"></div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">BW-SELF</p>
                      <p className="text-sm text-muted-foreground">Support & Education</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How We Help Section */}
      <section className="py-16 bg-pink-50 relative overflow-hidden">
        {/* Parallax Background Video */}
        <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" style={{ transform: 'translateZ(-1px) scale(1.5)' }}>
          <div className="w-full h-full">
            <iframe 
              src="https://www.youtube.com/embed/SF9Z8xKwKuI?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=SF9Z8xKwKuI"
              title="Background Video"
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <div className="aspect-video bg-black">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/SF9Z8xKwKuI?si=CteVInDKyVi0E5jJ&controls=0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -left-5 md:-bottom-8 md:-left-8">
                <div className="p-6 bg-white rounded-lg shadow-lg ribbon-card">
                  <div className="flex items-center space-x-3">
                    <div className="hiv-ribbon-container">
                      <div className="hiv-ribbon"></div>
                    </div>
                    <p className="text-xl font-bold text-red-500">DONATE NOW</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Support our Prevention for Positives HIV Support
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">How Do We Help Black Women?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                BW-SELF - Black Women Supporting Empowering Lifestyle Factors presents Our Power, Our Voice, Our Control as a Toolkit designed to support Black women with health and wellness discussion featuring Black women medical doctors/providers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-red-100">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Health Education</h4>
                    <p className="text-muted-foreground">
                      Topics include HIV, PrEP awareness, Hepatitis, mental health resources, and creating a self-care Toolkit.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-red-100">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Our Vision</h4>
                    <p className="text-muted-foreground">
                      Embracing women health universally!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-red-100">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Our Purpose</h4>
                    <p className="text-muted-foreground">
                      To educate Black women on the importance of their health, community, and lifestyle to share a dream of living longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet The Team Section */}
      <section className="py-16 bg-red-500">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Meet The Team
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
            Welcome to our Risk Reduction Staff
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-white">
              <p className="mb-2 text-lg">Juliet Jones, Director of Risk Reduction</p>
              <p className="mb-2 text-lg">Mary Turpin, Community Developer, Health Educator - HIV & Hep Tester</p>
              <p className="mb-2 text-lg">Lade Ademosu, Community Outreach, Health Educator - HIV & Hep Tester</p>
            </div>
            
            {/* Team Images Row 1 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-lg overflow-hidden bg-red-400">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/18ff76ae4bff42528bf254c1707437b1" 
                    alt="Juliet Jones, Director of Risk Reduction" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-white text-sm font-medium">
                  Juliet Jones
                </div>
              </div>
              <div className="rounded-lg overflow-hidden bg-red-400">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/44da899ea75445b889243f030affc001" 
                    alt="Mary Turpin, Community Developer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-white text-sm font-medium">
                  Mary Turpin
                </div>
              </div>
              <div className="rounded-lg overflow-hidden bg-red-400">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/4bfbb6425e074777a5bfee4b8c35ac81" 
                    alt="Lade Ademosu, Community Outreach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-white text-sm font-medium">
                  Lade Ademosu
                </div>
              </div>
            </div>
            
            <div className="mb-6 text-white">
              <p className="mb-6 text-lg leading-relaxed">
                BW-SELF Health Ambassadors are as followed: (top row, L-R) Deborah Jones, Judy Brown, Detra Winston, Sinat Salau, (bottom row, L-R) Blanche Wilson, LaTascha Good, Theresa Hicks
              </p>
              
              <div className="my-8">
                <img 
                  src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/0d7efdadbfb8432a96485fc4500f1661"
                  alt="BW-SELF Health Ambassadors"
                  className="max-w-full mx-auto rounded-lg"
                />
              </div>
              
              <p className="mb-6 text-lg leading-relaxed">
                UFC would like to thank the workgroup women on the planning, developing, and implementation of Our Power, Our Voice, Our Control structural intervention as a strategy to help Black women access healthcare.
              </p>
            </div>
            
            {/* Team Images Row 2 */}
            <div className="border-2 border-white/20 rounded-lg overflow-hidden mb-4">
              <img 
                src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/uORzTRGP/d06dc53ea0664de499cfa0a8e35dc5d8" 
                alt="BW-SELF Workgroup" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="text-center mt-4">
              <div className="flex justify-center gap-4">
                <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
                  <span>←</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;