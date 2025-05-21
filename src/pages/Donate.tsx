import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, ShieldCheck } from 'lucide-react';

const DonatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-red-500 to-pink-600 text-white text-center">
        <div className="container mx-auto px-4">
          <Heart className="w-24 h-24 mx-auto mb-8 text-white opacity-80" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Support Our Cause
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Your generous contribution empowers us to continue our vital work in the community, providing support, education, and advocacy for Black women's health and well-being.
          </p>
        </div>
      </section>

      {/* Why Donate Section */}
      <section id="why-donate" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-700 font-display">
            Why Your Donation Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-rose-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <HeartHandshake className="w-16 h-16 mx-auto mb-6 text-red-500" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Empowerment Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Fund initiatives like BW-SELF, providing Black women with tools and resources for health advocacy and self-empowerment.
              </p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <BookOpen className="w-16 h-16 mx-auto mb-6 text-pink-500" /> 
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Educational Resources</h3>
              <p className="text-gray-600 leading-relaxed">
                Support the creation and dissemination of vital health information, webinars, and resource materials for our community.
              </p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-16 h-16 mx-auto mb-6 text-amber-500" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Community Outreach</h3>
              <p className="text-gray-600 leading-relaxed">
                Help us expand our reach, connecting with more individuals and families in need of support and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Options Section */}
      <section id="donation-options" className="py-16 md:py-24 bg-rose-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-700 font-display">
            Choose Your Impact
          </h2>
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-xl">
            <p className="text-lg text-gray-600 mb-8 text-center">
              We are grateful for donations of any amount. Select an option below or enter a custom amount.
              For larger contributions or corporate sponsorships, please contact us directly.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[25, 50, 100, 250].map((amount) => (
                <Button 
                  key={amount} 
                  variant="outline"
                  className="w-full h-16 text-xl border-red-300 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="mb-8">
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">Custom Amount:</label>
              <input 
                type="number" 
                id="custom-amount" 
                placeholder="Enter amount" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg py-4 rounded-lg font-semibold transition-transform hover:scale-105 shadow-md"
            >
              <DollarSign className="mr-2 h-6 w-6" /> Donate Now
            </Button>
            
            <p className="mt-6 text-sm text-gray-500 text-center flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-green-600" /> Secure SSL Encrypted Donation
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-400" />
          <h2 className="text-3xl font-bold text-gray-700 mb-4 font-display">
            Thank You for Your Support!
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Every contribution, big or small, makes a difference. Together, we can build a healthier, more equitable future for Black women.
          </p>
        </div>
      </section>
    </div>
  );
};

// Dummy icons for placeholders, replace with actual imports if needed
const HeartHandshake: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
    <path d="m18 15-2-2"/><path d="m15 18-2-2"/>
  </svg>
);

const BookOpen: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const Users: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export default DonatePage;
