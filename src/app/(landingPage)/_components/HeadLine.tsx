import React from "react";

interface HeadLineProps {
  title: string;
}

function HeadLine({ title }: HeadLineProps) {
  return (
    <div className="flex items-center justify-center gap-5 !z-20">
      <img
        src="assets/landing_page/headline.svg"
        alt="Headline"
        className="!z-20"
      />

      <h3 className="text-primary !z-20">{title}</h3>
    </div>
  );
}

export default HeadLine;
