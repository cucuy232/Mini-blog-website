
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { mockPosts } from '@/data/mockData';
import BlogPostCard from './BlogPostCard';

const FeaturedPosts: React.FC = () => {
  // For now, we'll just use the first post as featured
  const featuredPost = mockPosts[0];
  const recentPosts = mockPosts.slice(1, 3);

  return (
    <div className="mt-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Post</h2>
        <div className="w-20 h-1 bg-blog-primary rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Post - Takes 2 columns on larger screens */}
        <div className="lg:col-span-2">
          <Card className="blog-card h-full">
            <div className="h-80 relative overflow-hidden">
              <img 
                src={featuredPost.coverImage} 
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <Link to={`/post/${featuredPost.id}`}>
                  <h2 className="text-3xl font-bold mb-2 hover:text-blog-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      className="w-8 h-8 rounded-full mr-2 border border-white"
                    />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <Link 
                    to={`/post/${featuredPost.id}`}
                    className="flex items-center text-blog-accent hover:text-white transition-colors"
                  >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Posts - Right column (stacked) */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          {recentPosts.map(post => (
            <CardContent key={post.id} className="p-0">
              <div className="flex items-start space-x-4">
                <Link to={`/post/${post.id}`} className="block flex-shrink-0">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/post/${post.id}`}>
                    <h4 className="font-semibold line-clamp-2 hover:text-blog-primary transition-colors">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          ))}
          <Link 
            to="/explore" 
            className="inline-block text-blog-primary font-medium hover:text-blog-secondary transition-colors mt-2"
          >
            View all posts <ArrowRight className="inline h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
