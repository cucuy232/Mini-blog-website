
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Image, X, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { mockPosts } from "@/data/mockData";
import { currentUser } from "@/data/mockData";
import { Post } from '@/types/blog';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [excerpt, setExcerpt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load post data if editing
  useEffect(() => {
    if (isEditing) {
      const post = mockPosts.find(p => p.id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setTags([...post.tags]);
        setCoverImage(post.coverImage || null);
      } else {
        toast({
          title: "Error",
          description: "Post not found",
          variant: "destructive",
        });
        navigate('/my-posts');
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In real app, upload to storage
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // In a real app, we would send to API
    const now = new Date().toISOString();
    
    const newPost: Post = {
      id: isEditing ? id : `post-${Date.now()}`,
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + "...",
      coverImage,
      author: currentUser || {
        id: "user1",
        name: "Demo User",
        email: "user@example.com",
        avatar: "/placeholder.svg"
      },
      createdAt: isEditing ? (mockPosts.find(p => p.id === id)?.createdAt || now) : now,
      updatedAt: now,
      tags,
      likes: isEditing ? (mockPosts.find(p => p.id === id)?.likes || 0) : 0,
      dislikes: isEditing ? (mockPosts.find(p => p.id === id)?.dislikes || 0) : 0,
      readCount: isEditing ? (mockPosts.find(p => p.id === id)?.readCount || 0) : 0,
      comments: isEditing ? (mockPosts.find(p => p.id === id)?.comments || []) : []
    };

    // Actually update our mock data
    if (isEditing) {
      // Find the index of the post to update
      const index = mockPosts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockPosts[index] = newPost;
      }
    } else {
      // Add the new post to the mockPosts array
      mockPosts.unshift(newPost);
    }
    
    toast({
      title: isEditing ? "Post updated!" : "Post published!",
      description: isEditing 
        ? "Your post has been updated successfully" 
        : "Your post has been published successfully",
    });

    // After a brief delay, navigate to the post or my posts page
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/my-posts');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{isEditing ? "Edit Post" : "Create New Post"}</h1>
            <div className="flex space-x-2">
              <Link to="/my-posts">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button 
                className="bg-blog-primary hover:bg-blog-secondary"
                onClick={handlePublish}
                disabled={!title || !content || isSubmitting}
              >
                {isSubmitting ? "Publishing..." : isEditing ? "Update" : "Publish"}
              </Button>
            </div>
          </div>

          <Alert className="mb-6 bg-blog-accent/30 border-blog-primary">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Create a compelling blog post with a clear title, engaging content, and relevant tags to reach your audience.
            </AlertDescription>
          </Alert>

          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            {coverImage ? (
              <div className="relative rounded-lg overflow-hidden h-64">
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setCoverImage(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Image className="h-12 w-12 mx-auto text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-blog-primary hover:text-blog-secondary">
                      Upload a cover image
                    </span>
                    <input
                      id="cover-upload"
                      name="cover-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <span className="mt-1 block text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt (Short summary of your post)
            </label>
            <Textarea
              id="excerpt"
              placeholder="Write a brief summary of your post (optional)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] font-mono"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Supports markdown formatting. Use # for headings, * for lists, etc.
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex">
              <Input
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow"
              />
              <Button 
                onClick={handleAddTag}
                className="ml-2"
                variant="secondary"
                disabled={!tagInput.trim()}
              >
                Add
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Tags help categorize your post and make it more discoverable
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              className="bg-blog-primary hover:bg-blog-secondary"
              onClick={handlePublish}
              disabled={!title || !content || isSubmitting}
            >
              {isSubmitting ? "Publishing..." : isEditing ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewPost;
