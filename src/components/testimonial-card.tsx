
import { UserAvatar } from "@/components/user-avatar";

type TestimonialCardProps = {
  quote: string;
  name: string;
  title?: string;
  avatarSrc?: string;
  className?: string;
};

export const TestimonialCard = ({ 
  quote, 
  name, 
  title, 
  avatarSrc, 
  className = "" 
}: TestimonialCardProps) => {
  return (
    <div className={`p-6 rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="flex flex-col h-full">
        <div className="mb-6 flex-grow">
          <p className="text-gray-700 italic">"{quote}"</p>
        </div>
        
        <div className="flex items-center gap-3">
          <UserAvatar src={avatarSrc} name={name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{name}</p>
            {title && <p className="text-sm text-gray-500">{title}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
