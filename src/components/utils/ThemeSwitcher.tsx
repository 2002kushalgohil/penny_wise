// Import necessary modules from React and Radix UI
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

// Define props interface for ThemeSwitcher component
interface ThemeSwitcherProps {
  isCustomBg: boolean;
}

// Define the ThemeSwitcher component
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isCustomBg }) => {
  // Initialize currentTheme state based on body class
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  // Function to toggle between light and dark themes and update body class
  const onThemeSwitcher = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    document.body.className = newTheme;
  };

  // Effect to set initial theme based on body class
  useEffect(() => {
    const bodyClassName = document.body.className;
    setCurrentTheme(bodyClassName);
  }, []);

  return (
    <Tabs
      onValueChange={onThemeSwitcher}
      value={currentTheme}
      className="!z-20"
    >
      {/* Render TabsList with conditional background color */}
      <TabsList className={`!z-20 ${isCustomBg && "bg-background"} rounded-full px-2`}>
        {/* Render TabsTrigger for light theme */}
        <TabsTrigger value="light" className="!z-20">
          <SunIcon />
        </TabsTrigger>
        {/* Render TabsTrigger for dark theme */}
        <TabsTrigger value="dark" className="!z-20">
          <MoonIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

// Export the ThemeSwitcher component
export default ThemeSwitcher;
