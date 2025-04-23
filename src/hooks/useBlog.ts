import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { blogPosts as localBlogPosts } from "@/data/siteData";

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
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetchBlogPosts()
      .then(data => setPosts(data))
      .catch(err => setError(err as Error))
      .finally(() => setIsLoading(false));
  }, []);

  const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
      // Attempt to fetch from Supabase
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error("Error fetching blog posts from Supabase:", error);
        console.log("Using local blog posts data instead");
        // Return local data if there's an error
        return localBlogPosts;
      }

      // Use local data if no data is returned
      if (!data || data.length === 0) {
        console.log("No blog posts found in Supabase. Using local data.");
        return localBlogPosts;
      }

      return data;
    } catch (err) {
      console.error("Error in fetchBlogPosts:", err);
      // Return local data as a fallback
      return localBlogPosts;
    }
  };

  const createBlogPost = async (post: BlogPostInput): Promise<BlogPost> => {
    setIsPending(true);
    
    try {
      const { data, error } = await supabase
        .from('blog')
        .insert({
          title: post.title,
          content: post.content,
          author: "User",
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
      
      // Add to local state
      setPosts(prev => [data, ...prev]);
      
      return data;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const getRecentPosts = (limit?: number) => {
    // Sort by published date, descending
    const sorted = [...posts].sort((a, b) => {
      if (!a.published_at || !b.published_at) return 0;
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });
    
    return limit ? sorted.slice(0, limit) : sorted;
  };

  return {
    posts,
    getRecentPosts,
    isLoading,
    error,
    createBlogPost,
    isPending,
  };
};