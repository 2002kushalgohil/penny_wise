import React from "react";
import TopBar from "./_components/TopBar";
import CardsWorkflow from "./_workflows/CardsWorkflow";
import ChartsWorkflow from "./_workflows/ChartsWorkflow";

const Page: React.FC = () => (
  <div className="w-full h-full space-y-4">
    <TopBar />
    <div className="space-y-4">
      <CardsWorkflow />
      <ChartsWorkflow />
    </div>
  </div>
);

export default Page;
