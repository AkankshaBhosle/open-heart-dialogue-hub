
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("listener");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password, userType, name);
      navigate("/login", { 
        state: { 
          message: "Please check your email to verify your account before logging in." 
        } 
      });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters long</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I want to join as
                  </label>
                  <RadioGroup 
                    value={userType} 
                    onValueChange={setUserType}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="listener" id="listener" />
                      <Label htmlFor="listener">A listener (I want to share my feelings)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="supporter" id="supporter" />
                      <Label htmlFor="supporter">A supporter (I want to help others)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="therapist" id="therapist" />
                      <Label htmlFor="therapist">A therapist (I'm a mental health professional)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-hearmeout-purple hover:text-hearmeout-purple-dark">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-hearmeout-purple hover:text-hearmeout-purple-dark">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white"
                  disabled={isLoading || !agreeTerms}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-hearmeout-purple hover:text-hearmeout-purple-dark font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
