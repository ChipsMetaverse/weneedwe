import React, { useState, useRef } from 'react';
import { useIntersectionObserver, useImageLoading } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Sample gallery items - in a real application, these would come from your data source
const galleryItems = [
  {
    id: 1,
    title: 'Minimalist Living Room',
    description: 'Clean lines and open space create a sense of calm.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?interior,minimal,white',
    category: 'Interior'
  },
  {
    id: 2,
    title: 'Product Experience',
    description: 'Thoughtful details enhance everyday objects.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?product,minimal,design',
    category: 'Product'
  },
  {
    id: 3,
    title: 'Workspace Harmony',
    description: 'A balanced environment for maximum creativity.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?workspace,minimal,white',
    category: 'Workspace'
  },
  {
    id: 4,
    title: 'Digital Experience',
    description: 'Interfaces that feel natural and intuitive.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?interface,minimal,app',
    category: 'Digital'
  },
  {
    id: 5,
    title: 'Architectural Beauty',
    description: 'Structure and form in perfect balance.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?architecture,minimal,white',
    category: 'Architecture'
  },
  {
    id: 6,
    title: 'Material Study',
    description: 'The beauty of natural textures and surfaces.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?material,texture,minimal',
    category: 'Materials'
  }
];

const GalleryItem = ({ 
  item, 
  onClick, 
  delay 
}: { 
  item: typeof galleryItems[0], 
  onClick: () => void,
  delay: number
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const imageLoading = useImageLoading();
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "group cursor-pointer rounded-2xl overflow-hidden shadow-sm transition-all duration-300",
        "hover:shadow-md hover:translate-y-[-4px]",
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      )}
      style={{ animationDelay: `${0.2 + delay * 0.1}s` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        {/* Loading state */}
        <div className="absolute inset-0 bg-secondary animate-pulse"></div>
        
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            "group-hover:scale-105",
            imageLoading.isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={imageLoading.handleLoad}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white">
            {item.category}
          </span>
          <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
          <p className="text-sm text-white/80">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const LightboxModal = ({ 
  item, 
  onClose, 
  onPrev, 
  onNext, 
  hasPrev, 
  hasNext 
}: { 
  item: typeof galleryItems[0], 
  onClose: () => void,
  onPrev: () => void,
  onNext: () => void,
  hasPrev: boolean,
  hasNext: boolean
}) => {
  // Close the modal when pressing Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);
  
  // Prevent body scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in">
      <button 
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 glass-dark">
          <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
          <p className="text-white/80">{item.description}</p>
        </div>
      </div>
      
      {hasPrev && (
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onPrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {hasNext && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onNext}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  const handleItemClick = (item: typeof galleryItems[0], index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };
  
  const handleClose = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
  };
  
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedItem(galleryItems[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (selectedIndex < galleryItems.length - 1) {
      setSelectedItem(galleryItems[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  };
  
  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16",
            isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          )}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-secondary text-primary">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Showcasing Perfection
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            A collection of our finest work demonstrating our commitment to excellence 
            and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <GalleryItem 
              key={item.id} 
              item={item}
              delay={index}
              onClick={() => handleItemClick(item, index)}
            />
          ))}
        </div>
      </div>
      
      {selectedItem && (
        <LightboxModal 
          item={selectedItem}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < galleryItems.length - 1}
        />
      )}
    </section>
  );
};

export default Gallery;
