
import { useState } from "react";
import { Bell, Key, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'security'>('account');
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [emailNotifications, setEmailNotifications] = useState({
    comments: true,
    likes: true,
    follows: true,
    mentions: true,
    newsletter: true,
  });

  const handleNotificationToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg">
            <div className="md:grid md:grid-cols-4">
              {/* Sidebar */}
              <aside className="md:col-span-1 p-6 border-r border-gray-200">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Settings</h2>
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                      activeTab === 'account' 
                        ? 'bg-blog-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Account</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                      activeTab === 'notifications' 
                        ? 'bg-blog-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                      activeTab === 'security' 
                        ? 'bg-blog-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Key className="mr-3 h-5 w-5" />
                    <span>Security</span>
                  </button>
                </nav>
              </aside>
              
              {/* Content area */}
              <div className="md:col-span-3 p-6">
                {activeTab === 'account' && (
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-6">Account Settings</h3>
                    <p className="mb-4 text-gray-600">
                      Manage your account information and profile details
                    </p>
                    
                    <Button 
                      onClick={() => window.location.href = "/profile"} 
                      className="mt-2"
                    >
                      Go to Profile Page
                    </Button>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-6">Notification Preferences</h3>
                    <p className="mb-4 text-gray-600">
                      Control which notifications you receive by email
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start">
                        <input
                          id="comments"
                          type="checkbox"
                          className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                          checked={emailNotifications.comments}
                          onChange={() => handleNotificationToggle('comments')}
                        />
                        <label htmlFor="comments" className="ml-3 text-sm">
                          <span className="text-gray-700">Email me when someone comments on my post</span>
                        </label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="likes"
                          type="checkbox"
                          className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                          checked={emailNotifications.likes}
                          onChange={() => handleNotificationToggle('likes')}
                        />
                        <label htmlFor="likes" className="ml-3 text-sm">
                          <span className="text-gray-700">Email me when someone likes my post</span>
                        </label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="follows"
                          type="checkbox"
                          className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                          checked={emailNotifications.follows}
                          onChange={() => handleNotificationToggle('follows')}
                        />
                        <label htmlFor="follows" className="ml-3 text-sm">
                          <span className="text-gray-700">Email me when someone follows me</span>
                        </label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="mentions"
                          type="checkbox"
                          className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                          checked={emailNotifications.mentions}
                          onChange={() => handleNotificationToggle('mentions')}
                        />
                        <label htmlFor="mentions" className="ml-3 text-sm">
                          <span className="text-gray-700">Email me when someone mentions me</span>
                        </label>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="h-4 w-4 text-blog-primary focus:ring-blog-primary border-gray-300 rounded"
                          checked={emailNotifications.newsletter}
                          onChange={() => handleNotificationToggle('newsletter')}
                        />
                        <label htmlFor="newsletter" className="ml-3 text-sm">
                          <span className="text-gray-700">Subscribe to newsletter</span>
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSaveNotifications}
                      className="mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-6">Security Settings</h3>
                    <p className="mb-4 text-gray-600">
                      Manage your password and security preferences
                    </p>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-lg font-medium mb-2">Change Password</h4>
                      <p className="mb-4 text-sm text-gray-600">
                        Update your password to keep your account secure
                      </p>
                      <Button>Change Password</Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-lg font-medium mb-2">Two-Factor Authentication</h4>
                      <p className="mb-4 text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline">Setup Two-Factor Auth</Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-lg font-medium mb-2 text-red-600">Danger Zone</h4>
                      <p className="mb-4 text-sm text-gray-600">
                        Permanently delete your account and all of your content
                      </p>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
