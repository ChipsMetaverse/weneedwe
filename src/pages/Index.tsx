import React, { useEffect } from 'react';
import { 
  Heart, 
  HeartHandshake,
  Calendar,
  Users, 
  Sparkles,
  Globe,
  HandHeart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import EventsList from '@/components/EventsList';
import BlogPosts from '@/components/BlogPosts';

const Index = () => {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const id = href.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
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
                  <button 
                    className="px-6 py-3 text-sm font-medium text-white transition-colors rounded-md bg-primary hover:bg-primary/90"
                  >
                    Learn More
                  </button>
                  <button 
                    className="px-6 py-3 text-sm font-medium transition-colors border rounded-md text-primary border-primary hover:bg-primary/10"
                    onClick={() => window.open('/donate', '_self')}
                  >
                    Support Our Cause
                  </button>
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

        {/* HIV Specialist Call to Action */}
        <section className="py-4 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4 md:gap-8">
              <h3 className="text-xl font-bold text-red-800">Need Help Finding a Primary HIV Specialist?</h3>
              <p className="text-red-700">If you are newly diagnosed and need a referral for HIV primary care, call us at <span className="font-bold text-lg">773-881-1711</span> for confidential assistance.</p>
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
        
        {/* Events section with improved spacing and consistency */}
        <section className="py-20 bg-pattern" id="events">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Upcoming Events
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Join Our Community Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover opportunities to connect, learn, and make a difference in your community through our diverse range of events.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl shadow-lg">
              <EventsList />
              
              {/* Consumer Advisory Board - Weekly Support Group */}
              <div className="mt-10 pt-10 border-t border-gray-200">
                <h3 className="text-2xl font-semibold mb-6 text-primary">Consumer Advisory Board - Weekly Support Group</h3>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <p className="mb-4">
                    Groups are held every Friday from 10:00am– 2:00pm. Lunch is provided. Topics are determined by participants and from issues common to HIV positive clients such as depression, disclosure, and stigma. Guest speakers are invited to discuss current issues impacting HIV persons such as Health Care Reform. Our support group allows participants to speak and learn with others who are HIV positive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog section with consistent styling */}
        <section className="py-20 bg-pattern" id="blog">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Latest Articles
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Blog</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay informed with our latest articles, news, and educational resources.
              </p>
            </div>
            <BlogPosts />
          </div>
        </section>
        
        {/* Contact section with consistent styling */}
        <section className="py-20 bg-background" id="contact">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Contact Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have questions or want to get involved? We'd love to hear from you.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
