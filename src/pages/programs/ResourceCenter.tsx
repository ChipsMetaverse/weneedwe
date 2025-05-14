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
    title: "BW-Self Webinars",
    description: "Our webinar series",
    category: "education",
    type: "internal",
    url: "/webinars",
    image: "https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/661cd420a4e8488783aa8c5347ad881a"
  },
  {
    id: 2,
    title: "PrEP4ILLINOIS",
    description: "Click for a Directory of PrEP Providers in Illinois",
    category: "directory",
    type: "external",
    url: "https://www.prep4illinois.com/",
    image: "https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/1e94d95736d84307a5c93de1502731c8"
  },
  {
    id: 3,
    title: "U = U (Undetectable = Untransmittable)",
    description: "People living with HIV can lead long and healthy lives by taking medicines that control the virus",
    category: "education",
    type: "external",
    url: "https://www.youtube.com/watch?v=keG71hZuuIo",
    image: "https://weneedwe.org/x/cdn/?https://storage.googleapis.com/production-homestead-v1-0-9/959/596959/45J1cuOJ/6c6e2ab04fbf43dbb990011ebdb387af"
  },
  {
    id: 4,
    title: "AIDS United",
    description: "Organization dedicated to the eradication of AIDS",
    category: "organization",
    type: "external",
    url: "https://aidsunited.org/",
    image: "https://weneedwe.org/x/cdn/?https://images.unsplash.com/photo-1505243542579-da5adfe8338f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600"
  }
];

// Simplified resource card component
const ResourceCard = ({ resource }) => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex-1 bg-white">
        <img 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="bg-white p-6 flex-1 flex flex-col items-center text-center">
        <div className="text-purple-800 my-2">
          • • •
        </div>
        <h3 className="font-bold text-purple-800 text-lg mb-1">{resource.title}</h3>
        <p className="text-gray-800 font-medium">{resource.description}</p>
      </div>
    </div>
  );
};

const ResourceCenter = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section - Full width with woman holding HIV card */}
        <section className="relative">
          <div className="relative h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/images/HivResourcesBanner.jpg" 
                alt="Black woman holding HIV awareness card" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Blue banner with RESOURCES text */}
            <div className="absolute bottom-0 inset-x-0 bg-blue-700 py-6 w-full">
              <h1 className="text-5xl md:text-6xl font-bold text-center text-white uppercase tracking-wider">RESOURCES</h1>
            </div>
          </div>
        </section>

        {/* Resources Grid Section */}
        <section 
          ref={ref}
          className="py-16 bg-teal-500"
        >
          <div className="container mx-auto px-6 md:px-12">            
            {/* Resource Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map(resource => (
                <a 
                  key={resource.id} 
                  href={resource.url} 
                  target={resource.type === 'external' ? '_blank' : undefined}
                  rel={resource.type === 'external' ? 'noopener noreferrer' : undefined}
                  className="transform transition-transform hover:scale-[1.01]"
                >
                  <ResourceCard resource={resource} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResourceCenter;