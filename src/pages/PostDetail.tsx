
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import { mockPosts } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const post = mockPosts.find(post => post.id === id);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The post you're looking for doesn't exist or may have been removed.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLike = () => {
    // Update the post's like count
    post.likes += 1;
    
    toast({
      title: "Post liked",
      description: "You've liked this post",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Post link copied to clipboard",
    });
  };

  // Format the post date
  const postDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Transform the mock comments data to match our CommentSection interface
  const formattedComments = post.comments.map(comment => ({
    id: comment.id,
    text: comment.content,
    authorName: comment.author.name,
    authorAvatar: comment.author.avatar,
    createdAt: new Date(comment.createdAt)
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Cover image */}
        {post.coverImage && (
          <div className="w-full h-64 sm:h-96 bg-cover bg-center" 
               style={{ backgroundImage: `url(${post.coverImage})` }}>
            <div className="w-full h-full bg-black bg-opacity-30 flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 text-white w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{post.title}</h1>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Post header (if no cover image) */}
          {!post.coverImage && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
          )}
          
          {/* Author and date */}
          <div className="flex items-center mb-8">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">{postDate} · {post.readCount} min read</p>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tag/${tag}`}>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Post content */}
          <div className="prose max-w-none lg:prose-lg mx-auto">
            <p className="text-lg text-gray-700">{post.content}</p>
          </div>
          
          {/* Action bar */}
          <div className="border-t border-b border-gray-200 py-6 my-8 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button onClick={handleLike} className="flex items-center space-x-2 text-gray-600 hover:text-red-500">
                <Heart className="h-6 w-6" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="h-6 w-6" />
                <span>{post.comments.length}</span>
              </button>
            </div>
            <button onClick={handleShare} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Share className="h-6 w-6" />
              <span>Share</span>
            </button>
          </div>
          
          {/* Author bio */}
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-gray-900">{post.author.name}</h3>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Writer and content creator passionate about technology and design.
            </p>
          </div>
          
          {/* Comments */}
          <CommentSection postId={post.id} initialComments={formattedComments} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;
