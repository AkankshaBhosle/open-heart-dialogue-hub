
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useConversation } from '@/hooks/useConversation';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { MessageCircle, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const QuickStartChat = () => {
  const navigate = useNavigate();
  const { createConversation } = useConversation();
  const { profile } = useProfile();
  const [friendEmail, setFriendEmail] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const startChatWithFriend = async () => {
    if (!friendEmail.trim()) {
      toast.error("Please enter your friend's email");
      return;
    }

    setIsCreating(true);
    try {
      console.log("Starting chat with:", friendEmail);
      
      // Check if this email exists in auth.users
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, username')
        .ilike('username', `%${friendEmail}%`)
        .limit(1);
      
      console.log("User search results:", userData);
      
      let friendId;
      
      if (userError) {
        console.error("Error finding user:", userError);
      }
      
      if (userData && userData.length > 0) {
        // Use the existing user's ID
        friendId = userData[0].id;
        console.log("Found existing user:", friendId);
      } else {
        // For demo purposes, create a mock user ID
        friendId = `demo-friend-${Date.now()}`;
        console.log("Created mock user ID:", friendId);
        
        // For demo purposes, create a mock profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: friendId,
              username: friendEmail,
              user_type: 'listener'
            }
          ]);
        
        if (profileError) {
          console.error("Error creating mock profile:", profileError);
          toast.error("Error creating mock profile: " + profileError.message);
        }
      }
      
      console.log("Creating conversation with user ID:", friendId);
      
      // Create conversation
      const conversationId = await createConversation(friendId);
      console.log("Conversation created with ID:", conversationId);
      
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
      setIsCreating(false);
    }
  };

  const joinRandomChat = () => {
    toast.info("Feature coming soon! For now, start a chat with a friend.");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <MessageCircle className="h-12 w-12 text-hearmeout-purple mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-gray-900">Start Chatting</h2>
        <p className="text-gray-600 text-sm">Connect with someone for support</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chat with a Friend
          </label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter friend's email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={startChatWithFriend}
              disabled={isCreating}
              className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
            >
              {isCreating ? "Starting..." : "Start"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter any email for demo purposes
          </p>
        </div>

        <div className="border-t pt-4">
          <Button 
            onClick={joinRandomChat}
            variant="outline" 
            className="w-full"
          >
            <Users className="h-4 w-4 mr-2" />
            Join Random Support Chat
          </Button>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Connect with available listeners
          </p>
        </div>
      </div>

      <div className="mt-6 p-3 bg-hearmeout-blue-light rounded-lg">
        <p className="text-xs text-hearmeout-blue-dark">
          <strong>Demo Note:</strong> For the presentation, you can use any email to start a chat session and demonstrate real-time messaging.
        </p>
      </div>
    </div>
  );
};

export default QuickStartChat;
