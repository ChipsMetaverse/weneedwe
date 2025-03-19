
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
  if (!filteredMedia || filteredMedia.length === 0) {
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
        {filteredMedia.map((item, index) => {
          // Only render if item has a valid URL
          if (!item || !item.url) return null;
          
          return (
            <MediaGalleryItem
              key={item?.id || `media-${index}`}
              item={item}
              index={index}
              isVisible={isVisible}
              onClick={onMediaClick}
            />
          );
        })}
      </div>
      
      {showViewAll && filteredMedia.length >= limit && (
        <div className="text-center mt-8">
          <Button variant="outline" className="hover-lift">
            View All {activeCategory} Media
          </Button>
        </div>
      )}
    </>
  );
};

export default MediaGalleryGrid;
