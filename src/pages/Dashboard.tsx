
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useConversation } from "@/hooks/useConversation";
import { UserAvatar } from "@/components/user-avatar";
import OnlineUsers from "@/components/OnlineUsers";
import { 
  Heart, 
  MessageCircle, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, isLoading } = useProfile();
  const { fetchUserConversations } = useConversation();
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadConversations = async () => {
      const userConversations = await fetchUserConversations();
      setConversations(userConversations);
    };

    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="animate-spin h-8 w-8 border-4 border-hearmeout-purple border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = [
    {
      title: "Active Conversations",
      value: conversations.length.toString(),
      icon: MessageCircle,
      color: "text-blue-600"
    },
    {
      title: "People Helped",
      value: "12",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Hours Listened",
      value: "24",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Safety Score",
      value: "100%",
      icon: Shield,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <UserAvatar 
                    size="lg" 
                    name={profile?.username || "User"} 
                    isTherapist={profile?.is_therapist || false} 
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Welcome back, {profile?.username || "Friend"}!
                    </h1>
                    <p className="text-gray-600">
                      Connect anonymously with someone who needs support
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {profile?.user_type || "User"}
                      </Badge>
                      {profile?.is_therapist && (
                        <Badge className="bg-hearmeout-green-light text-hearmeout-green-dark text-xs">
                          Verified Therapist
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
                  onClick={() => navigate('/profile')}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Online Users for Anonymous Chat */}
            <div className="lg:col-span-1">
              <OnlineUsers />
            </div>

            {/* Recent Conversations */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Conversations
                  </CardTitle>
                  <CardDescription>
                    Your latest anonymous support sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {conversations.length > 0 ? (
                    <div className="space-y-4">
                      {conversations.slice(0, 3).map((conversation: any, index) => (
                        <div 
                          key={conversation.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                          onClick={() => navigate(`/chat/${conversation.id}`)}
                        >
                          <div className="flex items-center gap-3">
                            <UserAvatar 
                              size="sm" 
                              name={`User ${index + 1}`}
                              isTherapist={false} 
                            />
                            <div>
                              <p className="font-medium text-gray-900">Anonymous Conversation</p>
                              <p className="text-sm text-gray-600">
                                Last active: {new Date(conversation.last_message_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No conversations yet</p>
                      <p className="text-sm text-gray-500">Start your first anonymous conversation!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/profile')}
                  >
                    <Users className="h-6 w-6" />
                    <span>Update Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => {
                      // This would trigger the quick start chat
                      const event = new CustomEvent('openQuickChat');
                      window.dispatchEvent(event);
                    }}
                  >
                    <MessageCircle className="h-6 w-6" />
                    <span>Start New Chat</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <TrendingUp className="h-6 w-6" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
