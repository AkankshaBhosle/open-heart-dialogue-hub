
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Settings, User, Volume, Bell } from "lucide-react";

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    joinDate: "March 2023",
    isTherapist: false
  };
  
  // Mock conversations
  const conversations = [
    {
      id: 1,
      with: "Jamie",
      lastMessage: "Thanks for listening to me yesterday.",
      date: "Today, 2:30 PM",
      isTherapist: false,
      unread: 2
    },
    {
      id: 2,
      with: "Dr. Morgan",
      lastMessage: "Remember the breathing exercises we discussed.",
      date: "Yesterday",
      isTherapist: true,
      unread: 0
    },
    {
      id: 3,
      with: "Taylor",
      lastMessage: "It really helped to talk about this.",
      date: "Mon, 10:15 AM",
      isTherapist: false,
      unread: 0
    }
  ];
  
  // Mock activity
  const activity = [
    {
      id: 1,
      type: "conversation",
      description: "20-minute conversation with Dr. Morgan",
      date: "Today, 3:45 PM"
    },
    {
      id: 2,
      type: "feedback",
      description: "You received positive feedback from Jamie",
      date: "Yesterday, 5:20 PM"
    },
    {
      id: 3,
      type: "milestone",
      description: "You've completed 5 conversations!",
      date: "Mon, 10:30 AM"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn userName={user.name} />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar 
                size="lg" 
                name={user.name} 
                isTherapist={user.isTherapist} 
              />
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}</h1>
                <p className="text-gray-600">Member since {user.joinDate}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant={isOnline ? "default" : "outline"}
                className={isOnline ? "bg-hearmeout-green hover:bg-hearmeout-green-dark" : ""}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? "Online" : "Go Online"}
              </Button>
              
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="connect">
            <TabsList className="mb-6">
              <TabsTrigger value="connect">
                <Heart className="mr-2 h-4 w-4" />
                Connect Now
              </TabsTrigger>
              <TabsTrigger value="conversations">
                <MessageCircle className="mr-2 h-4 w-4" />
                Conversations
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Volume className="mr-2 h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect" className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Connect with someone</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-lg border border-hearmeout-purple-light bg-hearmeout-purple-light/20 flex flex-col items-center text-center">
                    <UserAvatar size="lg" fallback="?" />
                    <h3 className="text-lg font-medium mt-4 mb-2">Random Connection</h3>
                    <p className="text-gray-600 mb-4">
                      Connect with a random person who's ready to listen right now
                    </p>
                    <Button className="mt-auto bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
                      Find Someone
                    </Button>
                  </div>
                  
                  <div className="p-6 rounded-lg border border-hearmeout-green-light bg-hearmeout-green-light/20 flex flex-col items-center text-center">
                    <UserAvatar size="lg" isTherapist fallback="T" />
                    <h3 className="text-lg font-medium mt-4 mb-2">Connect with a Therapist</h3>
                    <p className="text-gray-600 mb-4">
                      Talk to a licensed professional for more structured support
                    </p>
                    <Button className="mt-auto bg-hearmeout-green hover:bg-hearmeout-green-dark">
                      Find a Therapist
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-gray-50">
                  <h3 className="font-medium mb-2">Your Preferences</h3>
                  <p className="text-sm text-gray-600">
                    You can update your matching preferences in your profile settings.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-hearmeout-purple">•</span>
                    <span className="text-gray-700">Take a few deep breaths before starting a conversation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-hearmeout-purple">•</span>
                    <span className="text-gray-700">Be honest about how you're feeling</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-hearmeout-purple">•</span>
                    <span className="text-gray-700">Remember you can end a conversation at any time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-hearmeout-purple">•</span>
                    <span className="text-gray-700">Report any inappropriate behavior immediately</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="conversations">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
                
                <div className="divide-y">
                  {conversations.map((convo) => (
                    <div key={convo.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserAvatar 
                          name={convo.with} 
                          isTherapist={convo.isTherapist} 
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{convo.with}</h3>
                            {convo.isTherapist && (
                              <span className="bg-hearmeout-green-light text-hearmeout-green-dark text-xs px-2 py-0.5 rounded-full">
                                Therapist
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1">{convo.lastMessage}</p>
                          <p className="text-xs text-gray-500">{convo.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {convo.unread > 0 && (
                          <span className="bg-hearmeout-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {convo.unread}
                          </span>
                        )}
                        <Button variant="outline" size="sm">Open</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {conversations.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No conversations yet</p>
                    <Button variant="link" className="mt-2 text-hearmeout-purple">
                      Start a new conversation
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                
                <div className="divide-y">
                  {activity.map((item) => (
                    <div key={item.id} className="py-4 flex items-start gap-4">
                      <div className="w-10 h-10 flex-shrink-0 rounded-full bg-hearmeout-purple-light flex items-center justify-center">
                        {item.type === "conversation" && <MessageCircle className="h-5 w-5 text-hearmeout-purple" />}
                        {item.type === "feedback" && <Heart className="h-5 w-5 text-hearmeout-purple" />}
                        {item.type === "milestone" && <Volume className="h-5 w-5 text-hearmeout-purple" />}
                      </div>
                      <div>
                        <p className="text-gray-800">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {activity.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No activity yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <UserAvatar 
                      size="lg" 
                      name={user.name} 
                      isTherapist={user.isTherapist} 
                    />
                    <Button variant="link" className="mt-2 text-hearmeout-purple">
                      Change photo
                    </Button>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Display Name
                        </label>
                        <Input defaultValue={user.name} className="mb-4" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Type
                        </label>
                        <div className="h-10 px-3 rounded-md border border-input bg-background flex items-center text-gray-500">
                          {user.isTherapist ? "Therapist" : "Listener"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <Textarea 
                        placeholder="Tell others a bit about yourself..." 
                        className="resize-none mb-4" 
                      />
                    </div>
                    
                    <Button className="mt-2 bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notification sounds</h3>
                      <p className="text-sm text-gray-600">Play sounds for new messages and notifications</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email notifications</h3>
                      <p className="text-sm text-gray-600">Receive emails about new conversations and updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Anonymous mode</h3>
                      <p className="text-sm text-gray-600">Hide your display name during conversations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button className="mt-6 bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
                  Save Preferences
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Define missing components to avoid errors
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Switch = ({ defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-hearmeout-purple focus:ring-offset-2 ${
        checked ? 'bg-hearmeout-purple' : 'bg-gray-200'
      }`}
    >
      <span className="sr-only">Toggle</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Dashboard;
