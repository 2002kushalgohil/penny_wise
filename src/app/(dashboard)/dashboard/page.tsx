import React from "react";
import TopBar from "./_components/TopBar";
import CardsWorkflow from "./_workflows/CardsWorkflow";
import ChartsWorkflow from "./_workflows/ChartsWorkflow";

// Define the props interface for the page component
interface PageProps {}

// Define the page component
const Page: React.FC<PageProps> = () => {
  return (
    <div className="w-full h-full space-y-4">
      {/* Render the top bar component */}
      <TopBar />
      <div className="space-y-4">
        {/* Render the cards workflow component */}
        <CardsWorkflow />
        {/* Render the charts workflow component */}
        <ChartsWorkflow />
      </div>
    </div>
  );
};

export default Page;
