import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { FileText, Download, ExternalLink, Search, Filter, BookOpen, Link2, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Resource data
const resources = [
  {
    id: 1,
    title: "Understanding Patient Rights",
    description: "A comprehensive guide to your rights as a patient in healthcare settings.",
    category: "education",
    type: "pdf",
    size: "2.4 MB",
    date: "August 15, 2023",
    downloadable: true,
    featured: true
  },
  {
    id: 2,
    title: "Health Advocacy Checklist",
    description: "Step-by-step checklist for preparing for and navigating medical appointments.",
    category: "advocacy",
    type: "pdf",
    size: "1.2 MB",
    date: "July 23, 2023",
    downloadable: true,
    featured: true
  },
  {
    id: 3,
    title: "Essential Health Screenings for Black Women",
    description: "Age-appropriate preventive screenings recommended for Black women.",
    category: "health",
    type: "pdf",
    size: "3.1 MB",
    date: "June 10, 2023",
    downloadable: true,
    featured: false
  },
  {
    id: 4,
    title: "Mental Health Resources Directory",
    description: "List of mental health providers specializing in services for Black women.",
    category: "mental-health",
    type: "pdf",
    size: "4.5 MB",
    date: "May 18, 2023",
    downloadable: true,
    featured: false
  },
  {
    id: 5,
    title: "Navigating Health Insurance",
    description: "Guide to understanding health insurance terms and maximizing your coverage.",
    category: "insurance",
    type: "pdf",
    size: "2.8 MB",
    date: "April 22, 2023",
    downloadable: true,
    featured: false
  },
  {
    id: 6,
    title: "Reproductive Health Rights",
    description: "Information about reproductive health rights and services.",
    category: "reproductive",
    type: "pdf",
    size: "3.2 MB",
    date: "March 12, 2023",
    downloadable: true,
    featured: true
  },
  {
    id: 7,
    title: "Healthcare Provider Communication Guide",
    description: "Scripts and strategies for effective communication with healthcare providers.",
    category: "advocacy",
    type: "pdf",
    size: "1.6 MB",
    date: "February 28, 2023",
    downloadable: true,
    featured: false
  },
  {
    id: 8,
    title: "Chronic Condition Management Toolkit",
    description: "Resources for managing common chronic health conditions.",
    category: "health",
    type: "pdf",
    size: "5.3 MB",
    date: "January 15, 2023",
    downloadable: true,
    featured: false
  }
];

// Partner organizations
const partners = [
  {
    id: 1,
    name: "Black Women's Health Alliance",
    description: "National organization dedicated to improving the health and wellness of Black women.",
    url: "https://example.org/bwha",
    category: "health"
  },
  {
    id: 2,
    name: "National Health Education Council",
    description: "Provides educational resources on various health topics.",
    url: "https://example.org/nhec",
    category: "education"
  },
  {
    id: 3,
    name: "Patient Advocacy Network",
    description: "Supporting patients in navigating healthcare systems and advocating for their needs.",
    url: "https://example.org/pan",
    category: "advocacy"
  },
  {
    id: 4,
    name: "Community Health Resource Center",
    description: "Local organization providing health services and education to the community.",
    url: "https://example.org/chrc",
    category: "community"
  },
  {
    id: 5,
    name: "Mental Health Support Coalition",
    description: "Resources and support for mental health and wellness.",
    url: "https://example.org/mhsc",
    category: "mental-health"
  }
];

const ResourceCard = ({ resource }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="mt-2">{resource.description}</CardDescription>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div>Type: {resource.type.toUpperCase()}</div>
          <div>Size: {resource.size}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {resource.category}
          </Badge>
          {resource.featured && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Featured
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Download Resource
        </Button>
      </CardFooter>
    </Card>
  );
};

const PartnerCard = ({ partner }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{partner.name}</CardTitle>
          <div className="bg-green-100 p-2 rounded-full">
            <Link2 className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <CardDescription className="mt-2">{partner.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {partner.category}
        </Badge>
      </CardContent>
      <CardFooter>
        <a href={partner.url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

const ResourceCenter = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('resources');
  
  const featuredResources = resources.filter(resource => resource.featured);
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 bg-blue-50 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Educational Resources
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-blue-800">Just The Facts</h1>
              <p className="text-xl text-blue-700/80">
                Access evidence-based educational resources and materials to support your health advocacy journey.
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
            {/* Resource Center Overview */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-blue-800">Resource Center Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p>
                    The <strong>Just The Facts</strong> Resource Center provides access to reliable, evidence-based information on health topics that matter most to Black women. Our resources are developed in collaboration with healthcare professionals and designed to empower you in making informed decisions about your health.
                  </p>
                  <p>
                    Whether you're looking for information on patient rights, preventive care guidelines, or communication tools for medical appointments, you'll find resources here to support your health advocacy journey.
                  </p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg text-blue-800">Downloadable Guides</h3>
                    </div>
                    <p className="text-blue-700">Comprehensive resources you can download and reference anytime</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Link2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg text-blue-800">Partner Organizations</h3>
                    </div>
                    <p className="text-blue-700">Links to trusted organizations offering additional resources</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg text-blue-800">Expert-Reviewed</h3>
                    </div>
                    <p className="text-blue-700">All materials are reviewed by healthcare professionals for accuracy</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Resources */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
            
            {/* All Resources with Tabs */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Resource Library</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search resources..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter by:</span>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Category
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Type
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                    Date
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="resources" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-96 grid-cols-2 mb-8">
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="partners">Partner Organizations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="resources">
                  {filteredResources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No resources found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="partners">
                  {filteredPartners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPartners.map(partner => (
                        <PartnerCard key={partner.id} partner={partner} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No partner organizations found matching your search.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Community Directory */}
            <div className="max-w-4xl mx-auto mt-20">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 border border-blue-100 shadow-md">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">Community Resource Directory</h2>
                    <p className="text-lg text-blue-700/80 mb-6">
                      Access our comprehensive directory of local community resources, including healthcare providers, support groups, and social services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Directory
                      </Button>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                        Suggest a Resource
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Directory Categories</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-blue-800">Healthcare Providers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-blue-800">Support Groups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-blue-800">Social Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-blue-800">Emergency Resources</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Support?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our BW-SELF Advocacy Program for personalized support and guidance on your health advocacy journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/programs/bw-self">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Learn About BW-SELF
                  </Button>
                </Link>
                <Link to="/webinars">
                  <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    Join Upcoming Webinars
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResourceCenter;