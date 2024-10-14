import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

interface ThemeSwitcherProps {
  isCustomBg: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isCustomBg }) => {
  const [theme, setTheme] = useState<string>("light");

  const onThemeSwitcher = (newTheme: string) => {
    setTheme(newTheme);
    document.body.className = newTheme; // Apply the theme to the body
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage
  };

  // Load the theme from localStorage on component mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.className = storedTheme; // Apply the saved theme
    }
  }, []);

  return (
    <Tabs onValueChange={onThemeSwitcher} value={theme} className="!z-20">
      <TabsList
        className={`!z-20 ${
          isCustomBg ? "bg-background" : ""
        } rounded-xl px-2`}
      >
        <TabsTrigger value="light" className="!z-20">
          <SunIcon />
        </TabsTrigger>

        <TabsTrigger value="dark" className="!z-20">
          <MoonIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
