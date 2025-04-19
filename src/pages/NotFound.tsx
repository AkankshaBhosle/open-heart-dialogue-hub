
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-hearmeout-purple-light/50 to-white">
      <Logo size="large" />
      
      <h1 className="mt-8 text-4xl font-bold text-center">404 - Page Not Found</h1>
      <p className="mt-4 text-xl text-gray-600 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="mt-8">
        <Link to="/">
          <Button size="lg" className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
