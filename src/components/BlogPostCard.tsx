
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Post } from '@/types/blog';

interface BlogPostCardProps {
  post: Post;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <article className="blog-card bg-white rounded-lg shadow-md overflow-hidden">
      <div>
        {post.coverImage && (
          <Link to={`/post/${post.id}`} className="block overflow-hidden h-48">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            />
          </Link>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
              <Badge variant="secondary" className="hover:bg-blog-accent cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-blog-primary transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/user/${post.author.id}`} className="text-sm font-medium hover:text-blog-primary">
                {post.author.name}
              </Link>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-500 text-sm">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{post.dislikes}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {post.readCount} reads
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
