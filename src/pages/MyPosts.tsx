
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockPosts } from "@/data/mockData";
import { currentUser } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/blog";

const MyPosts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Filter posts to only include those authored by the current user
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Get posts by current user
    if (currentUser) {
      const filteredPosts = mockPosts.filter(post => post.author.id === currentUser.id);
      setUserPosts(filteredPosts);
    } else {
      // Redirect to login if no user
      navigate('/signin');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      // Find the index of the post to delete in the mockPosts array
      const index = mockPosts.findIndex(post => post.id === postToDelete);
      
      if (index !== -1) {
        // Remove the post from the mockPosts array
        mockPosts.splice(index, 1);
        
        // Update our local state
        setUserPosts(userPosts.filter(post => post.id !== postToDelete));
        
        toast({
          title: "Post deleted",
          description: "Your post has been successfully deleted",
        });
      }
      
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
            <Link to="/new-post">
              <Button className="bg-blog-primary hover:bg-blog-secondary">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          </div>
          
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
                  {post.coverImage && (
                    <div className="md:w-1/4">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <div className={`${post.coverImage ? 'md:w-3/4' : 'w-full'}`}>
                    <h2 className="text-xl font-semibold mb-2">
                      <Link to={`/post/${post.id}`} className="hover:text-blog-primary">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>Published on {new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readCount} reads</span>
                      <span className="mx-2">•</span>
                      <span>{post.likes} likes</span>
                      <span className="mx-2">•</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Link key={tag} to={`/tag/${tag}`}>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 text-sm rounded-md hover:bg-gray-200">
                            {tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/edit-post/${post.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(post.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                      <Link to={`/post/${post.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">You haven't published any posts yet</h2>
              <p className="text-gray-600 mb-8">Get started by creating your first blog post</p>
              <Link to="/new-post">
                <Button className="bg-blog-primary hover:bg-blog-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyPosts;
