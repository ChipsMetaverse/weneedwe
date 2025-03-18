
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlog } from '@/hooks/useBlog';
import { format, parseISO } from 'date-fns';
import { ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/utils/animations';
import { cn } from '@/lib/utils';

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
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  
  if (isLoading) {
    return (
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(limit)].map((_, index) => (
          <Card key={index} className="h-[320px] w-full animate-pulse bg-muted">
            <CardHeader className="h-24 bg-muted/50"></CardHeader>
            <CardContent className="h-24 bg-muted/30 mt-4"></CardContent>
            <CardFooter className="h-10 bg-muted/20 mt-4"></CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="h-5 w-5 mr-2" />
            Unable to Load Blog Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're having trouble loading the latest blog posts. Please try again later.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working on some exciting blog posts. Check back soon for updates!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div 
      ref={ref} 
      className={cn(
        "w-full transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Card 
            key={post.id} 
            className={cn(
              "flex flex-col h-full overflow-hidden hover:shadow-md transition-all duration-300 border-border/60 hover:border-primary/20",
              "transform hover:-translate-y-1"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
              {post.published_at && (
                <CardDescription className="text-xs text-muted-foreground/80 mt-2 flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary mr-2"></span>
                  {format(parseISO(post.published_at), 'MMMM d, yyyy')}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow pb-6">
              <div className="line-clamp-3 text-muted-foreground text-sm">
                {post.content.length > 180 
                  ? `${post.content.substring(0, 180)}...` 
                  : post.content}
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary hover:text-primary hover:bg-primary/5 -ml-2 px-2 group"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {showViewAll && posts.length >= limit && (
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="hover-lift px-6"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
