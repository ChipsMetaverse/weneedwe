
import React, { useState } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface MediaGalleryProps {
  limit?: number;
  categories?: string[];
  showViewAll?: boolean;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  limit = 12,
  categories = ['All', 'Events', 'Community', 'Projects'],
  showViewAll = true
}) => {
  const { media, getMediaByCategory, isLoading } = useMedia();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const filteredMedia = activeCategory === 'All'
    ? media.slice(0, limit)
    : getMediaByCategory(activeCategory).slice(0, limit);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleMediaClick = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(limit)].map((_, index) => (
              <Card key={index} className="animate-pulse bg-muted">
                <CardContent className="p-0">
                  <AspectRatio ratio={4/3} className="bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs 
        defaultValue="All" 
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent 
            key={category} 
            value={category}
            className="mt-0"
          >
            {filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No media available in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => handleMediaClick(item.url)}
                  >
                    <CardContent className="p-0">
                      <AspectRatio ratio={4/3}>
                        <img
                          src={item.url}
                          alt={item.metadata?.title || "Gallery image"}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {showViewAll && filteredMedia.length >= limit && (
              <div className="text-center mt-8">
                <Button variant="outline">View All {category} Media</Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogClose className="absolute right-4 top-4 z-10 bg-background/80 rounded-full p-1">
            <X className="h-4 w-4" />
          </DialogClose>
          {selectedMedia && (
            <img
              src={selectedMedia}
              alt="Selected media"
              className="w-full h-auto"
            />
          )}
          <div className="p-6">
            <DialogTitle>
              {media.find(item => item.url === selectedMedia)?.metadata?.title || "Media Item"}
            </DialogTitle>
            <DialogDescription>
              {media.find(item => item.url === selectedMedia)?.metadata?.description || ""}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;
