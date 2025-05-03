
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-6 text-blog-primary">
          <h1 className="text-9xl font-bold">404</h1>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you were looking for. It might have been removed or doesn't exist.
        </p>
        <Link to="/">
          <Button className="bg-blog-primary hover:bg-blog-secondary">
            <Home className="h-5 w-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
