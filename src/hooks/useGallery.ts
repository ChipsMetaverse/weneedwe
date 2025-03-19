
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GalleryItem } from '@/components/gallery/types';
import { galleryItems as defaultGalleryItems } from '@/components/gallery/GalleryData';

interface UseGalleryOptions {
  useLocalItems?: boolean;
}

export const useGallery = (options: UseGalleryOptions = {}) => {
  const { useLocalItems = true } = options;
  const queryClient = useQueryClient();
  
  // Fetch gallery items from the database or use local data
  const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
    try {
      // If using local items (useful for development without DB)
      if (useLocalItems) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return defaultGalleryItems;
      }
      
      // In a real implementation, this would fetch from the Supabase database
      // Since we don't have a gallery_items table configured in this project,
      // we'll return local items as fallback for now
      console.log('Would fetch from database if gallery_items table existed');
      return defaultGalleryItems;
    } catch (error) {
      console.error('Error in fetchGalleryItems:', error);
      // Fallback to local items if fetch fails
      return defaultGalleryItems;
    }
  };

  // Create a new gallery item
  const createGalleryItem = async (item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> => {
    if (useLocalItems) {
      // Mock implementation for local development
      await new Promise(resolve => setTimeout(resolve, 500));
      const newItem = {
        ...item,
        id: Math.max(0, ...defaultGalleryItems.map(item => item.id)) + 1
      };
      console.log('Created gallery item (local):', newItem);
      return newItem;
    }
    
    // In a real implementation, this would insert into the Supabase database
    console.log('Would create gallery item in database if table existed');
    const newItem = {
      ...item,
      id: Math.max(0, ...defaultGalleryItems.map(item => item.id)) + 1
    };
    return newItem;
  };

  // Update an existing gallery item
  const updateGalleryItem = async (id: number, item: Partial<GalleryItem>): Promise<GalleryItem> => {
    if (useLocalItems) {
      // Mock implementation for local development
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingItem = defaultGalleryItems.find(i => i.id === id);
      if (!existingItem) {
        throw new Error(`Gallery item with ID ${id} not found`);
      }
      const updatedItem = {
        ...existingItem,
        ...item,
        id
      } as GalleryItem;
      console.log('Updated gallery item (local):', updatedItem);
      return updatedItem;
    }
    
    // In a real implementation, this would update in the Supabase database
    console.log('Would update gallery item in database if table existed');
    const existingItem = defaultGalleryItems.find(i => i.id === id);
    if (!existingItem) {
      throw new Error(`Gallery item with ID ${id} not found`);
    }
    return {
      ...existingItem,
      ...item,
      id
    } as GalleryItem;
  };

  // Delete a gallery item
  const deleteGalleryItem = async (id: number): Promise<void> => {
    if (useLocalItems) {
      // Mock implementation for local development
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Deleted gallery item (local):', id);
      return;
    }
    
    // In a real implementation, this would delete from the Supabase database
    console.log('Would delete gallery item from database if table existed');
  };

  // Query and mutations with React Query
  const galleryQuery = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createMutation = useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => {
      toast.success('Gallery item created successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: () => {
      toast.error('Failed to create gallery item');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, item }: { id: number; item: Partial<GalleryItem> }) => 
      updateGalleryItem(id, item),
    onSuccess: () => {
      toast.success('Gallery item updated successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: () => {
      toast.error('Failed to update gallery item');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      toast.success('Gallery item deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: () => {
      toast.error('Failed to delete gallery item');
    }
  });

  return {
    galleryItems: galleryQuery.data || [],
    isLoading: galleryQuery.isLoading,
    isError: galleryQuery.isError,
    error: galleryQuery.error,
    refetch: galleryQuery.refetch,
    createGalleryItem: (item: Omit<GalleryItem, 'id'>) => createMutation.mutate(item),
    updateGalleryItem: (id: number, item: Partial<GalleryItem>) => 
      updateMutation.mutate({ id, item }),
    deleteGalleryItem: (id: number) => deleteMutation.mutate(id),
  };
};
