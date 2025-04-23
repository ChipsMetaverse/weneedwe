import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="bg-primary-50 rounded-lg p-8 md:p-12 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Building a Stronger Community Together
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            WeneedWe is dedicated to empowering individuals through community support,
            education, and personal development programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link to="/about-us">Learn More</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">Our Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Youth Mentorship</h3>
            <p className="text-gray-600 mb-4">
              Connecting young people with mentors who provide guidance, support, and encouragement.
            </p>
            <Button variant="link" asChild>
              <Link to="/services">Learn More →</Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Community Workshops</h3>
            <p className="text-gray-600 mb-4">
              Educational sessions on financial literacy, career development, and life skills.
            </p>
            <Button variant="link" asChild>
              <Link to="/services">Learn More →</Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Support Services</h3>
            <p className="text-gray-600 mb-4">
              Resources and assistance for families and individuals in need.
            </p>
            <Button variant="link" asChild>
              <Link to="/services">Learn More →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-6">
          Join our community of volunteers or support our cause with a donation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="default" size="lg">
            Donate Now
          </Button>
          <Button variant="outline" size="lg">
            Volunteer
          </Button>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 