import React, { useState } from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Send, CheckCircle2, Mail, Phone, MapPin, Info, User, AtSign, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    reason: 'general'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formState.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
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
    
    // Subject validation
    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would use Supabase to store the contact form data
      // const { error } = await supabase
      //   .from('contact_requests')
      //   .insert([{
      //     name: formState.name,
      //     email: formState.email,
      //     phone: formState.phone || null,
      //     subject: formState.subject,
      //     message: formState.message,
      //     reason: formState.reason,
      //     created_at: new Date().toISOString()
      //   }]);
      
      // if (error) throw error;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        reason: 'general'
      });
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-24 bg-secondary/50">
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          "container mx-auto px-6",
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-white text-primary">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We're Here to Help
            </h2>
            <p className="text-muted-foreground text-lg mb-8 text-balance">
              Have questions about our services or how we can support you? 
              Reach out to us and our dedicated team will respond as soon as possible.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <a 
                    href="mailto:contact@weneedwe.org" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    contact@weneedwe.org
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Phone</h3>
                  <a 
                    href="tel:+15551234567" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monday-Friday, 9AM-5PM EST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Location</h3>
                  <address className="text-muted-foreground not-italic">
                    123 Community Avenue<br />
                    Chicago, IL 60601
                  </address>
                </div>
              </div>
            </div>
            
            {/* Google Maps embed would go here in production */}
            <div className="w-full h-64 bg-white rounded-lg border border-border mt-8 flex items-center justify-center">
              <p className="text-muted-foreground">Google Maps embed would appear here</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Message Sent!</h3>
                <p className="text-muted-foreground mb-6 text-balance">
                  Thank you for contacting us. A member of our team will get back to you within 24-48 hours.
                </p>
                <button 
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="button-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium mb-1 flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all outline-none",
                      errors.name 
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" 
                        : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    )}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-500 mt-1 flex items-center">
                      <Info className="w-3 h-3 mr-1" /> {errors.name}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 flex items-center">
                      <AtSign className="w-4 h-4 mr-1" />
                      Email <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-all outline-none",
                        errors.email 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" 
                          : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      )}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <Info className="w-3 h-3 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-all outline-none",
                        errors.phone 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" 
                          : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      )}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-500 mt-1 flex items-center">
                        <Info className="w-3 h-3 mr-1" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="reason" className="block text-sm font-medium mb-1">
                    What can we help you with?
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formState.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="services">Services Information</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="donate">Donation Questions</option>
                    <option value="partnership">Partnership Proposals</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 flex items-center">
                    Subject <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all outline-none",
                      errors.subject 
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" 
                        : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    )}
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-red-500 mt-1 flex items-center">
                      <Info className="w-3 h-3 mr-1" /> {errors.subject}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-sm font-medium mb-1 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all outline-none resize-none",
                      errors.message 
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" 
                        : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    )}
                    placeholder="Your message..."
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-500 mt-1 flex items-center">
                      <Info className="w-3 h-3 mr-1" /> {errors.message}
                    </p>
                  )}
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className={cn(
                      "button-primary w-full flex items-center justify-center gap-2",
                      isSubmitting && "opacity-80 pointer-events-none"
                    )}
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
