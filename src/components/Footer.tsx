import React, { useState } from 'react';
import { Heart, Mail, Phone, Printer, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface FormState {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    phone: '',
    email: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
    { name: 'Just The Facts', url: '/just-the-facts' },
    { name: 'BW-SELF Program', url: '/programs/bw-self' },
    { name: 'Webinar Series', url: '/webinars' },
    { name: 'Resource Center', url: '/resources' },
    { name: 'Blog', url: '/blog' },
    { name: 'Contact', url: '/contact' },
    { name: 'Donate', url: '/donate' },
  ];
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation (optional)
    if (formState.phone && !/^[0-9()\-\s+]{7,20}$/.test(formState.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the contact form data into Supabase
      const { data, error } = await supabase
        .from('contact_requests')
        .insert([{
          name: formState.name,
          email: formState.email,
          phone: formState.phone || null,
          source: 'weneedwe.org',
          created_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      // Send webhook to contact-notification function to trigger email
      if (data && data.length > 0) {
        try {
          const { error: webhookError } = await supabase.functions.invoke('contact-notification', {
            body: { record: data[0] }
          });
          
          if (webhookError) {
            console.warn('Email notification may not have been sent:', webhookError);
          }
        } catch (notifyError) {
          console.warn('Failed to trigger email notification:', notifyError);
          // Continue with success flow even if notification fails
        }
      }
      
      setIsSubmitted(true);
      setFormState({
        name: '',
        phone: '',
        email: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
              <span className="text-primary">WeNeedWe</span>
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
            {isSubmitted ? (
              <div className="bg-primary/10 text-primary p-4 rounded-md mb-4">
                <p className="font-medium">Thank you for reaching out!</p>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
                      errors.name 
                        ? "border-red-500 focus:ring-red-500/50" 
                        : "border-border focus:ring-primary/50"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <Info className="h-3 w-3 mr-1" /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
                      errors.phone 
                        ? "border-red-500 focus:ring-red-500/50" 
                        : "border-border focus:ring-primary/50"
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <Info className="h-3 w-3 mr-1" /> {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
                      errors.email 
                        ? "border-red-500 focus:ring-red-500/50" 
                        : "border-border focus:ring-primary/50"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <Info className="h-3 w-3 mr-1" /> {errors.email}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} WeNeedWe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;