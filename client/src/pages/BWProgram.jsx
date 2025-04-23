import React from 'react';
import { 
  HeartHandshake, 
  MessageSquare, 
  School, 
  Globe,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "../components/ui/button";

// Import data from our extracted site data
import { bwSelfData } from '../data/siteData';

const BWProgram = () => {
  // Data from our extracted site content
  const { hero, about, features, testimonials, cta } = bwSelfData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full py-20 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container px-4 mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
                <HeartHandshake className="w-4 h-4 text-primary" />
                <span>Empowerment Program</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl text-foreground">
                {hero?.title || "BW-SELF Advocacy Program"} <span className="text-primary">Leadership & Empowerment</span>
              </h1>
              
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {hero?.subtitle || "Empowering Black Women through Self-Advocacy, Education, and Leadership"}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="lg">
                  {hero?.callToAction || "Learn More"}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden border rounded-lg shadow-xl aspect-video">
                <img 
                  src="/images/bw-self-program.jpg" 
                  alt="BW-SELF Program" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6">
                <div className="p-6 rounded-lg shadow-lg ribbon-card">
                  <div className="flex items-center space-x-4">
                    <div className="hiv-ribbon-container">
                      <div className="hiv-ribbon"></div>
                    </div>
                    <div>
                      <p className="font-medium text-primary">BW-SELF</p>
                      <p className="text-sm text-muted-foreground">Advocacy Program</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About the Program */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{about?.title || "About the Program"}</h2>
            <p className="text-lg text-muted-foreground">
              {about?.description || "The BW-SELF (Black Women - Self Empowerment Leadership Framework) Advocacy program empowers Black Women to navigate healthcare systems, pursue education, and access community resources."}
            </p>
          </div>
        </div>
      </section>
      
      {/* Program Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Program Features</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive approach addresses the unique needs of Black women navigating healthcare and social systems.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features?.map((feature, index) => {
              // Map feature titles to icons
              const iconMap = {
                "Self-Advocacy Skills": <MessageSquare className="w-10 h-10 text-primary" />,
                "Healthcare Navigation": <HeartHandshake className="w-10 h-10 text-primary" />,
                "Education Support": <School className="w-10 h-10 text-primary" />,
                "Community Resources": <Globe className="w-10 h-10 text-primary" />
              };
              
              return (
                <div className="p-6 bg-white transition-all border rounded-lg hover:shadow-md" key={index}>
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                    {iconMap[feature.title] || <HeartHandshake className="w-10 h-10 text-primary" />}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-center">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            }) || (
              <>
                <div className="p-6 bg-white transition-all border rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                    <MessageSquare className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-center">Self-Advocacy Skills</h3>
                  <p className="text-center text-muted-foreground">
                    Developing skills to effectively communicate needs and concerns in healthcare settings.
                  </p>
                </div>
                
                <div className="p-6 bg-white transition-all border rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                    <HeartHandshake className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-center">Healthcare Navigation</h3>
                  <p className="text-center text-muted-foreground">
                    Learning to navigate complex healthcare systems and access appropriate care.
                  </p>
                </div>
                
                <div className="p-6 bg-white transition-all border rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                    <School className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-center">Education Support</h3>
                  <p className="text-center text-muted-foreground">
                    Resources and mentorship for educational advancement and career development.
                  </p>
                </div>
                
                <div className="p-6 bg-white transition-all border rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10">
                    <Globe className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-center">Community Resources</h3>
                  <p className="text-center text-muted-foreground">
                    Connecting with community resources and support networks.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Program Benefits */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Program Benefits</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our program offers numerous benefits designed to empower and support Black women in their healthcare journey.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold">Increased Confidence</h4>
                    <p className="text-muted-foreground">
                      Develop confidence in advocating for yourself in healthcare settings.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold">Better Health Outcomes</h4>
                    <p className="text-muted-foreground">
                      Achieve better health outcomes through effective communication with healthcare providers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold">Supportive Community</h4>
                    <p className="text-muted-foreground">
                      Connect with a supportive community of women with similar experiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold">Resource Access</h4>
                    <p className="text-muted-foreground">
                      Gain access to valuable resources for health, education, and well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="/images/program-benefits.jpg" 
                  alt="Program Benefits" 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="absolute -top-5 -left-5 md:-top-8 md:-left-8">
                <div className="p-6 bg-white rounded-lg shadow-lg ribbon-card">
                  <div className="flex items-center space-x-3">
                    <div className="hiv-ribbon-container">
                      <div className="hiv-ribbon"></div>
                    </div>
                    <p className="text-xl font-bold text-primary">Empowerment</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Knowledge is power
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              Hear from participants who have experienced the BW-SELF Advocacy Program.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials?.map((testimonial, index) => (
              <div className="p-8 bg-white border rounded-lg shadow-lg" key={index}>
                <div className="mb-6 text-5xl text-primary">"</div>
                <p className="mb-6 italic text-lg text-muted-foreground">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">Program Participant</p>
                  </div>
                </div>
              </div>
            )) || (
              <div className="p-8 bg-white border rounded-lg shadow-lg">
                <div className="mb-6 text-5xl text-primary">"</div>
                <p className="mb-6 italic text-lg text-muted-foreground">
                  This program gave me the confidence to speak up for myself in healthcare settings.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                  <div>
                    <p className="font-medium">Program Participant</p>
                    <p className="text-sm text-muted-foreground">BW-SELF Alumni</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {cta?.title || "Join the Program"}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
            {cta?.description || "If you're interested in joining the BW-SELF Advocacy Program, please contact us for more information."}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              variant="default" 
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Request Information
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BWProgram; 