
import React from 'react';
import { cn } from '@/lib/utils';

interface GalleryHeaderProps {
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({ isVisible, ref }) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "text-center max-w-2xl mx-auto mb-12",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
    >
      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-secondary text-primary">
        Our Community
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Making a Difference Together
      </h2>
      <p className="text-muted-foreground text-lg text-balance">
        Explore our community initiatives, programs, and services supporting those who need it most.
      </p>
    </div>
  );
};

export default GalleryHeader;
