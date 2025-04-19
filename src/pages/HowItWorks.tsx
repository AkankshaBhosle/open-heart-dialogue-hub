
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTABox } from "@/components/cta-box";
import { Heart, MessageCircle, ShieldCheck, UserCheck, Volume, Bell } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create a profile",
      description: "Sign up and create an anonymous profile. You control how much personal information to share.",
      icon: UserCheck
    },
    {
      number: 2,
      title: "Choose your connection",
      description: "Select between connecting with a supportive listener or a verified therapist based on your needs.",
      icon: Heart
    },
    {
      number: 3,
      title: "Start talking",
      description: "Connect instantly via text or voice chat. Express yourself freely in a judgment-free space.",
      icon: MessageCircle
    },
    {
      number: 4,
      title: "Find relief",
      description: "Experience the freedom of sharing your feelings without fear of judgment or consequences.",
      icon: Volume
    }
  ];
  
  const faqs = [
    {
      question: "Is HearMeOut really anonymous?",
      answer: "Yes, your identity is fully protected. You can choose what details to share, and our system is designed to maintain your privacy throughout all conversations."
    },
    {
      question: "How do you verify therapists?",
      answer: "All therapists on our platform undergo a thorough verification process where we check their credentials, licenses, and professional background to ensure they are qualified mental health professionals."
    },
    {
      question: "Is this a replacement for therapy?",
      answer: "HearMeOut can be a valuable supplement to traditional therapy, providing immediate emotional support. However, it's not intended to replace professional long-term treatment for serious mental health conditions."
    },
    {
      question: "What if I connect with someone inappropriate?",
      answer: "We have a zero-tolerance policy for inappropriate behavior. You can end any conversation instantly and report users who violate our community guidelines."
    },
    {
      question: "How much does it cost?",
      answer: "Basic peer connections are free. Connections with verified therapists have a fee, but we offer various subscription options to make support accessible to everyone."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-hearmeout-purple-light/50 to-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How HearMeOut Works</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              A simple process designed to help you find emotional relief through human connection
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark text-white">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Steps section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Four Simple Steps</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From signup to emotional relief in minutes
              </p>
            </div>
            
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-hearmeout-purple-light -translate-y-1/2 z-0"></div>
              
              <div className="grid md:grid-cols-4 gap-8 relative z-10">
                {steps.map((step) => (
                  <div key={step.number} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-hearmeout-purple text-white font-bold text-xl mb-4">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-hearmeout-purple mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features comparison */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Connection Options</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the type of support that's right for you
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-hearmeout-purple-light">
                    <Heart className="w-8 h-8 text-hearmeout-purple" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-6">Peer Support</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Connect with empathetic listeners</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Free of charge</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Perfect for everyday venting and support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Anonymous connection</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Link to="/signup">
                    <Button className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
                      Connect With a Peer
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                <div className="absolute top-0 right-0 bg-hearmeout-green text-white text-sm font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg">
                  Professional Support
                </div>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-hearmeout-green-light">
                    <Bell className="w-8 h-8 text-hearmeout-green-dark" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-6">Therapist Support</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Connect with licensed therapists</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Premium subscription or pay-per-session</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Scheduled or on-demand sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Clinical expertise for deeper issues</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Still anonymous if you choose</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Link to="/signup">
                    <Button className="bg-hearmeout-green hover:bg-hearmeout-green-dark">
                      Connect With a Therapist
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about HearMeOut
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <CTABox 
              title="Ready to feel better?"
              description="Join thousands of people finding relief through real human connection."
              buttonText="Get Started Free"
              buttonLink="/signup"
              icon={<Heart className="h-6 w-6 text-white" />}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
