
import React, { useState, useEffect } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ImageIcon, RefreshCw } from 'lucide-react';
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

  // Create fallback images if no media or if there's an error
  const fallbackMedia = activeCategory === 'All'
    ? Array(limit).fill(null).map((_, i) => ({
        id: `fallback-${i}`,
        url: `https://source.unsplash.com/random/800x600?${activeCategory.toLowerCase()}&sig=${i}`,
        type: 'image',
        metadata: {
          title: 'Community Image',
          description: 'Community event or activity',
          category: activeCategory
        },
        created_at: new Date().toISOString(),
        uploaded_by: null
      }))
    : [];

  // Use actual media or fallback if empty
  const mediaToShow = media && media.length > 0 ? media : fallbackMedia;
  
  const filteredMedia = activeCategory === 'All'
    ? mediaToShow.slice(0, limit)
    : (getMediaByCategory(activeCategory).length > 0 
        ? getMediaByCategory(activeCategory).slice(0, limit) 
        : fallbackMedia.slice(0, limit));

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleMediaClick = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
  };

  // Preload images for smoother gallery experience
  useEffect(() => {
    filteredMedia.forEach(item => {
      if (item && item.url) {
        const img = new Image();
        img.src = item.url;
      }
    });
  }, [filteredMedia]);

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
        mediaItems={media}
      />
    </div>
  );
};

export default MediaGallery;
