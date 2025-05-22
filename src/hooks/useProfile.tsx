
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export type Profile = {
  id: string;
  username: string;
  user_type: "listener" | "supporter" | "therapist";
  is_therapist: boolean;
  bio: string | null;
  is_online: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export const useProfile = (userId?: string) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // If no userId is provided, use the current user's id
  const profileId = userId || user?.id;

  const fetchProfile = async () => {
    if (!profileId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data as Profile);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user?.id) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success("Profile updated successfully");
      await fetchProfile();
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOnlineStatus = async (isOnline: boolean) => {
    if (!user?.id) return;

    try {
      await supabase
        .from('profiles')
        .update({ is_online: isOnline })
        .eq('id', user.id);
    } catch (err) {
      console.error("Error updating online status:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    
    // Listen for realtime updates to this profile
    if (profileId) {
      const channel = supabase
        .channel(`profile-${profileId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${profileId}`,
          },
          (payload) => {
            setProfile(payload.new as Profile);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [profileId]);

  // Set online status on mount and cleanup on unmount
  useEffect(() => {
    if (user?.id && profile?.id === user?.id) {
      updateOnlineStatus(true);
      
      // Set up cleanup on page close/refresh
      const handleBeforeUnload = () => {
        updateOnlineStatus(false);
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        updateOnlineStatus(false);
      };
    }
  }, [user?.id, profile?.id]);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
};
