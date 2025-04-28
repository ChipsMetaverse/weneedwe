import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { ArrowRight, CalendarDays, Clock, Search, Filter, User } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "My Journey to Health Advocacy",
    excerpt: "A personal story of how I found my voice in healthcare settings and became an advocate for myself and others.",
    author: "Tasha Williams",
    date: "September 10, 2023",
    readTime: "5 min read",
    category: "personal-story",
    image: "/images/ForBlackWomenandHIVarticle.jpg",
    featured: true
  },
  {
    id: 2,
    title: "PrEP 4 Women",
    excerpt: "This page is fully devoted to HIV prevention and provides the assurance that HIV is controllable. Specially devoted to Black women diagnosed with HIV who remain strong and stand for themselves.",
    author: "Dr. Maya Johnson",
    date: "October 15, 2023",
    readTime: "7 min read",
    category: "health-education",
    image: "/images/PrEP 4 Women.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Black Women and HIV",
    excerpt: "Understanding the specific challenges and disparities facing Black women in HIV prevention, treatment, and care.",
    author: "Michelle Davis",
    date: "November 5, 2023",
    readTime: "6 min read",
    category: "health-education",
    image: "/images/BlackWomenandHivArticle.jpg",
    featured: true
  },
  {
    id: 4,
    title: "Self-Advocacy Tips for Medical Appointments",
    excerpt: "Practical strategies for effectively communicating with healthcare providers and ensuring your concerns are addressed.",
    author: "Michelle Johnson",
    date: "August 15, 2023",
    readTime: "6 min read",
    category: "tips",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 5,
    title: "Finding Community in Health Challenges",
    excerpt: "How connecting with others facing similar health issues can provide support, resources, and empowerment.",
    author: "Keisha Thomas",
    date: "July 22, 2023",
    readTime: "4 min read",
    category: "community",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 6,
    title: "Mental Health Self-Care Practices",
    excerpt: "Essential self-care practices for maintaining mental wellbeing, especially during health challenges.",
    author: "Dr. Nicole Harris",
    date: "July 10, 2023",
    readTime: "7 min read",
    category: "mental-health",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 7,
    title: "Navigating Insurance Denials",
    excerpt: "A step-by-step guide to understanding and appealing insurance claim denials.",
    author: "Patricia Davis",
    date: "June 28, 2023",
    readTime: "9 min read",
    category: "tips",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 8,
    title: "My Experience as a BW-SELF Program Participant",
    excerpt: "A reflection on participating in the BW-SELF program and how it changed my approach to healthcare.",
    author: "Danielle Robinson",
    date: "June 15, 2023",
    readTime: "5 min read",
    category: "personal-story",
    image: "/placeholder.svg",
    featured: false
  },
  {
    id: 9,
    title: "Advocating for a Family Member",
    excerpt: "Strategies and insights for effectively advocating for the healthcare needs of a loved one.",
    author: "Angela Turner",
    date: "May 30, 2023",
    readTime: "6 min read",
    category: "family",
    image: "/placeholder.svg",
    featured: false
  }
];

const BlogPostCard = ({ post, featured = false }) => {
  return featured ? (
    <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-full min-h-[280px] relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
          Featured
        </div>
      </div>
      <div className="p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {post.category}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{post.title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-100 p-1 rounded-full">
              <User className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <CalendarDays className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full bg-red-600 hover:bg-red-700">
            Read Full Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {post.category}
          </Badge>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
        <CardDescription className="mt-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-100 p-1 rounded-full">
              <User className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-red-600 hover:bg-red-700">
          Read Full Story
        </Button>
      </CardFooter>
    </Card>
  );
};

const Blog = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : blogPosts.filter(post => 
        post.category === activeCategory && 
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
         post.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 overflow-hidden"
          style={{
            backgroundImage: "url('/images/OurPowerOurVoiceOurControl.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Stories & Insights
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">SheStories Blog</h1>
              <p className="text-xl text-white">
                Personal stories, insights, and educational content by and for Black women navigating health and wellness.
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
            {/* OUR POWER, OUR VOICE, OUR CONTROL! Banner */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
              <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="text-3xl font-bold">
                  <span className="text-black">OUR POWER, </span>
                  <span className="text-green-600">OUR VOICE, </span>
                  <span className="text-red-600">OUR CONTROL!</span>
                </h2>
              </div>
            </div>
            
            {/* PrEP 4 Women Featured Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <Card className="overflow-hidden">
                <div className="bg-cyan-400 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="order-2 md:order-1 flex flex-col items-start justify-center text-left">
                      <CardDescription className="text-black text-lg font-medium mb-5">
                        The PrEP In Black America Coalition addresses systemic barriers preventing Black communities from accessing HIV prevention tools. Through summits, webinars, and advocacy, we're working to make PrEP accessible to all who need it.
                      </CardDescription>
                      <div className="mt-3">
                        <a href="https://prep4all.org/prepinblackamerica" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-lg">
                            Learn More About PrEP
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <img 
                        src="/images/PrEP4Women.jpeg" 
                        alt="PrEP 4 Women" 
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Featured Videos */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src="/images/BlackWomenandHivArticle.jpg" 
                      alt="Black Women and HIV"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center cursor-pointer">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Black Women and HIV</h3>
                    <p className="text-gray-700 mb-4">Understanding the specific challenges and disparities facing Black women in HIV prevention, treatment, and care.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        6 min
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src="/images/ribbon.jpeg" 
                      alt="HIV Awareness Ribbon"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Linkage to HIV Medical Plan</h3>
                    <p className="text-gray-700 mb-4">
                      Linkage to care is the first step in engaging in HIV care and is typically defined as the completion of a first medical clinic visit within 30 days after an HIV diagnosis.
                    </p>
                    <p className="text-gray-700 mb-4">
                      For persons newly diagnosed with HIV, ensuring rapid linkage to care and starting antiretroviral therapy, ideally within 7 days, is a key pillar of the national initiative, Ending the HIV Epidemic: A Plan for America.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        7 min read
                      </span>
                    </div>
                    <a 
                      href="/blog/linkage-to-hiv-medical-plan" 
                      className="inline-block"
                    >
                      <Button className="bg-red-600 hover:bg-red-700">
                        Read Full Article
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* YouTube Video Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">COVID-19 Death Rate among Blacks</h2>
              <div className="aspect-video w-full">
                <iframe 
                  src="https://www.youtube.com/embed/_qo02qR-cNQ" 
                  title="Black Women and HIV" 
                  className="w-full h-full rounded-lg shadow-lg"
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest stories, videos, and resource updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="max-w-md"
                />
                <Button className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;