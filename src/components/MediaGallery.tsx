
import React, { useState, useEffect } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, ImageIcon, Search, RefreshCw } from 'lucide-react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';

interface MediaGalleryProps {
  limit?: number;
  categories?: string[];
  showViewAll?: boolean;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  limit = 6,
  categories = ['All', 'Events', 'Community', 'Projects'],
  showViewAll = true
}) => {
  const { media, getMediaByCategory, isLoading } = useMedia();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const filteredMedia = activeCategory === 'All'
    ? media.slice(0, limit)
    : getMediaByCategory(activeCategory).slice(0, limit);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleMediaClick = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
  };

  // Preload images for smoother gallery experience
  useEffect(() => {
    filteredMedia.forEach(item => {
      const img = new Image();
      img.src = item.url;
    });
  }, [filteredMedia]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-6 flex flex-wrap justify-center">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="px-4 py-2 text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(limit)].map((_, index) => (
              <Card key={index} className="animate-pulse bg-muted overflow-hidden border-0 shadow-md">
                <CardContent className="p-0">
                  <AspectRatio ratio={3/4} className="bg-secondary/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "w-full transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <Tabs 
        defaultValue="All" 
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="mb-6 flex flex-wrap justify-center">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="px-4 py-2 text-sm font-medium transition-all"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-2">
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-medium">No media available in this category</p>
              <Button variant="outline" className="mt-4">Browse all categories</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredMedia.map((item, index) => (
                <div 
                  key={item.id}
                  className={cn(
                    "transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border border-border/40 hover:border-primary/20"
                    onClick={() => handleMediaClick(item.url)}
                  >
                    <CardContent className="p-0 relative overflow-hidden group">
                      <AspectRatio ratio={3/4}>
                        <img
                          src={item.url}
                          alt={item.metadata?.title || "Gallery image"}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {item.metadata?.title && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <p className="text-white font-medium text-sm truncate">{item.metadata.title}</p>
                          </div>
                        )}
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
          
          {showViewAll && filteredMedia.length >= limit && (
            <div className="text-center mt-8">
              <Button variant="outline" className="hover-lift">
                View All {activeCategory} Media
              </Button>
            </div>
          )}
        </div>
      </Tabs>

      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          <DialogClose className="absolute right-4 top-4 z-10 bg-background/80 rounded-full p-2 hover:bg-background">
            <X className="h-4 w-4" />
          </DialogClose>
          {selectedMedia && (
            <img
              src={selectedMedia}
              alt="Selected media"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
          <div className="p-6">
            <DialogTitle className="text-xl">
              {media.find(item => item.url === selectedMedia)?.metadata?.title || "Media Item"}
            </DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">
              {media.find(item => item.url === selectedMedia)?.metadata?.description || ""}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;
