
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface MediaItemProps {
  item: {
    id?: string;
    url?: string;
    type?: string;
    metadata?: {
      title?: string;
      category?: string;
    };
  } | null;
  index: number;
  isVisible: boolean;
  onClick: (url: string) => void;
}

const MediaGalleryItem: React.FC<MediaItemProps> = ({ 
  item, 
  index, 
  isVisible,
  onClick 
}) => {
  if (!item || !item.url) return null;
  
  // Use a valid placeholder image in case the main image fails to load
  const placeholderImage = "/placeholder.svg";
  const imageUrl = item.url && item.url !== "null" ? item.url : placeholderImage;
  
  return (
    <div 
      className={cn(
        "transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card 
        className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border border-border/40 hover:border-primary/20"
        onClick={() => onClick(imageUrl)}
      >
        <CardContent className="p-0 relative overflow-hidden group">
          <AspectRatio ratio={3/4}>
            <div className="w-full h-full bg-muted/50"></div>
            <img
              src={imageUrl}
              alt={item.metadata?.title || "Gallery image"}
              className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback for image loading errors
                const target = e.target as HTMLImageElement;
                target.src = placeholderImage;
                console.log("Image failed to load, using placeholder:", item.url);
              }}
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
  );
};

export default MediaGalleryItem;
