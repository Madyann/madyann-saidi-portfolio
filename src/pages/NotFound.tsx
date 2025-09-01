import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="text-8xl font-space-grotesk font-bold text-primary/20 animate-float">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-primary/30 rounded-full animate-glow-pulse" />
            </div>
          </div>

          <h1 className="font-space-grotesk font-bold text-3xl mb-4">
            Page Not Found
          </h1>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="glow-effect">
                <Link to="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/projects" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Projects
                </Link>
              </Button>
            </div>

            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
