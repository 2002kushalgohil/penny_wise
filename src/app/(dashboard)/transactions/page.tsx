import React from "react";
import TopBar from "./_components/TopBar";
import { Button } from "@/components/ui/button";

// Define the props interface for the page component
interface PageProps {}

// Define the page component
const Page: React.FC<PageProps> = () => {
  return (
    <div className="w-full h-full space-y-4">
      {/* Render the top bar component */}
      <TopBar />
      <div>
        <Button>Add Transaction</Button>
      </div>
    </div>
  );
};

export default Page;
