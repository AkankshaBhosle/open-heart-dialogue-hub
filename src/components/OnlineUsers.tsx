
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';
import { useConversation } from '@/hooks/useConversation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageCircle, Users } from 'lucide-react';

type OnlineUser = {
  id: string;
  username: string | null;
  user_type: string;
  is_therapist: boolean | null;
};

const OnlineUsers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createConversation } = useConversation();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingChatWith, setCreatingChatWith] = useState<string | null>(null);

  // Fetch available online users
  const fetchOnlineUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_available_listeners');
      
      if (error) {
        console.error("Error fetching online users:", error);
        return;
      }

      if (data) {
        const users = data.map((item: any) => ({
          id: item.user_id,
          username: null, // Keep anonymous
          user_type: 'anonymous',
          is_therapist: false
        }));
        setOnlineUsers(users);
      }
    } catch (error) {
      console.error("Error fetching online users:", error);
    }
  };

  // Set current user as available when component mounts
  const setUserAvailable = async () => {
    try {
      await supabase.rpc('set_user_available');
      console.log("User set as available");
    } catch (error) {
      console.error("Error setting user as available:", error);
    }
  };

  // Set user as unavailable when component unmounts
  const setUserUnavailable = async () => {
    try {
      await supabase.rpc('set_user_unavailable');
      console.log("User set as unavailable");
    } catch (error) {
      console.error("Error setting user as unavailable:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setUserAvailable();
      fetchOnlineUsers();
      
      // Refresh online users every 10 seconds
      const interval = setInterval(fetchOnlineUsers, 10000);
      
      return () => {
        clearInterval(interval);
        setUserUnavailable();
      };
    }
  }, [user?.id]);

  const startChatWithUser = async (userId: string) => {
    if (!user?.id) {
      toast.error("You must be logged in to start a chat");
      return;
    }

    setCreatingChatWith(userId);
    try {
      console.log("Starting chat with user:", userId);
      
      const conversationId = await createConversation(userId);
      
      if (conversationId) {
        toast.success("Chat started! Redirecting...");
        navigate(`/chat/${conversationId}`);
      } else {
        throw new Error("Failed to create conversation");
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      toast.error("Failed to start chat. Please try again.");
    } finally {
      setCreatingChatWith(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 text-hearmeout-purple mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-gray-900">Available Users</h2>
        <p className="text-gray-600 text-sm">Connect anonymously for support</p>
      </div>

      <div className="space-y-4">
        {onlineUsers.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No users available</p>
            <p className="text-xs text-gray-500">Check back in a moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {onlineUsers.length} user{onlineUsers.length > 1 ? 's' : ''} online
            </h3>
            {onlineUsers.map((onlineUser, index) => (
              <div 
                key={onlineUser.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar 
                    size="sm" 
                    name={`User ${index + 1}`}
                    isTherapist={false}
                  />
                  <div>
                    <p className="font-medium text-gray-900">Anonymous User</p>
                    <div className="flex items-center text-xs text-green-600">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                      Available now
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="sm"
                  onClick={() => startChatWithUser(onlineUser.id)}
                  disabled={creatingChatWith === onlineUser.id}
                  className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
                >
                  {creatingChatWith === onlineUser.id ? "Starting..." : "Chat"}
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          onClick={fetchOnlineUsers}
          variant="outline" 
          className="w-full"
          disabled={isLoading}
        >
          Refresh Users
        </Button>
      </div>

      <div className="mt-6 p-3 bg-hearmeout-blue-light rounded-lg">
        <p className="text-xs text-hearmeout-blue-dark">
          <strong>Anonymous Chat:</strong> All conversations are completely anonymous. No personal information is shared.
        </p>
      </div>
    </div>
  );
};

export default OnlineUsers;
