
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Mic, MicOff, Send, Volume, VolumeX } from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  
  // Mock user data
  const otherUser = {
    name: "Jamie",
    isTherapist: false
  };
  
  // Mock conversation messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hi there, thanks for connecting. How are you feeling today?",
      time: "2:30 PM"
    },
    {
      id: 2,
      sender: "you",
      text: "I've been feeling a bit overwhelmed lately with work and personal stuff.",
      time: "2:32 PM"
    },
    {
      id: 3, 
      sender: "other",
      text: "I'm sorry to hear that. Would you like to talk more about what's been going on?",
      time: "2:33 PM"
    }
  ]);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "you",
      text: message,
      time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate response after delay
    setTimeout(() => {
      const responses = [
        "I understand how you feel. Can you tell me more?",
        "That sounds difficult. How long have you been feeling this way?",
        "I'm here to listen. What do you think is contributing to these feelings?",
        "Thank you for sharing that with me. How can I best support you right now?"
      ];
      
      const responseMessage = {
        id: messages.length + 2,
        sender: "other",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 3000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isLoggedIn />
      
      <main className="flex-grow flex flex-col pt-16">
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserAvatar 
                name={otherUser.name} 
                isTherapist={otherUser.isTherapist} 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{otherUser.name}</h2>
                  {otherUser.isTherapist && (
                    <span className="bg-hearmeout-green-light text-hearmeout-green-dark text-xs px-2 py-0.5 rounded-full">
                      Therapist
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  Online now
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
                onClick={() => setIsVideoOn(!isVideoOn)}
                title={isVideoOn ? "Turn off microphone" : "Turn on microphone"}
              >
                {isVideoOn ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                title="Show appreciation"
              >
                <Heart className="h-5 w-5 text-hearmeout-purple" />
              </Button>
              
              <Button
                variant="outline"
                title="End conversation"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
                Conversation started - Today, 2:30 PM
              </span>
            </div>
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {msg.sender !== "you" && (
                    <UserAvatar 
                      size="sm" 
                      name={otherUser.name} 
                      isTherapist={otherUser.isTherapist}
                    />
                  )}
                  
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === "you"
                        ? "bg-hearmeout-purple text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span 
                      className={`text-xs block text-right mt-1 ${
                        msg.sender === "you" ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                  
                  {msg.sender === "you" && (
                    <UserAvatar size="sm" name="You" />
                  )}
                </div>
              </div>
            ))}
            
            {messages.length > 0 && messages[messages.length - 1].sender === "other" && (
              <div className="text-center my-4">
                <span className="text-xs bg-hearmeout-blue-light text-hearmeout-blue-dark rounded-full px-3 py-1">
                  Jamie is waiting for your response
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none"
              />
              
              <Button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark h-auto"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>Your identity is anonymous</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
