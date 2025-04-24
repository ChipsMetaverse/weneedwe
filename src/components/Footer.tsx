import React from 'react';
import { Heart, Mail, Phone, Printer, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

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
  
  // Site Map links
  const siteMapLinks = [
    { name: 'About', url: '/about-us' },
    { name: 'BW-SELF Advocacy', url: '#bw-self-advocacy' },
    { name: 'Just The Facts', url: '#just-the-facts' },
    { name: 'Webinars', url: '#webinars' },
    { name: 'Donate', url: '#donate' },
  ];
  
  return (
    <footer className="bg-pattern border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-4">
            <a 
              href="/" 
              className="inline-flex items-center text-xl font-display font-medium tracking-tight mb-6"
            >
              <span className="text-primary mr-1">
                <Heart className="h-5 w-5 inline-block" />
              </span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">WeNeedWe</span>
            </a>
            <p className="text-muted-foreground mb-6 text-balance">
              Follow us on social media for all our latest news, updates and event information.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <a 
                  href="mailto:jmjones@ufcinc.org"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  jmjones@ufcinc.org
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <a 
                  href="tel:+17738811711"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  (773) 881-1711
                </a>
              </div>
              <div className="flex items-center">
                <Printer className="w-5 h-5 text-primary mr-3" />
                <span className="text-muted-foreground">
                  Fax: (773) 881-3379
                </span>
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
          
          {/* Site Map */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-lg mb-4">Site Map</h3>
            <ul className="space-y-2">
              {siteMapLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="w-3 h-3 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-6">
            <h3 className="font-medium text-lg mb-4">Contact us</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p> {currentYear} WeNeedWe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;