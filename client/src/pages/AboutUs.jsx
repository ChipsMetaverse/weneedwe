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

// Import data from our extracted site data
import {
  aboutPageData,
  missionStatement,
  communityImpact
} from '../data/siteData';

const AboutUs = () => {
  // Data from our extracted site content
  const { hero, impact, cta } = aboutPageData;

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
                <span>HIV Awareness & Support</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl text-foreground">
                {hero?.title || "Empowering Communities Through"} <span className="text-primary">HIV Education</span>
              </h1>
              
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {hero?.subtitle || missionStatement}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg">
                  {hero?.callToAction || "Join Our Mission"}
                </Button>
                <Button 
                  variant="default" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => window.open('/donate', '_self')}
                >
                  Support Our Cause
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden border rounded-lg shadow-xl aspect-video">
                <img 
                  src="/images/community-support.jpg" 
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
                      <p className="font-medium text-primary">HIV Awareness</p>
                      <p className="text-sm text-muted-foreground">Support & Education</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">{impact?.title || "Our Impact"}</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                {impact?.description || "Since 2018, we've been making a difference in communities across the country. Our programs have reached thousands of individuals, providing educational resources, testing services, and emotional support."}
              </p>
              
              <div className="space-y-4">
                {communityImpact.map((item, index) => (
                  <div className="flex items-start gap-4" key={index}>
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-primary/20">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="/images/impact.jpg" 
                  alt="Our Impact" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="absolute -bottom-5 -left-5 md:-bottom-8 md:-left-8">
                <div className="p-6 bg-white rounded-lg shadow-lg ribbon-card">
                  <div className="flex items-center space-x-3">
                    <div className="hiv-ribbon-container">
                      <div className="hiv-ribbon"></div>
                    </div>
                    <p className="text-xl font-bold text-primary">Join Our Cause</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Together, we can make a difference
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {cta?.title || "Be Part of Our Mission"}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
            {cta?.description || "Whether you want to volunteer, donate, or simply learn more, there are many ways to support our mission of HIV awareness and education."}
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              variant="default" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => window.open('/donate', '_self')}
            >
              Donate Now
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open('/volunteer', '_self')}
            >
              Volunteer
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs; 