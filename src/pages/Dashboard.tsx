
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Settings, User, Volume, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProfile, Profile } from "@/hooks/useProfile";
import { useConversation } from "@/hooks/useConversation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { fetchUserConversations, createConversation } = useConversation();
  const [isOnline, setIsOnline] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<Profile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const navigate = useNavigate();
  
  // Fetch conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (user) {
        const data = await fetchUserConversations();
        setConversations(data || []);
      }
    };
    
    loadConversations();
  }, [user]);
  
  // Toggle online status
  useEffect(() => {
    if (profile) {
      setIsOnline(profile.is_online || false);
    }
  }, [profile]);
  
  const handleOnlineToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    if (profile) {
      updateProfile({ is_online: newStatus, is_available: newStatus });
    }
  };

  // Fetch available users for connection
  const fetchAvailableUsers = async () => {
    if (!user) return;
    
    setIsLoadingUsers(true);
    
    try {
      // Get all available users except current user
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user.id)
        .eq("is_available", true);
      
      if (error) throw error;
      
      setAvailableUsers(data as Profile[]);
    } catch (err) {
      console.error("Error fetching available users:", err);
    } finally {
      setIsLoadingUsers(false);
    }
  };
  
  // Create a new conversation with a user
  const startConversation = async (userId: string) => {
    if (!user) return;
    
    try {
      const conversationId = await createConversation(userId);
      
      if (conversationId) {
        navigate(`/chat/${conversationId}`);
      }
    } catch (err) {
      console.error("Error creating conversation:", err);
    }
  };
  
  // Listen for changes in available users
  useEffect(() => {
    fetchAvailableUsers();
    
    const channel = supabase
      .channel('public:profiles')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE', 
          schema: 'public',
          table: 'profiles',
          filter: 'is_available=eq.true'
        },
        (payload) => {
          // Refresh available users when someone becomes available
          fetchAvailableUsers();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-hearmeout-purple border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar 
                size="lg" 
                name={profile.username} 
                isTherapist={profile.is_therapist} 
              />
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {profile.username?.split(" ")[0] || "User"}</h1>
                <p className="text-gray-600">
                  {profile.user_type === "therapist" ? "Therapist" : "Member"} since {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant={isOnline ? "default" : "outline"}
                className={isOnline ? "bg-hearmeout-green hover:bg-hearmeout-green-dark" : ""}
                onClick={handleOnlineToggle}
              >
                {isOnline ? "Online" : "Go Online"}
              </Button>
              
              <Link to="/profile">
                <Button variant="outline" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
              
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="connect">
            <TabsList className="mb-6">
              <TabsTrigger value="connect" onClick={fetchAvailableUsers}>
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
                    <Button 
                      className="mt-auto bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
                      onClick={fetchAvailableUsers}
                    >
                      Find Someone
                    </Button>
                  </div>
                  
                  <div className="p-6 rounded-lg border border-hearmeout-green-light bg-hearmeout-green-light/20 flex flex-col items-center text-center">
                    <UserAvatar size="lg" isTherapist fallback="T" />
                    <h3 className="text-lg font-medium mt-4 mb-2">Connect with a Therapist</h3>
                    <p className="text-gray-600 mb-4">
                      Talk to a licensed professional for more structured support
                    </p>
                    <Button 
                      className="mt-auto bg-hearmeout-green hover:bg-hearmeout-green-dark"
                      onClick={() => {
                        fetchAvailableUsers();
                        toast.info("Searching for available therapists...");
                      }}
                    >
                      Find a Therapist
                    </Button>
                  </div>
                </div>
                
                {/* Available Users List */}
                {isLoadingUsers ? (
                  <div className="mt-6 flex justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-hearmeout-purple border-t-transparent rounded-full"></div>
                  </div>
                ) : availableUsers.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Available Now</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {availableUsers.map((availableUser) => (
                        <div 
                          key={availableUser.id} 
                          className="p-4 border rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <UserAvatar 
                              name={availableUser.username || "User"}
                              isTherapist={availableUser.is_therapist}
                            />
                            <div>
                              <h4 className="font-medium">{availableUser.username}</h4>
                              <p className="text-sm text-gray-600">
                                {availableUser.user_type === "therapist" ? "Therapist" : "Listener"}
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
                            onClick={() => startConversation(availableUser.id)}
                          >
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-4 text-center rounded-lg bg-gray-50">
                    <p>No users are available right now. Please check again soon.</p>
                  </div>
                )}
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
                
                {conversations.length > 0 ? (
                  <div className="divide-y">
                    {conversations.map((convo) => {
                      // Find the other participant
                      const otherParticipant = convo.participants?.find(
                        (p: any) => p.user_id !== user?.id
                      );
                      const otherUserName = otherParticipant?.profile?.username || "User";
                      const isTherapist = otherParticipant?.profile?.is_therapist || false;
                      
                      return (
                        <div key={convo.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <UserAvatar 
                              name={otherUserName}
                              isTherapist={isTherapist}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{otherUserName}</h3>
                                {isTherapist && (
                                  <span className="bg-hearmeout-green-light text-hearmeout-green-dark text-xs px-2 py-0.5 rounded-full">
                                    Therapist
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">
                                {new Date(convo.last_message_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <Link to={`/chat/${convo.id}`}>
                            <Button variant="outline" size="sm">Open</Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No conversations yet</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-hearmeout-purple"
                      onClick={() => {
                        const connectTab = document.querySelector('[data-value="connect"]');
                        if (connectTab instanceof HTMLElement) {
                          connectTab.click();
                        }
                      }}
                    >
                      Start a new conversation
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                
                {conversations.length > 0 ? (
                  <div className="divide-y">
                    {conversations.slice(0, 3).map((convo: any) => {
                      const otherParticipant = convo.participants?.find(
                        (p: any) => p.user_id !== user?.id
                      );
                      const otherUserName = otherParticipant?.profile?.username || "User";
                      
                      return (
                        <div key={convo.id} className="py-4 flex items-start gap-4">
                          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-hearmeout-purple-light flex items-center justify-center">
                            <MessageCircle className="h-5 w-5 text-hearmeout-purple" />
                          </div>
                          <div>
                            <p className="text-gray-800">Conversation with {otherUserName}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(convo.last_message_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No activity yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Your Profile</h2>
                  <Link to="/profile">
                    <Button className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <UserAvatar 
                      size="lg" 
                      name={profile.username} 
                      isTherapist={profile.is_therapist} 
                    />
                    <p className="mt-2 text-sm font-medium">{profile.user_type}</p>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Display Name
                        </label>
                        <div className="p-2 border rounded-md bg-gray-50">
                          {profile.username || "Not set"}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Type
                        </label>
                        <div className="p-2 border rounded-md bg-gray-50">
                          {profile.is_therapist ? "Therapist" : profile.user_type || "User"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <div className="p-2 border rounded-md bg-gray-50 min-h-[100px]">
                        {profile.bio || "No bio provided yet."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
