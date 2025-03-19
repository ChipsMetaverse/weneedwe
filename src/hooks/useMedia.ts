
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Json } from "@/integrations/supabase/types";

export interface Media {
  id: string;
  url: string;
  type: string;
  metadata: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  } | null;
  created_at: string | null;
  uploaded_by: string | null;
}

export interface MediaInput {
  url: string;
  type: string;
  metadata?: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  };
}

export const useMedia = () => {
  const queryClient = useQueryClient();

  const fetchMedia = async (): Promise<Media[]> => {
    try {
      console.log("Fetching media data from Supabase...");
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching media:", error);
        throw error;
      }

      console.log("Media data fetched:", data);
      
      // Transform the data to ensure proper typing
      return (data || []).map(item => ({
        ...item,
        metadata: item.metadata as Media['metadata']
      }));
    } catch (error) {
      console.error("Error in fetchMedia function:", error);
      throw error;
    }
  };

  const createMedia = async (media: MediaInput): Promise<Media> => {
    try {
      const { data, error } = await supabase
        .from('media')
        .insert(media)
        .select()
        .single();

      if (error) {
        console.error("Error creating media:", error);
        toast.error("Failed to upload media");
        throw error;
      }

      // Transform to ensure proper typing
      return {
        ...data,
        metadata: data.metadata as Media['metadata']
      };
    } catch (error) {
      console.error("Error in createMedia function:", error);
      throw error;
    }
  };

  const mediaQuery = useQuery({
    queryKey: ['media'],
    queryFn: fetchMedia,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  const createMediaMutation = useMutation({
    mutationFn: createMedia,
    onSuccess: () => {
      toast.success("Media uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
    onError: (error) => {
      console.error("Error in createMedia mutation:", error);
      toast.error("Failed to upload media");
    }
  });

  const getMediaByCategory = (category?: string) => {
    if (!category || category === 'All') return mediaQuery.data || [];
    return (mediaQuery.data || []).filter(
      item => item.metadata?.category === category
    );
  };

  return {
    media: mediaQuery.data || [],
    getMediaByCategory,
    isLoading: mediaQuery.isLoading,
    error: mediaQuery.error,
    refetch: mediaQuery.refetch,
    createMedia: createMediaMutation.mutate,
    isPending: createMediaMutation.isPending,
  };
};
