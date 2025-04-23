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
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Black Maternal Health Disparities",
    excerpt: "An exploration of the systemic issues contributing to maternal health disparities and steps toward change.",
    author: "Dr. Jasmine Roberts",
    date: "August 28, 2023",
    readTime: "8 min read",
    category: "health-education",
    image: "/placeholder.svg",
    featured: true
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
                Stories & Insights
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-red-800">She/Stories Blog</h1>
              <p className="text-xl text-red-700/80">
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
            {/* Featured Posts */}
            <div className="max-w-6xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Stories</h2>
              <div className="grid gap-8">
                {featuredPosts.slice(0, 2).map(post => (
                  <BlogPostCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>
            
            {/* All Blog Posts */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Explore All Stories</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search stories..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center flex-wrap gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Categories:</span>
                  <Badge 
                    variant={activeCategory === 'all' ? "default" : "outline"} 
                    className={activeCategory === 'all' ? "bg-red-600" : "cursor-pointer hover:bg-red-50"}
                    onClick={() => setActiveCategory('all')}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={activeCategory === 'personal-story' ? "default" : "outline"} 
                    className={activeCategory === 'personal-story' ? "bg-red-600" : "cursor-pointer hover:bg-red-50"}
                    onClick={() => setActiveCategory('personal-story')}
                  >
                    Personal Stories
                  </Badge>
                  <Badge 
                    variant={activeCategory === 'health-education' ? "default" : "outline"} 
                    className={activeCategory === 'health-education' ? "bg-red-600" : "cursor-pointer hover:bg-red-50"}
                    onClick={() => setActiveCategory('health-education')}
                  >
                    Health Education
                  </Badge>
                  <Badge 
                    variant={activeCategory === 'tips' ? "default" : "outline"} 
                    className={activeCategory === 'tips' ? "bg-red-600" : "cursor-pointer hover:bg-red-50"}
                    onClick={() => setActiveCategory('tips')}
                  >
                    Tips
                  </Badge>
                  <Badge 
                    variant={activeCategory === 'mental-health' ? "default" : "outline"} 
                    className={activeCategory === 'mental-health' ? "bg-red-600" : "cursor-pointer hover:bg-red-50"}
                    onClick={() => setActiveCategory('mental-health')}
                  >
                    Mental Health
                  </Badge>
                </div>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No stories found matching your search.</p>
                </div>
              )}
              
              {filteredPosts.length > 0 && (
                <div className="mt-12 text-center">
                  <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50">
                    Load More Stories
                  </Button>
                </div>
              )}
            </div>
            
            {/* Share Your Story */}
            <div className="max-w-4xl mx-auto mt-20">
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 border border-red-100 shadow-md">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-red-800 mb-4">Share Your Story</h2>
                  <p className="text-lg text-red-700/80 max-w-2xl mx-auto">
                    Your experience matters. Share your health journey, insights, or advocacy tips to inspire and help others in our community.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Submit Your Story
                  </Button>
                  <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Learn Submission Guidelines
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest stories, resources, and event updates.
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