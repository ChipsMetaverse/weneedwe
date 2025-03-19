
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MediaGalleryTabsProps {
  categories: string[];
  activeCategory: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const MediaGalleryTabs: React.FC<MediaGalleryTabsProps> = ({
  categories,
  activeCategory,
  onValueChange,
  children
}) => {
  return (
    <Tabs 
      defaultValue="All" 
      value={activeCategory}
      onValueChange={onValueChange}
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
        {children}
      </div>
    </Tabs>
  );
};

export default MediaGalleryTabs;
