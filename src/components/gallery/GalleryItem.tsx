
import React from 'react';
import { useImageLoading } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { GalleryItem as GalleryItemType } from './types';

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
  delay: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ 
  item, 
  onClick
}) => {
  const imageLoading = useImageLoading();
  
  return (
    <div 
      className={cn(
        "group cursor-pointer rounded-2xl overflow-hidden shadow-sm transition-all duration-300",
        "hover:shadow-md hover:translate-y-[-4px]"
      )}
      onClick={onClick}
      role="button"
      aria-label={`View ${item.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        {/* Static background instead of animated loading state */}
        <div className="absolute inset-0 bg-secondary"></div>
        
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "group-hover:scale-105",
            imageLoading.isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={imageLoading.handleLoad}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load image: ${item.imageUrl}`);
            // Use a fallback if needed
          }}
        />
        
        {/* Always visible gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300"></div>
        
        {/* Always show title and category, enhanced on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white">
            {item.category}
          </span>
          <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
          <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
