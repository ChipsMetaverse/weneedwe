
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching media:", error);
      toast.error("Failed to load media gallery");
      throw error;
    }

    return data || [];
  };

  const createMedia = async (media: MediaInput): Promise<Media> => {
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

    toast.success("Media uploaded successfully!");
    return data;
  };

  const mediaQuery = useQuery({
    queryKey: ['media'],
    queryFn: fetchMedia,
  });

  const createMediaMutation = useMutation({
    mutationFn: createMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });

  const getMediaByCategory = (category?: string) => {
    if (!category) return mediaQuery.data || [];
    return (mediaQuery.data || []).filter(
      item => item.metadata?.category === category
    );
  };

  return {
    media: mediaQuery.data || [],
    getMediaByCategory,
    isLoading: mediaQuery.isLoading,
    error: mediaQuery.error,
    createMedia: createMediaMutation.mutate,
    isPending: createMediaMutation.isPending,
  };
};
