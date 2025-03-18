import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';

const AboutUs: React.FC = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 bg-primary/5 overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">About We Need We</h1>
              <p className="text-xl text-muted-foreground">
                We are dedicated to supporting and uplifting our community through innovative programs and services.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section 
          ref={ref}
          className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto">
              {/* Mission & Vision */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    At We Need We, our mission is to empower and strengthen our community through comprehensive support services, education, and advocacy.
                  </p>
                  <p>
                    Our vision is a community where all individuals have equal access to opportunities for growth, health, and well-being.
                  </p>
                </div>
              </div>
              
              {/* Our Story */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    We Need We was founded with a commitment to addressing the critical needs of our community, especially focusing on health education, youth empowerment, and advocacy.
                  </p>
                  <p>
                    Over the years, we have grown to provide a comprehensive range of services that respond to evolving community needs while maintaining our core mission.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden">
                  <img 
                    src="/images/placeholder.svg" 
                    alt="We Need We history" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Our Impact */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    Through our programs and services, we have made a significant impact in our community:
                  </p>
                  <ul>
                    <li>Provided essential health education to hundreds of community members</li>
                    <li>Empowered youth through leadership development programs</li>
                    <li>Supported self-advocacy initiatives for underserved populations</li>
                    <li>Connected community members with critical resources and services</li>
                  </ul>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="bg-primary/10 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Together, we can make a meaningful difference in our community. 
                  Join us in our mission to create positive change.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/#volunteer" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Volunteer With Us
                  </a>
                  <a href="/#donate" className="px-6 py-3 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                    Support Our Work
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs; 