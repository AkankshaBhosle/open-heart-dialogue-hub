
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type CTABoxProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "outline";
  className?: string;
  icon?: ReactNode;
};

export const CTABox = ({
  title,
  description,
  buttonText,
  buttonLink,
  variant = "default",
  className = "",
  icon,
}: CTABoxProps) => {
  const bgClass = variant === "default" 
    ? "bg-gradient-to-r from-hearmeout-purple to-hearmeout-blue text-white" 
    : "bg-white border border-gray-200";
  
  const textClass = variant === "default" 
    ? "text-white" 
    : "text-gray-900";

  return (
    <div className={`${bgClass} rounded-xl p-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className={`text-2xl font-bold ${textClass}`}>{title}</h3>
          </div>
          <p className={variant === "default" ? "text-white/80" : "text-gray-600"}>
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <Link to={buttonLink}>
            <Button 
              size="lg" 
              className={
                variant === "default" 
                  ? "bg-white text-hearmeout-purple hover:bg-gray-100" 
                  : "bg-hearmeout-purple text-white hover:bg-hearmeout-purple-dark"
              }
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
