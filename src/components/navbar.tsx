
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

type NavbarProps = {
  isLoggedIn?: boolean;
  userName?: string;
};

export const Navbar = ({ isLoggedIn = false, userName }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/about" className="text-gray-600 hover:text-hearmeout-purple">
            About
          </Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-hearmeout-purple">
            How It Works
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" className="text-hearmeout-purple hover:text-hearmeout-purple-dark hover:bg-hearmeout-purple-light">
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile" className="flex items-center gap-2">
                <span className="text-sm font-medium">{userName || "User"}</span>
                <UserAvatar size="sm" name={userName} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-hearmeout-purple hover:text-hearmeout-purple-dark hover:bg-hearmeout-purple-light">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link to="/about" className="text-gray-600 hover:text-hearmeout-purple py-2">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-hearmeout-purple py-2">
              How It Works
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-hearmeout-purple py-2">
                  Dashboard
                </Link>
                <Link to="/profile" className="flex items-center gap-2 py-2">
                  <UserAvatar size="sm" name={userName} />
                  <span className="text-sm font-medium">{userName || "User"}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2">
                  <Button variant="ghost" className="w-full text-hearmeout-purple hover:text-hearmeout-purple-dark hover:bg-hearmeout-purple-light">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" className="py-2">
                  <Button className="w-full bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
