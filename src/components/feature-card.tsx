
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export const FeatureCard = ({ icon: Icon, title, description, className = "" }: FeatureCardProps) => {
  return (
    <div className={`p-6 rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-hearmeout-purple-light mb-4">
        <Icon className="w-6 h-6 text-hearmeout-purple" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
