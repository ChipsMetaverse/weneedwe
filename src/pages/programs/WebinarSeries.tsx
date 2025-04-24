import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { Calendar, Play, Users, CheckCircle, Download, ExternalLink, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

// Webinar data
const webinars = [
  {
    id: 1,
    title: "Advocating During Medical Appointments",
    description: "Learn effective strategies for communicating with healthcare providers and ensuring your concerns are addressed.",
    presenter: "Dr. Michelle Johnson",
    presenterTitle: "Primary Care Physician",
    date: "September 15, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "advocacy",
    image: "/placeholder.svg",
    featured: true,
    recording: true,
    materials: true
  },
  {
    id: 2,
    title: "Understanding Your Health Rights",
    description: "Explore your rights as a patient in healthcare settings and how to exercise them effectively.",
    presenter: "Dr. Tanya Williams",
    presenterTitle: "Health Policy Expert",
    date: "October 5, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "rights",
    image: "/placeholder.svg",
    featured: false,
    recording: true,
    materials: true
  },
  {
    id: 3,
    title: "Preventive Care for Black Women",
    description: "Learn about essential preventive screenings and services specifically important for Black women's health.",
    presenter: "Dr. Latisha Brown",
    presenterTitle: "OB/GYN Specialist",
    date: "October 19, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "preventive",
    image: "/placeholder.svg",
    featured: true,
    recording: false,
    materials: true
  },
  {
    id: 4,
    title: "Mental Health and Self-Care",
    description: "Discover strategies for maintaining mental wellbeing and implementing self-care practices in daily life.",
    presenter: "Dr. Jasmine Thompson",
    presenterTitle: "Licensed Psychologist",
    date: "November 2, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "mental",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: true
  },
  {
    id: 5,
    title: "Navigating Health Insurance",
    description: "Learn how to understand your health insurance coverage and maximize your benefits.",
    presenter: "Patricia Davis",
    presenterTitle: "Healthcare Navigator",
    date: "November 16, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "insurance",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 6,
    title: "Nutrition and Heart Health",
    description: "Explore heart-healthy dietary choices and nutrition strategies for overall wellbeing.",
    presenter: "Dr. Karen Jackson",
    presenterTitle: "Cardiologist & Nutrition Specialist",
    date: "December 7, 2023",
    time: "6:00 PM - 7:30 PM EST",
    category: "nutrition",
    image: "/placeholder.svg",
    featured: true,
    recording: false,
    materials: false
  },
  {
    id: 7,
    title: "Managing Chronic Conditions",
    description: "Strategies for effectively managing and monitoring chronic health conditions.",
    presenter: "Dr. Lisa Martin",
    presenterTitle: "Internal Medicine Specialist",
    date: "January 11, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "chronic",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 8,
    title: "Reproductive Health Advocacy",
    description: "Understanding your reproductive health rights and advocating for comprehensive care.",
    presenter: "Dr. Shanice Wilson",
    presenterTitle: "Reproductive Health Specialist",
    date: "January 25, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "reproductive",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 9,
    title: "Addressing Healthcare Disparities",
    description: "Examining racial disparities in healthcare and strategies for addressing systemic challenges.",
    presenter: "Dr. Rachel Greene",
    presenterTitle: "Public Health Researcher",
    date: "February 8, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "disparities",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 10,
    title: "Family Health Advocacy",
    description: "Learn how to advocate for your family members' health needs across different age groups.",
    presenter: "Dr. Nicole Harris",
    presenterTitle: "Family Medicine Physician",
    date: "February 22, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "family",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 11,
    title: "Medication Management & Safety",
    description: "Understanding your medications, potential interactions, and ensuring proper usage.",
    presenter: "Dr. Danielle Robinson",
    presenterTitle: "Clinical Pharmacist",
    date: "March 7, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "medication",
    image: "/placeholder.svg",
    featured: false,
    recording: false,
    materials: false
  },
  {
    id: 12,
    title: "Building Your Health Advocacy Toolkit",
    description: "Putting it all together with practical tools and resources for becoming an effective self-advocate.",
    presenter: "Dr. Angela Turner",
    presenterTitle: "Patient Advocacy Director",
    date: "March 21, 2024",
    time: "6:00 PM - 7:30 PM EST",
    category: "toolkit",
    image: "/placeholder.svg",
    featured: true,
    recording: false,
    materials: false
  }
];

const WebinarCard = ({ webinar }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={webinar.image} 
          alt={webinar.title} 
          className="w-full h-full object-cover"
        />
        {webinar.featured && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        {webinar.recording && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Play className="h-3 w-3" />
            Recording Available
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-500">{webinar.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{webinar.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{webinar.description}</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-sm">{webinar.presenter}</div>
            <div className="text-xs text-gray-500">{webinar.presenterTitle}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {webinar.category}
          </Badge>
          {webinar.materials && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Materials
            </Badge>
          )}
        </div>
        <div className="mt-6 flex justify-between">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Register
          </Button>
          {webinar.recording && (
            <Button size="sm" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Watch
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const WebinarSeries = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.1, // Lower threshold for easier triggering
    triggerOnce: true
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const featuredWebinars = webinars.filter(webinar => webinar.featured);
  const upcomingWebinars = webinars.slice(0, 7); // First 7 are upcoming
  const pastWebinars = webinars.slice(7, 12); // Last 5 are past
  
  const filteredUpcoming = upcomingWebinars.filter(webinar => 
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webinar.presenter.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPast = pastWebinars.filter(webinar => 
    webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webinar.presenter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* HERO/INTRO: BW-SELF Mission & Outreach */}
        <section 
          className="relative py-24 bg-purple-50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                BW-SELF Webinar Series
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-purple-800">Our Power, Our Voice, Our Control!</h1>
              <p className="text-xl text-purple-700/80 mb-4">
                Our Risk Reduction Department and BW-SELF Health Ambassadors are reaching out to the community to reduce the number of new infections, and ultimately eradicate the HIV/AIDS epidemic through education, testing, and ongoing collaborations. We have recently enhanced our outreach tactics to a more community development approach, technically advanced via this Toolkit, and accessible for all 77 Communities, medical professionals, collaborators, and supporters.
              </p>
              <p className="text-lg text-purple-700/70">
                We now provide online webinars, viable information, and support through this website (weneedwe.org) and SheStories blog builders to keep in touch with all communities with just a click of a button. We are proud to say that we can now access the community at our fingertips and create a sense of awareness, through mass media systems, about HIV and how we can prevent the epidemic and #Getting2Zero infections.
              </p>
            </div>
            {/* MEDIA ROW: Doctor, Woman, Hanging Out, Sketch */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <img src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/e59392533d934e9096ccd4f1b309148f" alt="Black Woman Doctor" className="w-32 h-32 object-cover rounded-xl shadow-md mx-auto" />
              <img src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/add35a636f21418e970d4e251b8b92e5" alt="Empowered Black Woman" className="w-32 h-32 object-cover rounded-xl shadow-md mx-auto" />
              <img src="https://weneedwe.org/x/cdn/?https://images.unsplash.com/photo-1611432580340-af48bd7549ed?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200" alt="Women Hanging Out" className="w-32 h-32 object-cover rounded-xl shadow-md mx-auto" />
              <img src="https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/cb09ff9ed0df412c8d3aa13037045955" alt="Sketch" className="w-32 h-32 object-cover rounded-xl shadow-md mx-auto" />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section 
          ref={ref}
          className={`relative py-16 md:py-24 overflow-hidden transition-all duration-700 ${
            true /* Always visible in preview */ || inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container px-4 md:px-6 relative z-10">
            {/* OVERVIEW: Emphasize toolkit/cultural competency */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-purple-800">A Condom For Everyone</h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-2/5 relative">
                    <a href="https://youtu.be/7d6oqRB79ws" target="_blank" rel="noopener noreferrer" className="group block">
                      <img src="https://img.youtube.com/vi/7d6oqRB79ws/hqdefault.jpg" alt="A Condom For Everyone" className="w-full rounded-lg shadow-md object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="md:w-3/5">
                    <div className="prose prose-lg max-w-none">
                      <p className="mb-4">
                        According to a study released 6/24/08 by PLoS Medicine, watching a video in an STD clinic waiting 
                        room can reduce the risk for a new STD by almost 10%. In a large multi-center intervention trial, Dr. Lee 
                        Warner from the Centers for Disease Control and Prevention and a team of researchers at different 
                        institutions in the U.S. studied the effect of a carefully crafted, 23-minute waiting room video on the risk for 
                        new STDs among 40,000 patients in 3 STD clinics in the country.
                      </p>
                      <p>
                        More information about Safe in the City can be found at the project's website: 
                        <a href="http://www.safeinthecity.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                          www.safeinthecity.org
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* YOUTUBE/RESOURCE VIDEOS SECTION: Past Webinars & Resources */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Webinars & Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* YouTube Webinars */}
                <a href="https://youtu.be/bsY5Vl-NXhU" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <img src="https://img.youtube.com/vi/bsY5Vl-NXhU/hqdefault.jpg" alt="How to Leverage Your Entrepreneurial Spirit During The Pandemic" className="w-full h-48 object-cover group-hover:brightness-90" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">How to Leverage Your Entrepreneurial Spirit During The Pandemic</h3>
                  </div>
                </a>
                <a href="https://youtu.be/woyoq9FQ0rg" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <img src="https://img.youtube.com/vi/woyoq9FQ0rg/hqdefault.jpg" alt="Women's Mood And Anxiety Disorder Across Reproductive Life Cycle" className="w-full h-48 object-cover group-hover:brightness-90" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">Women's Mood And Anxiety Disorder Across Reproductive Life Cycle</h3>
                  </div>
                </a>
                <a href="https://youtu.be/CoIuR4pn9H0" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <img src="https://img.youtube.com/vi/CoIuR4pn9H0/hqdefault.jpg" alt="GETTING YOUR GROVE BACK" className="w-full h-48 object-cover group-hover:brightness-90" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">GETTING YOUR GROVE BACK</h3>
                  </div>
                </a>
                <a href="https://youtu.be/e3S8IjAVu54" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <img src="https://img.youtube.com/vi/e3S8IjAVu54/hqdefault.jpg" alt="DISPARITIES IN HEALTHCARE VACCINATIONS AND HIV" className="w-full h-48 object-cover group-hover:brightness-90" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">DISPARITIES IN HEALTHCARE VACCINATIONS AND HIV</h3>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Useful Links & Contact Info */}
            <div className="max-w-4xl mx-auto mt-16 mb-24">
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-md">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-red-600">Useful Links & Resources</h3>
                    <ul className="list-disc ml-6 mb-4">
                      <li><a href="https://ufcinc.org/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">Universal Family Connection</a></li>
                      <li><a href="https://dph.illinois.gov/topics-services/diseases-and-conditions/hiv-aids/basuah.html" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">BASUAH</a></li>
                      <li><a href="https://www.aidschicago.org/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">AIDS Foundation of Chicago</a></li>
                      <li><a href="https://www.chicago.gov/city/en/depts/cdph.html" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">CDPH</a></li>
                      <li><a href="https://www.prep4blackwomen.org/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">PrEP4Black Women</a></li>
                      <li><a href="https://www.advocatesforyouth.org/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">Advocates for Youths</a></li>
                      <li><a href="https://www.safeinthecity.org/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-600">Safe in the City (CDC Project)</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-red-600">Contact Information</h4>
                    <p>Email: <a href="mailto:jmjones@ufcinc.org" className="text-red-600 hover:underline">jmjones@ufcinc.org</a></p>
                    <p>Telephone: <a href="tel:773-881-1711" className="text-red-600 hover:underline">(773) 881-1711</a></p>
                    <p className="text-gray-800">Fax: (773) 881-3379</p>
                  </div>
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

export default WebinarSeries;