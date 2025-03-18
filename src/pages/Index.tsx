
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        <section className="py-16 bg-muted/50" id="events">
          <div className="container px-4 md:px-6">
            <EventsList />
          </div>
        </section>
        
        <section className="py-16" id="media">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Gallery</h2>
            <MediaGallery />
          </div>
        </section>
        
        <section className="py-16 bg-muted/50" id="blog">
          <div className="container px-4 md:px-6">
            <BlogPosts />
          </div>
        </section>
        
        <Gallery />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
