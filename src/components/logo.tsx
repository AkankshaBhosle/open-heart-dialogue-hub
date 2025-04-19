
import { Heart } from "lucide-react";

export const Logo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl"
  };

  return (
    <div className="flex items-center gap-2">
      <Heart className={`text-hearmeout-purple ${sizeClasses[size]}`} />
      <span className={`font-bold ${sizeClasses[size]}`}>
        <span className="text-hearmeout-purple">Hear</span>
        <span className="text-hearmeout-blue-dark">Me</span>
        <span className="text-hearmeout-purple">Out</span>
      </span>
    </div>
  );
};
