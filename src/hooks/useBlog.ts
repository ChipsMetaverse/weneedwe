
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string | null;
  published_at: string | null;
}

export interface BlogPostInput {
  title: string;
  content: string;
  published_at?: string;
}

export const useBlog = () => {
  const queryClient = useQueryClient();

  const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      toast.error("Failed to load blog posts");
      throw error;
    }

    return data || [];
  };

  const createBlogPost = async (post: BlogPostInput): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blog')
      .insert({
        ...post,
        published_at: post.published_at || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post");
      throw error;
    }

    toast.success("Blog post created successfully!");
    return data;
  };

  const blogQuery = useQuery({
    queryKey: ['blog'],
    queryFn: fetchBlogPosts,
  });

  const createBlogPostMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
  });

  const getRecentPosts = (limit?: number) => {
    const posts = blogQuery.data || [];
    return limit ? posts.slice(0, limit) : posts;
  };

  return {
    posts: blogQuery.data || [],
    getRecentPosts,
    isLoading: blogQuery.isLoading,
    error: blogQuery.error,
    createBlogPost: createBlogPostMutation.mutate,
    isPending: createBlogPostMutation.isPending,
  };
};
