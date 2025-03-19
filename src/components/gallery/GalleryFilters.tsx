
import React from 'react';
import { cn } from '@/lib/utils';
import { Search, RefreshCw } from 'lucide-react';

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  isLoading: boolean;
  onCategoryChange: (category: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  categories,
  activeCategory,
  searchQuery,
  isLoading,
  onCategoryChange,
  onSearchChange,
  onRefresh
}) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
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
          onChange={onSearchChange}
          className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        {isLoading ? (
          <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
        ) : (
          <button 
            onClick={onRefresh}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            aria-label="Refresh gallery"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryFilters;
