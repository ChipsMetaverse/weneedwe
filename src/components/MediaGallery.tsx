
import React, { useState, useEffect } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import MediaGalleryTabs from './gallery/MediaGalleryTabs';
import MediaGalleryGrid from './gallery/MediaGalleryGrid';
import MediaGalleryModal from './gallery/MediaGalleryModal';
import LoadingGallery from './gallery/LoadingGallery';

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
  const { media, getMediaByCategory, isLoading, error, refetch } = useMedia();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  // Create fallback images with working URLs if no media or if there's an error
  const generateFallbackMedia = (category: string) => {
    return Array(limit).fill(null).map((_, i) => ({
      id: `fallback-${category}-${i}`,
      url: `https://picsum.photos/seed/${category.toLowerCase()}-${i}/800/1200`,
      type: 'image',
      metadata: {
        title: `${category} Image ${i+1}`,
        description: `${category} event or activity`,
        category: category
      },
      created_at: new Date().toISOString(),
      uploaded_by: null
    }));
  };

  const fallbackMedia = generateFallbackMedia(activeCategory);

  // Log media data for debugging
  useEffect(() => {
    if (media) {
      console.log("Media data available:", media.length > 0);
      if (media.length > 0) {
        console.log("Sample media item:", media[0]);
      }
    }
  }, [media]);

  // Use actual media or fallback if empty
  const mediaToShow = media && media.length > 0 ? media : fallbackMedia;
  
  const filteredMedia = activeCategory === 'All'
    ? mediaToShow.slice(0, limit)
    : (() => {
        const categoryMedia = getMediaByCategory(activeCategory);
        return categoryMedia.length > 0 
          ? categoryMedia.slice(0, limit) 
          : generateFallbackMedia(activeCategory).slice(0, limit);
      })();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleMediaClick = (mediaUrl: string) => {
    if (mediaUrl) {
      setSelectedMedia(mediaUrl);
    }
  };

  if (error) {
    console.error("Media gallery error:", error);
    return (
      <div className="text-center py-12 bg-muted/30 rounded-xl">
        <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-medium">Unable to load media gallery</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingGallery categories={categories} limit={limit} />;
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "w-full transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <MediaGalleryTabs
        categories={categories}
        activeCategory={activeCategory}
        onValueChange={handleCategoryChange}
      >
        <MediaGalleryGrid
          filteredMedia={filteredMedia}
          isVisible={isVisible}
          limit={limit}
          activeCategory={activeCategory}
          showViewAll={showViewAll}
          onMediaClick={handleMediaClick}
          onCategoryChange={handleCategoryChange}
        />
      </MediaGalleryTabs>

      <MediaGalleryModal
        selectedMedia={selectedMedia}
        onOpenChange={(open) => !open && setSelectedMedia(null)}
        mediaItems={mediaToShow}
      />
    </div>
  );
};

export default MediaGallery;
