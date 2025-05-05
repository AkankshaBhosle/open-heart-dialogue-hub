
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UserAvatar } from "@/components/user-avatar";
import { Marquee } from "@/components/marquee";
import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Akshaya Srija",
      role: "Team Member",
      bio: "",
      avatar: null
    },
    {
      name: "Akanksha Bhosle",
      role: "Team Member",
      bio: "",
      avatar: null
    },
    {
      name: "Chavan Raju",
      role: "Team Member",
      bio: "",
      avatar: null
    },
    {
      name: "Hansik Reddy",
      role: "Team Member",
      bio: "",
      avatar: null
    },
    {
      name: "Dr. C. Jyotsna, Ph.D.",
      role: "Mentor",
      bio: "HOD and Professor, Department of Chemistry, VNRVJIET",
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
                  HearMeOut was born as a project for our Design Thinking course, inspired by a simple but powerful idea — 
                  to create a safe, anonymous space where anyone can share their feelings without fear of judgment.
                </p>
                <p className="text-gray-700 mb-4">
                  Through empathy, research, and collaboration, we designed a platform that connects people 
                  with listeners and therapists who truly care.
                </p>
                <p className="text-gray-700">
                  What started as an assignment quickly grew into a heartfelt mission to remind people: 
                  you are heard, you are valued, and you are not alone.
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
            <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
            <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
              HearMeOut was crafted with compassion and creativity by:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {team.slice(0, 4).map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    <UserAvatar size="lg" name={member.name} src={member.avatar} />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  {member.role && <p className="text-hearmeout-purple font-medium">{member.role}</p>}
                </div>
              ))}
            </div>
            
            <div className="text-center mb-8">
              <p className="text-xl font-medium">Under the mentorship of</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="flex justify-center mb-4">
                  <UserAvatar size="lg" name={team[4].name} src={team[4].avatar} />
                </div>
                <h3 className="text-xl font-semibold mb-1">{team[4].name}</h3>
                {team[4].bio && <p className="text-gray-600 mt-1">{team[4].bio}</p>}
              </div>
            </div>
            
            <p className="text-center mt-10 text-gray-700">
              Together, we brought this idea to life as part of our Design Thinking course — aiming to build a space where every voice matters.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
