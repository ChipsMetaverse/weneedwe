
import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/utils/animations';
import { supabase } from '@/integrations/supabase/client';
import GalleryItem from './gallery/GalleryItem';
import LightboxModal from './gallery/LightboxModal';
import GalleryFilters from './gallery/GalleryFilters';
import GalleryHeader from './gallery/GalleryHeader';
import { GalleryItem as GalleryItemType } from './gallery/types';
import { galleryItems, allCategories } from './gallery/GalleryData';

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItemType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<GalleryItemType[]>(galleryItems);
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
      // setItems(data as unknown as GalleryItemType[]);
      
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
  
  const handleItemClick = (item: GalleryItemType, index: number) => {
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

  const renderGalleryContent = () => {
    if (isLoading && filteredItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
          <p className="text-muted-foreground">Loading gallery items...</p>
        </div>
      );
    } 
    
    if (filteredItems.length === 0) {
      return (
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
      );
    }
    
    return (
      <>
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

        {/* Load more button - would be implemented with pagination in a real app */}
        {filteredItems.length >= 8 && (
          <div className="mt-12 text-center">
            <button className="button-secondary">
              Load more
            </button>
          </div>
        )}
      </>
    );
  };
  
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <GalleryHeader ref={ref as React.RefObject<HTMLDivElement>} isVisible={isVisible} />

        <GalleryFilters 
          categories={allCategories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          isLoading={isLoading}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onRefresh={handleRefresh}
        />
        
        {renderGalleryContent()}
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
