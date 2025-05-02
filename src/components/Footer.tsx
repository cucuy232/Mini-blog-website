
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <h2 className="text-2xl font-serif font-bold text-blog-primary">MiniBlog</h2>
            </Link>
            <p className="mt-4 text-gray-600">
              A place to share knowledge and better understand the world.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blog-primary">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-blog-primary">Explore</Link>
              </li>
              <li>
                <Link to="/new-post" className="text-gray-600 hover:text-blog-primary">Create Post</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category/technology" className="text-gray-600 hover:text-blog-primary">Technology</Link>
              </li>
              <li>
                <Link to="/category/design" className="text-gray-600 hover:text-blog-primary">Design</Link>
              </li>
              <li>
                <Link to="/category/development" className="text-gray-600 hover:text-blog-primary">Development</Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-600 hover:text-blog-primary">Business</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blog-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blog-primary">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-blog-primary">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MiniBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
