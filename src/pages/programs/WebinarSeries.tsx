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
    threshold: 0.2,
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
        {/* Hero Section */}
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
              <p className="text-xl text-purple-700/80">
                A 12-part webinar series featuring Black women doctors and healthcare providers discussing crucial health topics and advocacy strategies.
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
            {/* Series Overview */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-purple-800">Series Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    The <strong>Our Power, Our Voice, Our Control!</strong> webinar series is a cornerstone of our BW-SELF Advocacy Program, designed to provide Black women with the knowledge and tools they need to advocate for their health effectively.
                  </p>
                  <p>
                    Each session features expert Black women healthcare providers sharing their insights on critical health topics, practical advocacy strategies, and answering your questions in real-time.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg text-purple-800">12 Sessions</h3>
                    </div>
                    <p className="text-purple-700">Comprehensive series covering essential health topics and advocacy skills</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Download className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg text-purple-800">Free Resources</h3>
                    </div>
                    <p className="text-purple-700">Downloadable materials and action plans for each session</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-lg text-purple-800">Expert Presenters</h3>
                    </div>
                    <p className="text-purple-700">Sessions led by experienced Black women healthcare professionals</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Register for Upcoming Sessions
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Featured Webinars */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Webinars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredWebinars.map(webinar => (
                  <WebinarCard key={webinar.id} webinar={webinar} />
                ))}
              </div>
            </div>
            
            {/* All Webinars with Tabs */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">All Webinars</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search webinars..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter by:</span>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                    Topic
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                    Presenter
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                    Date
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-96 grid-cols-2 mb-8">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past Webinars</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {filteredUpcoming.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredUpcoming.map(webinar => (
                        <WebinarCard key={webinar.id} webinar={webinar} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No upcoming webinars found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {filteredPast.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPast.map(webinar => (
                        <WebinarCard key={webinar.id} webinar={webinar} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No past webinars found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Call to Action */}
            <div className="max-w-4xl mx-auto mt-20">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100 shadow-md">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-purple-800 mb-4">Join Our Community of Health Advocates</h2>
                  <p className="text-lg text-purple-700/80 max-w-2xl mx-auto">
                    Register for our webinar series and gain access to exclusive resources, support networks, and expert guidance.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Register Now
                  </Button>
                  <Link to="/programs/bw-self">
                    <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                      Learn About BW-SELF Program
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

export default WebinarSeries;