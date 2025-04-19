
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UserAvatar } from "@/components/user-avatar";
import { Marquee } from "@/components/marquee";
import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Clinical psychologist with 15 years of experience. Founded HearMeOut to bring mental health support to everyone.",
      avatar: null
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Tech innovator focused on privacy and security. Built HearMeOut's anonymous connection platform.",
      avatar: null
    },
    {
      name: "Dr. Amara Patel",
      role: "Head of Therapy",
      bio: "Oversees our therapist network and ensures all interactions follow clinical best practices.",
      avatar: null
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Add Marquee right after the Navbar */}
      <Marquee />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-hearmeout-purple-light/50 to-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Mission</h1>
            <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
              HearMeOut exists to create a world where everyone has access to emotional support without 
              judgment, stigma, or barriers.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  HearMeOut began in 2023 when our founder, Sarah, realized how many people were suffering in silence 
                  with emotional challenges but had nowhere to turn.
                </p>
                <p className="text-gray-700 mb-4">
                  Having worked as a clinical psychologist, she saw firsthand the power of simply being heard - 
                  but also the barriers that prevented many from seeking help: cost, stigma, and access.
                </p>
                <p className="text-gray-700">
                  We built HearMeOut to break down these barriers by creating a platform where anyone can connect 
                  anonymously with supportive listeners or trained professionals, 24/7, from anywhere in the world.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team brainstorming" 
                  className="rounded-xl shadow-md max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-hearmeout-purple-light mb-4">
                  <Heart className="w-6 h-6 text-hearmeout-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Empathy First</h3>
                <p className="text-gray-600">
                  We believe in the power of human connection and compassion. Every feature and policy is 
                  designed to foster understanding and support.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-hearmeout-purple-light mb-4">
                  <ShieldCheck className="w-6 h-6 text-hearmeout-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy & Safety</h3>
                <p className="text-gray-600">
                  Your privacy is paramount. We've built our platform with anonymous connections and strong 
                  safeguards to protect your information and wellbeing.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-hearmeout-purple-light mb-4">
                  <MessageCircle className="w-6 h-6 text-hearmeout-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  Support should be available to everyone, regardless of location, background, or resources. 
                  We're committed to making emotional support accessible to all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    <UserAvatar size="lg" name={member.name} src={member.avatar} />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-hearmeout-purple font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
