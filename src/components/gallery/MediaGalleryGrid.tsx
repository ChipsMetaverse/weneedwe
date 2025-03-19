
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import MediaGalleryItem from './MediaGalleryItem';

interface MediaGalleryGridProps {
  filteredMedia: Array<any>;
  isVisible: boolean;
  limit: number;
  activeCategory: string;
  showViewAll: boolean;
  onMediaClick: (url: string) => void;
  onCategoryChange: (category: string) => void;
}

const MediaGalleryGrid: React.FC<MediaGalleryGridProps> = ({
  filteredMedia,
  isVisible,
  limit,
  activeCategory,
  showViewAll,
  onMediaClick,
  onCategoryChange
}) => {
  // Validate all media items have valid structure
  const validMedia = filteredMedia?.filter(item => item && typeof item === 'object') || [];
  
  if (!validMedia || validMedia.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-medium">No media available in this category</p>
        <Button variant="outline" className="mt-4" onClick={() => onCategoryChange('All')}>
          Browse all categories
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {validMedia.map((item, index) => (
          <MediaGalleryItem
            key={item?.id || `media-${index}`}
            item={item}
            index={index}
            isVisible={isVisible}
            onClick={onMediaClick}
          />
        ))}
      </div>
      
      {showViewAll && validMedia.length >= limit && (
        <div className="text-center mt-8">
          <Button variant="outline" className="hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            View All {activeCategory} Media
          </Button>
        </div>
      )}
    </>
  );
};

export default MediaGalleryGrid;
