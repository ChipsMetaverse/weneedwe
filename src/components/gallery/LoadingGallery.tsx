
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface LoadingGalleryProps {
  categories: string[];
  limit: number;
}

const LoadingGallery: React.FC<LoadingGalleryProps> = ({ categories, limit }) => {
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
};

export default LoadingGallery;
