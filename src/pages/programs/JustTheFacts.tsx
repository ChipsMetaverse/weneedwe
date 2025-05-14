import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/utils/animations';
import { ExternalLink, FileText, Video, PlayCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const FactCard = ({ title, children, icon, className = "" }) => {
  return (
    <Card className={`overflow-hidden shadow-lg h-full ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0 mt-1">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceCard = ({ title, description, url, children = null, image, icon, isVideo = false }) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg h-full">
      {image && (
        <div className="relative aspect-video bg-gray-200">
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center cursor-pointer">
                <PlayCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-primary">{title}</h3>
        <p className="text-gray-700 mb-4 flex-1">{description}</p>
        {children || (
          <div className="mt-auto">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              {icon || <ExternalLink className="h-4 w-4" />}
              Learn More
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const JustTheFacts = () => {
  const { ref, isVisible: inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative bg-primary/5 py-16 md:py-24">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Info className="h-4 w-4 mr-2" />
                HIV Awareness
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Just The Facts</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Raising awareness about health disparities and inequities facing Black communities
              </p>
            </div>
          </div>
        </section>

        {/* HIV Statistics Section */}
        <section className="py-16 md:py-20 bg-cyan-500">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Racial Practices in Healthcare</h2>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary text-sm font-medium">
                  2 Talk...about it
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FactCard 
                  title="Did You Know?" 
                  icon={<Info className="h-5 w-5 text-primary" />}
                  className="bg-white"
                >
                  <p className="text-gray-700">
                    <strong>BLACK/AFRICAN AMERICANS PEOPLE ACCOUNT FOR A HIGHER PROPORTION OF NEW HIV DIAGNOSIS</strong> compared to other races and ethnicities.
                  </p>
                </FactCard>
                
                <FactCard 
                  title="Did You Know?" 
                  icon={<Info className="h-5 w-5 text-primary" />}
                  className="bg-white"
                >
                  <p className="text-gray-700">
                    <strong>BLACK/AFRICAN AMERICAN PEOPLE ACCOUNTED FOR 14% OF THE U.S. POPULATION, AND 46.1% OF THE 37,976 NEW HIV CASES</strong> in the U.S. are Black people.
                  </p>
                </FactCard>
              </div>
              
              <div className="mt-12 max-w-4xl mx-auto w-full">
                <div className="aspect-video relative">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <img 
                          src="/photos/jtf.jpeg" 
                          alt="Just The Facts Video Thumbnail" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                            <PlayCircle className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
                      <div className="aspect-video w-full">
                        <iframe 
                          width="560" 
                          height="315" 
                          src="https://www.youtube.com/embed/7p2Okx1skKo?si=kwXPycPECotrNYcH" 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen 
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resource Cards Section */}
        <section 
          ref={ref}
          className="py-16 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Resources & Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard
                  title="Click for List of Medical Topics"
                  description="Webinar series presented by Black women doctors/providers"
                  url="https://storage.googleapis.com/wzukusers/user-35433289/documents/42d13653934e4c43bbfe8b3a76b8714b/CISGENDER_WEBINAR_TOOLKIT_BYDATE_323.docx"
                  image="/photos/medicaltopics.gif"
                  icon={<FileText className="h-4 w-4" />}
                />
                
                <ResourceCard
                  title="Click for Just The Facts"
                  description="HIV AND BLACK WOMEN"
                  url="/just-the-facts"
                  image="/photos/jtfgroup.jpeg"
                  icon={<Info className="h-4 w-4" />}
                />
                
                <ResourceCard
                  title="Click for U = U Video"
                  description="Undetectable = Untransmittable"
                  url="https://www.youtube.com/watch?v=keG71hZuuIo"
                  image="/photos/uvideo.jpeg"
                  icon={<Video className="h-4 w-4" />}
                  isVideo={true}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-primary/5 py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Learn More About the Plan</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stay informed about our initiatives and how you can get involved.
              </p>
              <div className="flex justify-center">
                <a href="https://gtzillinois.hiv/the-plan/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="font-medium">
                    Click on the Plan
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JustTheFacts;
