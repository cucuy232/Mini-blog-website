
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState("I love writing about technology and design.");
  const [previewImage, setPreviewImage] = useState<string | null>(user?.avatar || null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update form when user data changes (e.g., after login)
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreviewImage(user.avatar || null);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Use updateUser from AuthContext
    if (user) {
      updateUser({
        name,
        email,
        avatar: previewImage || undefined
      });
    }
    
    // Simulate API latency
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="mb-6">You need to be logged in to view your profile</p>
            <Link to="/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Profile</h1>
            
            <div className="flex flex-col md:flex-row gap-10">
              {/* Avatar section */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={previewImage || undefined} alt="Profile" />
                    <AvatarFallback className="text-2xl">{name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute bottom-0 right-0 bg-blog-primary text-white p-2 rounded-full cursor-pointer hover:bg-blog-secondary"
                  >
                    <Camera className="h-5 w-5" />
                  </label>
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Click the camera icon to upload a new profile image
                </p>
                
                <div className="mt-8 w-full">
                  <h3 className="text-lg font-medium mb-4 text-gray-800">Account Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blog-primary">12</div>
                      <div className="text-sm text-gray-500">Posts</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blog-primary">856</div>
                      <div className="text-sm text-gray-500">Reads</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blog-primary">124</div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-blog-primary">35</div>
                      <div className="text-sm text-gray-500">Comments</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile form */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blog-primary focus:border-blog-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blog-primary focus:border-blog-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blog-primary focus:border-blog-primary"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Brief description for your profile
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4 text-gray-800">Password</h3>
                      <Link to="/settings" className="text-blog-primary hover:text-blog-secondary">
                        Change your password
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4 text-gray-800">Preferences</h3>
                      <Link to="/settings" className="text-blog-primary hover:text-blog-secondary">
                        Manage notification preferences
                      </Link>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-blog-primary hover:bg-blog-secondary"
                        disabled={isLoading}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
