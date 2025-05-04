
import React from 'react';

// Reduced number of quotes for simplicity
const supportQuotes = [
  "Every feeling is valid. You are not alone.",
  "Your mental health matters.",
  "It's okay not to be okay.",
  "You are stronger than you know.",
  "Compassion starts with understanding."
];

export const Marquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-hearmeout-purple-light/30 py-3">
      <div className="animate-marquee whitespace-nowrap">
        {supportQuotes.map((quote, index) => (
          <span 
            key={index} 
            className="inline-block px-8 text-lg text-hearmeout-purple-dark"
          >
            {quote} •
          </span>
        ))}
      </div>
    </div>
  );
};
