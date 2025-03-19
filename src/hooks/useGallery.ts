
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
      
      // Actually fetch from database
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) {
        console.error('Error fetching gallery items:', error);
        throw error;
      }
      
      return data as GalleryItem[];
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
    
    const { data, error } = await supabase
      .from('gallery_items')
      .insert(item)
      .select()
      .single();
      
    if (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
    
    return data as GalleryItem;
  };

  // Update an existing gallery item
  const updateGalleryItem = async (id: number, item: Partial<GalleryItem>): Promise<GalleryItem> => {
    if (useLocalItems) {
      // Mock implementation for local development
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedItem = {
        ...defaultGalleryItems.find(i => i.id === id),
        ...item,
        id
      } as GalleryItem;
      console.log('Updated gallery item (local):', updatedItem);
      return updatedItem;
    }
    
    const { data, error } = await supabase
      .from('gallery_items')
      .update(item)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating gallery item:', error);
      throw error;
    }
    
    return data as GalleryItem;
  };

  // Delete a gallery item
  const deleteGalleryItem = async (id: number): Promise<void> => {
    if (useLocalItems) {
      // Mock implementation for local development
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Deleted gallery item (local):', id);
      return;
    }
    
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting gallery item:', error);
      throw error;
    }
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
    createGalleryItem: createMutation.mutate,
    updateGalleryItem: (id: number, item: Partial<GalleryItem>) => 
      updateMutation.mutate({ id, item }),
    deleteGalleryItem: deleteMutation.mutate,
  };
};
