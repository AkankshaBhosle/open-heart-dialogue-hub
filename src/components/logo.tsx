
import { HandHeart } from "lucide-react";

export const Logo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2 group">
      <HandHeart className={`
        ${sizeClasses[size]} 
        text-hearmeout-purple 
        transition-all duration-300 
        group-hover:rotate-6 
        group-hover:scale-110 
        group-hover:text-hearmeout-purple-dark
      `} />
      <span className={`font-bold ${sizeClasses[size]} flex items-center`}>
        <span className="text-hearmeout-purple transition-all duration-300 group-hover:text-opacity-70">Hear</span>
        <span className="text-hearmeout-blue-dark mx-1 transition-all duration-300 group-hover:text-opacity-70">Me</span>
        <span className="text-hearmeout-purple transition-all duration-300 group-hover:text-opacity-70">Out</span>
      </span>
    </div>
  );
};
