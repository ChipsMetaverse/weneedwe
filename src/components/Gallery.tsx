import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver, useImageLoading } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X, Search, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Gallery item types
interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
}

// Sample gallery items - would be replaced with data from Supabase in production
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Community Food Drive',
    description: 'Providing meals to families in need throughout the community.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?community,food,drive',
    category: 'Events',
    date: '2024-05-12'
  },
  {
    id: 2,
    title: 'Youth Education Program',
    description: 'Supporting the educational development of underserved youth.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?education,youth,classroom',
    category: 'Programs',
    date: '2024-04-28'
  },
  {
    id: 3,
    title: 'Senior Community Support',
    description: 'Providing companionship and assistance to elderly community members.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?elderly,community,support',
    category: 'Services',
    date: '2024-06-03'
  },
  {
    id: 4,
    title: 'Healthcare Outreach',
    description: 'Making healthcare accessible to all community members.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?healthcare,community,clinic',
    category: 'Services',
    date: '2024-05-22'
  },
  {
    id: 5,
    title: 'Neighborhood Cleanup',
    description: 'Volunteers working together to improve local neighborhoods.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?community,cleanup,volunteer',
    category: 'Events',
    date: '2024-03-15'
  },
  {
    id: 6,
    title: 'Affordable Housing Initiative',
    description: 'Working to provide safe, affordable housing opportunities.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?housing,community,building',
    category: 'Programs',
    date: '2024-06-12'
  },
  {
    id: 7,
    title: 'Mental Health Workshop',
    description: 'Breaking stigmas and providing resources for mental wellbeing.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?mental,health,workshop',
    category: 'Events',
    date: '2024-05-18'
  },
  {
    id: 8,
    title: 'Family Support Services',
    description: 'Comprehensive resources for families in challenging situations.',
    imageUrl: 'https://source.unsplash.com/random/600x800/?family,support,community',
    category: 'Services',
    date: '2024-04-05'
  }
];

// Extract unique categories for filtering
const allCategories = ['All', ...new Set(galleryItems.map(item => item.category))];

const GalleryItem = ({ 
  item, 
  onClick, 
  delay 
}: { 
  item: GalleryItem, 
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
  item: GalleryItem, 
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} image`}
    >
      <button 
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
        aria-label="Close gallery modal"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white">
                {item.category}
              </span>
              <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </div>
            {item.date && (
              <span className="text-sm text-white/60">{new Date(item.date).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
      
      {hasPrev && (
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {hasNext && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  // Filter gallery items based on category and search query
  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // In a real app, we would fetch data from Supabase
  // This is a mock implementation showing how we would do it
  const fetchGalleryItems = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, we would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('media')
      //   .select('*')
      //   .eq('type', 'gallery')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // setItems(data as unknown as GalleryItem[]);
      
      // For this mock, we'll simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setItems(galleryItems);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);
  
  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };
  
  const handleClose = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
  };
  
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedItem(filteredItems[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (selectedIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    fetchGalleryItems();
  };
  
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
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

        {/* Filters and search */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/80"
                )}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto min-w-[240px]">
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            {isLoading ? (
              <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
            ) : (
              <button 
                onClick={handleRefresh}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Refresh gallery"
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            )}
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading && filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
            <p className="text-muted-foreground">Loading gallery items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl font-medium mb-2">No results found</p>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="button-secondary"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <GalleryItem 
                key={item.id} 
                item={item}
                delay={index}
                onClick={() => handleItemClick(item, index)}
              />
            ))}
          </div>
        )}

        {/* Load more button - would be implemented with pagination in a real app */}
        {filteredItems.length >= 8 && (
          <div className="mt-12 text-center">
            <button className="button-secondary">
              Load more
            </button>
          </div>
        )}
      </div>
      
      {selectedItem && (
        <LightboxModal 
          item={selectedItem}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filteredItems.length - 1}
        />
      )}
    </section>
  );
};

export default Gallery;
