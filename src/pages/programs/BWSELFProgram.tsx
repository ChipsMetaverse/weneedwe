import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { ArrowRight, CheckCircle, Users, Heart, Award, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mainPrograms, webinarSeries } from '@/data/siteData';

const BWSELFProgram = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  // Get BW-SELF program data from extracted content
  const bwSelfProgram = mainPrograms.find(program => program.id === "bw-self");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 bg-red-50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Featured Program
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-red-800">{bwSelfProgram?.title || "BW-SELF Advocacy Program"}</h1>
              <p className="text-2xl font-semibold text-red-700 mb-8">
                {bwSelfProgram?.slogan || "OUR POWER, OUR VOICE, OUR CONTROL!"}
              </p>
              <p className="text-xl text-red-700/80 max-w-2xl mx-auto">
                {bwSelfProgram?.shortDescription || "Empowering Black Women to navigate healthcare systems, pursue education, and access community resources through advocacy and support."}
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
              {/* Program Overview */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-red-800">Program Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    The <strong>BW-SELF (Black Women - Self Empowerment Leadership Framework) Advocacy Program</strong> {bwSelfProgram?.fullDescription || "is our premier initiative designed to empower Black women through health education, advocacy training, and community support."}
                  </p>
                  <p>
                    As an agency of change on how women access healthcare, the BW-SELF addresses health disparities that Black women face by providing practical tools for navigating these systems effectively.
                  </p>
                </div>

                {/* Program Objectives */}
                <div className="mt-12 bg-red-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-6 text-red-800">Program Objectives</h3>
                  <ul className="space-y-4">
                    {bwSelfProgram?.keyFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-red-100 p-1 rounded-full">
                          <CheckCircle className="h-5 w-5 text-red-700" />
                        </div>
                        <p className="text-lg text-red-700">{feature}</p>
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 bg-red-100 p-1 rounded-full">
                            <CheckCircle className="h-5 w-5 text-red-700" />
                          </div>
                          <p className="text-lg text-red-700">Empower Black women with knowledge and tools to advocate for themselves in healthcare settings</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 bg-red-100 p-1 rounded-full">
                            <CheckCircle className="h-5 w-5 text-red-700" />
                          </div>
                          <p className="text-lg text-red-700">Improve health outcomes through preventive care education and early intervention</p>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* Key Components */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Key Program Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4 items-start">
                      <div className="bg-red-100 p-3 rounded-full">
                        <CheckCircle className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Self-Advocacy Skills</h4>
                        <p className="text-gray-700">Development of effective communication skills for advocating in healthcare and community settings.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4 items-start">
                      <div className="bg-red-100 p-3 rounded-full">
                        <CheckCircle className="h-5 w-5 text-red-700" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">Support Networks</h4>
                        <p className="text-gray-700">Community resources and peer-to-peer support networks for Black women.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Webinar Series Preview */}
              <div className="mb-16 p-8 border border-gray-200 rounded-xl bg-white shadow-md">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-3">
                      Featured Webinar Series
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{webinarSeries.title}</h2>
                    <p className="text-gray-700 mb-4">
                      {webinarSeries.description}
                    </p>
                    {webinarSeries.upcomingWebinars && webinarSeries.upcomingWebinars.length > 0 && (
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-600">
                          Next webinar: {new Date(webinarSeries.upcomingWebinars[0].date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link to="/webinars">
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full">
                      View Webinar Schedule
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Program Image */}
              <div className="mb-16">
                <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={bwSelfProgram?.featuredImageUrl || "/photos/7534503d-1c6b-438b-98ea-4f706a856228.webp"} 
                    alt={bwSelfProgram?.title || "BW-SELF Program"} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white">{bwSelfProgram?.slogan || "OUR POWER, OUR VOICE, OUR CONTROL!"}</h3>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Get Involved */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-xl border border-red-100">
                <h2 className="text-2xl font-bold mb-6 text-red-800 text-center">Get Involved</h2>
                <div className="prose prose-lg max-w-none text-center mb-8">
                  <p>
                    Join us in our mission to empower Black women through the BW-SELF advocacy program and help address the health disparities that Black women face.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/donate">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      Support Our Work
                    </Button>
                  </Link>
                  <Link to="/volunteer">
                    <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Volunteer With Us
                    </Button>
                  </Link>
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

export default BWSELFProgram;