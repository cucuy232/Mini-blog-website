
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/BlogPostCard';
import FeaturedPosts from '@/components/FeaturedPosts';
import TagCloud from '@/components/TagCloud';
import { mockPosts } from '@/data/mockData';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blog-primary to-blog-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Welcome to MiniBlog
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
                A place to share knowledge and better understand the world through writing and reading
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/explore">
                  <Button className="bg-white text-blog-primary hover:bg-gray-100">
                    Explore Posts
                  </Button>
                </Link>
                <Link to="/new-post">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    Start Writing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post Section */}
          <FeaturedPosts />

          {/* Main Content */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Posts</h2>
                <Link 
                  to="/explore" 
                  className="text-blog-primary hover:text-blog-secondary flex items-center"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div>
                {mockPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* About Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">About MiniBlog</h3>
                <p className="text-gray-600 mb-4">
                  MiniBlog is a platform where readers find dynamic thinking and writers can share their knowledge and ideas.
                </p>
                <Link to="/about" className="text-blog-primary hover:text-blog-secondary font-medium">
                  Learn more about us
                </Link>
              </div>

              {/* Tags */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <TagCloud />
              </div>

              {/* Newsletter */}
              <div className="bg-blog-accent/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter to get the latest updates directly in your inbox.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary focus:border-transparent"
                    required
                  />
                  <Button className="w-full bg-blog-primary hover:bg-blog-secondary">
                    Subscribe
                  </Button>
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

export default Index;
