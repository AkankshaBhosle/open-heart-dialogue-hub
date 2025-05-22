
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/user-avatar";
import { toast } from "sonner";

const Profile = () => {
  const { signOut } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile();
  
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Initialize form with profile data when it loads
  useEffect(() => {
    if (profile) {
      setName(profile.username || "");
      setBio(profile.bio || "");
    }
  }, [profile]);
  
  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        username: name,
        bio: bio,
      });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  const handleCancel = () => {
    setName(profile?.username || "");
    setBio(profile?.bio || "");
    setIsEditMode(false);
  };
  
  if (isLoading) {
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
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col items-center">
                <UserAvatar 
                  size="lg" 
                  name={profile?.username || "User"} 
                  isTherapist={profile?.is_therapist || false} 
                />
                <p className="mt-2 text-sm text-gray-500">
                  {profile?.user_type || "User"}
                </p>
              </div>
              
              <div className="flex-grow">
                {isEditMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <Textarea 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell others a bit about yourself..."
                        className="resize-none" 
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </h3>
                      <p>{profile?.username || "Not set"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </h3>
                      <p className="text-gray-600">
                        {profile?.bio || "No bio provided yet."}
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => setIsEditMode(true)}
                      className="bg-hearmeout-purple hover:bg-hearmeout-purple-dark mt-2"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show online status</h3>
                  <p className="text-sm text-gray-600">
                    Allow others to see when you're online
                  </p>
                </div>
                <Switch 
                  checked={profile?.is_online || false}
                  onCheckedChange={(checked) => {
                    updateProfile({ is_online: checked });
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Available for conversations</h3>
                  <p className="text-sm text-gray-600">
                    Mark yourself as available to receive conversation requests
                  </p>
                </div>
                <Switch 
                  checked={profile?.is_available || false}
                  onCheckedChange={(checked) => {
                    updateProfile({ is_available: checked });
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email notifications</h3>
                  <p className="text-sm text-gray-600">
                    Receive email notifications for new messages
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
            <p className="text-gray-600 mb-4">
              These actions are irreversible. Please proceed with caution.
            </p>
            
            <div className="space-y-4">
              <Button 
                variant="destructive"
                onClick={() => toast.error("This functionality is not implemented yet.")}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
