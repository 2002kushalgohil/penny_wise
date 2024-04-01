import React from "react";
import { CalendarDateRangePicker } from "./CalendarDateRangePicker";
import { Button } from "@/components/ui/button";

// Define TopBar component
const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between flex-wrap space-y-4">
      {/* Dashboard Title */}
      <h2 className="text-3xl tracking-tight">Dashboard</h2>
      {/* Date Range Picker and Download Button */}
      <div className="flex items-center flex-wrap gap-4">
        <CalendarDateRangePicker />
        <Button>Download</Button>
      </div>
    </div>
  );
}

export default TopBar;
