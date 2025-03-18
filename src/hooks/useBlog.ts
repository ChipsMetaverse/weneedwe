import { useState } from "react";
import { blogPosts as mockBlogPosts } from "@/components/mock-data";

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
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    // Return mock data instead of fetching from Supabase
    return mockBlogPosts;
  };

  const createBlogPost = async (post: BlogPostInput): Promise<BlogPost> => {
    setIsPending(true);
    
    try {
      // Create a new blog post with mock data
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: post.title,
        content: post.content,
        author: "Author Name",
        published_at: post.published_at || new Date().toISOString(),
      };
      
      // Add to local state
      setPosts(prev => [newPost, ...prev]);
      
      return newPost;
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