import React, { ReactNode } from "react";
import Logo from "../utils/Logo";
import { Toaster } from "@/components/ui/sonner";

// Define props interface for the layout component
interface LayoutProps {
  children: ReactNode;
}

// AuthLayout component
const AuthLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="dots h-full">
      <div className="globalPadding relative h-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        {/* Logo and content */}
        <div className="flex items-start justify-center flex-col relative">
          {/* Logo */}
          <div className="mb-5 md:mb-10 absolute top-0 left-0">
            <Logo />
          </div>
          {/* Children components */}
          {children}
        </div>

        {/* Decorative circle */}
        <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute top-1/2 left-1/4" />

        {/* Image */}
        <div className="bg-primary rounded-lg hidden md:flex items-center justify-center p-10">
          <img
            src="/assets/landing_page/Info_Black.png"
            className="w-full"
            alt="Information"
          />
        </div>
      </div>
      {/* Render toaster component */}
      <Toaster />
    </div>
  );
};

export default AuthLayout;
