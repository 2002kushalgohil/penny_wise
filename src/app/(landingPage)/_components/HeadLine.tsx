import React from "react";

// Define props interface for the HeadLine component
interface HeadLineProps {
  title: string;
}

// HeadLine component
function HeadLine({ title }: HeadLineProps) {
  return (
    <div className="flex items-center justify-center gap-5 !z-20">
      {/* Headline image */}
      <img src="assets/landing_page/headline.svg" alt="Headline" className="!z-20" />
      
      {/* Headline title */}
      <h3 className="text-primary !z-20">{title}</h3>
    </div>
  );
}

export default HeadLine;
