
import React from 'react';

const supportQuotes = [
  "Every feeling is valid. You are not alone.",
  "Listening is the first step to healing.",
  "Your mental health matters.",
  "Vulnerability is strength.",
  "It's okay not to be okay.",
  "Sharing your story can be the beginning of your healing.",
  "You are stronger than you know.",
  "Compassion starts with understanding.",
  "Your feelings are heard and valued.",
  "Mental health is a journey, not a destination."
];

export const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-hearmeout-purple-light/30 py-4">
      <div className="animate-marquee whitespace-nowrap">
        {supportQuotes.map((quote, index) => (
          <span 
            key={index} 
            className="inline-block px-8 text-lg font-medium text-hearmeout-purple-dark"
          >
            • {quote}
          </span>
        ))}
      </div>
    </div>
  );
};
