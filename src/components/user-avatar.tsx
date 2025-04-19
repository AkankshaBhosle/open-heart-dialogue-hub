
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserAvatarProps = {
  src?: string;
  name?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  isTherapist?: boolean;
};

export const UserAvatar = ({ 
  src, 
  name, 
  fallback, 
  size = "md",
  isTherapist = false
}: UserAvatarProps) => {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback;
    if (name) {
      const nameParts = name.split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    return "";
  };

  const borderClass = isTherapist 
    ? "ring-2 ring-hearmeout-green-dark" 
    : "";

  return (
    <Avatar className={`${sizeClass[size]} ${borderClass}`}>
      {src && <img src={src} alt={name || "User"} />}
      <AvatarFallback className="bg-hearmeout-purple-light text-hearmeout-purple-dark">
        {getFallbackInitials() || <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
};
