
import React from 'react';
import { Heart, Mail, Phone, MapPin, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Social media links with appropriate icons
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#facebook' },
    { name: 'Twitter', icon: Twitter, url: '#twitter' },
    { name: 'Instagram', icon: Instagram, url: '#instagram' },
    { name: 'LinkedIn', icon: Linkedin, url: '#linkedin' },
    { name: 'YouTube', icon: Youtube, url: '#youtube' },
  ];
  
  // Quick links
  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'Services', url: '#about' },
    { name: 'Gallery', url: '#gallery' },
    { name: 'Donate', url: '#donate' },
    { name: 'Contact', url: '#contact' },
  ];
  
  // Services links
  const serviceLinks = [
    { name: 'Community Support', url: '#community-support' },
    { name: 'Education Programs', url: '#education-programs' },
    { name: 'Housing Assistance', url: '#housing-assistance' },
    { name: 'Healthcare Access', url: '#healthcare-access' },
    { name: 'Food Security', url: '#food-security' },
  ];
  
  // Get involved links
  const involvedLinks = [
    { name: 'Volunteer', url: '#volunteer' },
    { name: 'Donate', url: '#donate' },
    { name: 'Fundraise', url: '#fundraise' },
    { name: 'Partner With Us', url: '#partner' },
    { name: 'Corporate Giving', url: '#corporate' },
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-4">
            <a 
              href="#home" 
              className="inline-flex items-center text-xl font-display font-medium tracking-tight mb-6"
            >
              <span className="text-primary mr-1">
                <Heart className="h-5 w-5 inline-block" />
              </span>
              WeneedWe
            </a>
            <p className="text-muted-foreground mb-6 text-balance">
              Empowering underserved communities through comprehensive support services, education programs, and community development initiatives.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <a 
                  href="mailto:contact@weneedwe.org"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@weneedwe.org
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <a 
                  href="tel:+15551234567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                <address className="text-muted-foreground not-italic">
                  123 Community Avenue<br />
                  Chicago, IL 60601
                </address>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-colors hover:bg-primary hover:text-white"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Get Involved */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Get Involved</h3>
            <ul className="space-y-3">
              {involvedLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Join our newsletter for updates on events, volunteer opportunities, and ways to help.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  required
                  aria-label="Email for newsletter"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium transition-all hover:bg-primary/90"
              >
                Subscribe
              </button>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
        
        {/* Donation CTA */}
        <div className="mt-16 mb-12 bg-primary/10 rounded-2xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-3">Make a Difference Today</h3>
              <p className="text-muted-foreground mb-6 lg:mb-0">
                Your contribution helps us continue our mission of supporting communities in need.
                Every donation, no matter how small, makes a significant impact.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <a
                href="#donate"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left mb-4 md:mb-0">
            © {currentYear} WeneedWe. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
