
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import TagCloud from "@/components/TagCloud";
import { mockPosts } from "@/data/mockData";

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search');
  
  const [searchTerm, setSearchTerm] = useState(searchParam || "");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  
  // Filter and sort posts when search term or filter changes
  useEffect(() => {
    let results = [...mockPosts];
    
    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sort
    switch (selectedFilter) {
      case 'recent':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        results.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        results.sort((a, b) => b.readCount - a.readCount);
        break;
      default:
        break;
    }
    
    setFilteredPosts(results);
    
  }, [searchTerm, selectedFilter]);
  
  // Update search term when URL parameter changes
  useEffect(() => {
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [searchParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Explore Posts</h1>
            <p className="text-gray-600 mt-2">Discover interesting stories and insights</p>
            
            {/* Search and filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, content or tag..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-transparent"
                />
                <Button type="submit" className="hidden">Search</Button>
              </form>
              <select 
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-transparent"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content - posts */}
            <div className="lg:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h2>
                  <p className="text-gray-600 mb-4">Try different search terms or browse by category</p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button variant="outline" className="w-10 h-10 p-0" disabled>
                    &lt;
                  </Button>
                  <Button className="w-10 h-10 p-0 bg-blog-primary">1</Button>
                  <Button variant="outline" className="w-10 h-10 p-0">2</Button>
                  <Button variant="outline" className="w-10 h-10 p-0">3</Button>
                  <Button variant="outline" className="w-10 h-10 p-0">
                    &gt;
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular tags */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TagCloud />
              </div>

              {/* Popular categories */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link to="/category/technology" className="block text-blog-primary hover:text-blog-secondary">
                    Technology (14)
                  </Link>
                  <Link to="/category/design" className="block text-blog-primary hover:text-blog-secondary">
                    Design (8)
                  </Link>
                  <Link to="/category/development" className="block text-blog-primary hover:text-blog-secondary">
                    Development (12)
                  </Link>
                  <Link to="/category/business" className="block text-blog-primary hover:text-blog-secondary">
                    Business (6)
                  </Link>
                  <Link to="/category/lifestyle" className="block text-blog-primary hover:text-blog-secondary">
                    Lifestyle (4)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
