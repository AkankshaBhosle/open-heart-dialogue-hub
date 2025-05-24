
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Mic, MicOff, Send, Volume, VolumeX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useConversation } from "@/hooks/useConversation";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { conversation, messages, participants, sendMessage, isLoading, markMessagesAsRead } = useConversation(id);
  const { profile: currentUserProfile } = useProfile();
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Find the other participant (anonymous)
  const otherParticipant = participants.find(p => p.user_id !== user?.id);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    markMessagesAsRead();
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage("");
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // End the conversation
  const handleEndConversation = async () => {
    if (confirm('Are you sure you want to end this conversation?')) {
      toast.info("Conversation ended");
      navigate('/dashboard');
    }
  };

  if (isLoading || !conversation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-16">
          <div className="animate-spin h-8 w-8 border-4 border-hearmeout-purple border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <main className="flex-grow flex flex-col pt-16">
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserAvatar 
                size="sm" 
                name="Anonymous User"
                isTherapist={false} 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">Anonymous User</h2>
                  <span className="bg-hearmeout-blue-light text-hearmeout-blue-dark text-xs px-2 py-0.5 rounded-full">
                    Anonymous
                  </span>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  In conversation
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAudioOn(!isAudioOn)}
                title={isAudioOn ? "Turn off microphone" : "Turn on microphone"}
              >
                {isAudioOn ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                title="Show appreciation"
                onClick={() => toast.success("You showed appreciation!")}
              >
                <Heart className="h-5 w-5 text-hearmeout-purple" />
              </Button>
              
              <Button
                variant="outline"
                title="End conversation"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleEndConversation}
              >
                End Chat
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center my-4">
              <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-3 py-1">
                Anonymous conversation started - {new Date(conversation.created_at).toLocaleString()}
              </span>
            </div>
            
            {messages.map((msg, index) => {
              const isCurrentUser = msg.sender_id === user?.id;
              const messageTime = new Date(msg.created_at).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {!isCurrentUser && (
                      <UserAvatar 
                        size="sm" 
                        name="Anonymous User"
                        isTherapist={false}
                      />
                    )}
                    
                    <div
                      className={`p-3 rounded-lg ${
                        isCurrentUser
                          ? "bg-hearmeout-purple text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span 
                        className={`text-xs block text-right mt-1 ${
                          isCurrentUser ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {messageTime}
                      </span>
                    </div>
                    
                    {isCurrentUser && (
                      <UserAvatar 
                        size="sm" 
                        name="You"
                        isTherapist={currentUserProfile?.is_therapist || false}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message anonymously..."
                className="min-h-[60px] resize-none"
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark h-auto"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>🔒 Your identity is completely anonymous</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
