
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/hooks/useBlog';
import { format, parseISO } from 'date-fns';

interface BlogPostsProps {
  limit?: number;
  showViewAll?: boolean;
}

const BlogPosts: React.FC<BlogPostsProps> = ({ 
  limit = 3,
  showViewAll = true 
}) => {
  const { getRecentPosts, isLoading, error } = useBlog();
  const posts = getRecentPosts(limit);

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(limit)].map((_, index) => (
          <Card key={index} className="w-full animate-pulse bg-muted">
            <CardHeader className="h-24"></CardHeader>
            <CardContent className="h-24"></CardContent>
            <CardFooter className="h-10"></CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load blog posts. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are no blog posts available at this time. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              {post.published_at && (
                <CardDescription>
                  {format(parseISO(post.published_at), 'MMMM d, yyyy')}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="line-clamp-4">
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {showViewAll && posts.length >= limit && (
        <div className="text-center mt-6">
          <Button variant="outline">View All Posts</Button>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
