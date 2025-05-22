
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

export type Message = {
  id: string;
  content: string;
  sender_id: string;
  conversation_id: string;
  created_at: string;
  read_at: string | null;
};

export type Conversation = {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string;
  is_active: boolean;
  participants?: ConversationParticipant[];
};

export type ConversationParticipant = {
  id: string;
  user_id: string;
  conversation_id: string;
  joined_at: string;
  profile?: {
    username: string | null;
    is_therapist: boolean | null;
    user_type: string;
  } | null;
};

export const useConversation = (conversationId?: string) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<ConversationParticipant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch a single conversation by ID
  const fetchConversation = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      setConversation(data as Conversation);
      await fetchParticipants(id);
      await fetchMessages(id);
    } catch (err: any) {
      console.error("Error fetching conversation:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all conversations for the current user
  const fetchUserConversations = async () => {
    if (!user?.id) return [];

    try {
      setIsLoading(true);
      setError(null);

      // Get conversation IDs where the user is a participant
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      if (participantError) {
        throw participantError;
      }

      if (!participantData || participantData.length === 0) {
        return [];
      }

      const conversationIds = participantData.map(p => p.conversation_id);

      // Get the conversations with these IDs
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants(
            *,
            profile:profiles(username, is_therapist, user_type)
          )
        `)
        .in('id', conversationIds)
        .order('last_message_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Fix: Handle the type conversion safely
      return (data as unknown) as (Conversation & { participants: ConversationParticipant[] })[];
    } catch (err: any) {
      console.error("Error fetching user conversations:", err);
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch participants for a conversation
  const fetchParticipants = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('conversation_participants')
        .select(`
          *,
          profile:profiles(username, is_therapist, user_type)
        `)
        .eq('conversation_id', id);

      if (error) {
        throw error;
      }

      // Fix: Handle the type conversion safely
      setParticipants((data as unknown) as ConversationParticipant[]);
    } catch (err: any) {
      console.error("Error fetching participants:", err);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setMessages(data as Message[]);
    } catch (err: any) {
      console.error("Error fetching messages:", err);
    }
  };

  // Send a new message
  const sendMessage = async (content: string) => {
    if (!user?.id || !conversationId || !content.trim()) {
      toast.error("Cannot send message");
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            conversation_id: conversationId,
            sender_id: user.id,
            content: content.trim(),
          },
        ]);

      if (error) {
        throw error;
      }

      // Update the last message timestamp in the conversation
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

    } catch (err: any) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message");
    }
  };

  // Create a new conversation with another user
  const createConversation = async (otherUserId: string) => {
    if (!user?.id || !otherUserId) {
      toast.error("Cannot create conversation");
      return null;
    }

    try {
      // First check if a conversation already exists between these users
      const { data: existingParticipants } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      if (existingParticipants && existingParticipants.length > 0) {
        const existingConversationIds = existingParticipants.map(p => p.conversation_id);
        
        const { data: otherParticipants } = await supabase
          .from('conversation_participants')
          .select('conversation_id')
          .eq('user_id', otherUserId)
          .in('conversation_id', existingConversationIds);

        if (otherParticipants && otherParticipants.length > 0) {
          // Conversation already exists
          return otherParticipants[0].conversation_id;
        }
      }

      // Create a new conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .insert([{}])
        .select();

      if (conversationError || !conversationData) {
        throw conversationError;
      }

      const newConversationId = conversationData[0].id;

      // Add both users as participants
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: newConversationId, user_id: user.id },
          { conversation_id: newConversationId, user_id: otherUserId },
        ]);

      if (participantsError) {
        throw participantsError;
      }

      toast.success("Conversation created");
      return newConversationId;
    } catch (err: any) {
      console.error("Error creating conversation:", err);
      toast.error("Failed to create conversation");
      return null;
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async () => {
    if (!user?.id || !conversationId) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .is('read_at', null);

      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error("Error marking messages as read:", err);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchConversation(conversationId);
      
      // Set up realtime subscription for new messages
      const messagesChannel = supabase
        .channel(`messages-${conversationId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            setMessages((current) => [...current, payload.new as Message]);
            // Mark message as read if it's not from the current user
            if (payload.new.sender_id !== user?.id) {
              setTimeout(() => {
                markMessagesAsRead();
              }, 0);
            }
          }
        )
        .subscribe();

      // Mark messages as read when conversation is opened
      markMessagesAsRead();

      return () => {
        supabase.removeChannel(messagesChannel);
      };
    }
  }, [conversationId, user?.id]);

  return {
    conversation,
    messages,
    participants,
    isLoading,
    error,
    sendMessage,
    fetchUserConversations,
    createConversation,
    markMessagesAsRead,
  };
};
