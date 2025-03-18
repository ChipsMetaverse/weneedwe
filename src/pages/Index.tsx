import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import EventsList from '@/components/EventsList';
import BlogPosts from '@/components/BlogPosts';
import MediaGallery from '@/components/MediaGallery';

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
        <Hero />
        <Features />
        
        {/* Events section with improved spacing and consistency */}
        <section className="py-20 bg-muted/30" id="events">
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
            <EventsList />
          </div>
        </section>
        
        {/* Media gallery with consistent spacing and styling */}
        <section className="py-20 bg-background" id="media">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Visual Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore moments that showcase our community's strength, resilience, and progress through visual stories.
              </p>
            </div>
            <MediaGallery />
          </div>
        </section>
        
        {/* Blog section with consistent styling */}
        <section className="py-20 bg-muted/30" id="blog">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Latest News
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">From Our Blog</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest news, insights, and stories from our community initiatives.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <BlogPosts />
            </div>
          </div>
        </section>
        
        {/* Keep main visual gallery */}
        <Gallery />
        
        {/* Contact section with improved spacing */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
