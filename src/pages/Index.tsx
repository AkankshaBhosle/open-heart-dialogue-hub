
import { Heart, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { FeatureCard } from "@/components/feature-card";
import { CTABox } from "@/components/cta-box";
import { Marquee } from "@/components/marquee";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4 bg-gradient-to-b from-hearmeout-purple-light/50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  A safe space to share your <span className="text-hearmeout-purple">feelings</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Connect anonymously with supportive listeners or trained therapists who are ready to hear you out, without judgment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {user ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white w-full sm:w-auto">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/signup">
                      <Button size="lg" className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white w-full sm:w-auto">
                        Get Started
                      </Button>
                    </Link>
                  )}
                  <Link to="/how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/8ee1786c-0b60-4fec-ae89-071e6a032f5f.png" 
                  alt="Mental health support illustration with brain and hands" 
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How HearMeOut Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple platform designed to help you express yourself and find support
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Users}
                title="Anonymous Connection"
                description="Connect anonymously with someone who's ready to listen without judgment or bias."
              />
              <FeatureCard 
                icon={MessageCircle}
                title="Express Yourself"
                description="Share your thoughts, feelings, and experiences in a safe and supportive environment."
              />
              <FeatureCard 
                icon={Heart}
                title="Find Support"
                description="Connect with empathetic listeners or opt for professional therapists when needed."
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="Privacy Protected"
                description="Your identity stays anonymous, and conversations are encrypted for your privacy."
              />
              <FeatureCard 
                className="md:col-span-2 lg:col-span-1"
                icon={Users}
                title="Choose Your Listener"
                description="Opt for a regular person or a verified therapist based on your comfort and needs."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <CTABox 
              title="Ready to be heard?"
              description="Join thousands who are finding relief through authentic connection."
              buttonText={user ? "Go to Dashboard" : "Sign Up Free"}
              buttonLink={user ? "/dashboard" : "/signup"}
              icon={<Logo size="small" />}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
