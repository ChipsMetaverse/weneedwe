
import React from 'react';
import { useImageLoading } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { GalleryItem as GalleryItemType } from './types';

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
  delay?: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ 
  item, 
  onClick,
  delay = 0
}) => {
  const imageLoading = useImageLoading();
  
  // Extract style properties from item if they exist
  const {
    animation = 'fade', // 'fade', 'scale', 'slide', 'none'
    hoverEffect = 'zoom', // 'zoom', 'lift', 'glow', 'none'
    textPosition = 'bottom', // 'bottom', 'center', 'overlay'
    aspectRatio = '3/4', // '1/1', '16/9', '3/4', '4/3'
    cornerRadius = 'rounded-2xl', // 'rounded-none', 'rounded-lg', 'rounded-2xl', 'rounded-full'
    shadowSize = 'shadow-sm', // 'shadow-none', 'shadow-sm', 'shadow-md', 'shadow-lg'
    gradientOpacity = '50', // '0', '25', '50', '75', '100'
    textTheme = 'light', // 'light', 'dark'
    ...restItem
  } = item;
  
  // Animation class based on item configuration
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade':
        return 'transition-opacity duration-700 animate-fade-in';
      case 'scale':
        return 'transition-all duration-700 animate-scale-in';
      case 'slide':
        return 'transition-all duration-700 animate-fade-in-up';
      case 'none':
      default:
        return '';
    }
  };
  
  // Hover effect class based on item configuration
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'group-hover:scale-105';
      case 'lift':
        return 'group-hover:translate-y-[-8px]';
      case 'glow':
        return 'group-hover:shadow-xl group-hover:shadow-primary/20';
      case 'none':
      default:
        return '';
    }
  };
  
  // Get text position classes
  const getTextPositionClass = () => {
    switch (textPosition) {
      case 'center':
        return 'items-center justify-center text-center';
      case 'overlay':
        return 'items-center justify-center text-center bg-black/30';
      case 'bottom':
      default:
        return 'items-start justify-end';
    }
  };
  
  // Get aspect ratio style
  const getAspectRatioStyle = () => {
    return { aspectRatio };
  };
  
  // Get gradient opacity
  const getGradientClass = () => {
    if (textPosition === 'overlay') return '';
    const opacity = gradientOpacity === '0' ? '0' : gradientOpacity;
    return `from-black/${opacity} to-transparent`;
  };
  
  // Get text color based on theme
  const getTextColorClass = () => {
    return textTheme === 'light' ? 'text-white' : 'text-foreground';
  };
  
  return (
    <div 
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300",
        cornerRadius,
        shadowSize,
        "hover:shadow-md",
        getAnimationClass(),
      )}
      style={{ 
        animationDelay: `${delay * 100}ms`,
      }}
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
      <div 
        className="relative overflow-hidden"
        style={getAspectRatioStyle()}
      >
        {/* Background color while image loads */}
        <div className="absolute inset-0 bg-secondary/30"></div>
        
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            getHoverEffectClass(),
            imageLoading.isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={imageLoading.handleLoad}
          onError={(e) => {
            console.error(`Failed to load image: ${item.imageUrl}`);
            // Use a fallback if needed
          }}
        />
        
        {/* Only show gradient at the bottom for text readability */}
        {textPosition !== 'overlay' && (
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t",
              getGradientClass()
            )}
          ></div>
        )}
        
        {/* Title and description container */}
        <div 
          className={cn(
            "absolute inset-0 flex flex-col p-6 transition-all duration-300",
            getTextPositionClass()
          )}
        >
          <div className="transform transition-all duration-300 w-full">
            <span className={cn(
              "inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full",
              "bg-white/20 backdrop-blur-sm",
              getTextColorClass()
            )}>
              {item.category}
            </span>
            <h3 className={cn(
              "text-lg font-medium mb-1",
              getTextColorClass()
            )}>
              {item.title}
            </h3>
            <p className={cn(
              "text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              textTheme === 'light' ? 'text-white/80' : 'text-foreground/80'
            )}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
