import React, { ReactNode } from "react";
import Logo from "../utils/Logo";
import { Toaster } from "@/components/ui/sonner";

// Define props interface for the layout component
interface LayoutProps {
  children: ReactNode;
}

// AuthLayout component
const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="dots h-full w-full flex items-center justify-center overflow-hidden">
      <div className="globalPadding relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 w-full max-w-[2000px] h-full max-h-[1000px] bg-primary-foreground dark:bg-muted rounded-none 2xl:rounded-3xl">
        {/* Logo and content */}
        <div className="flex items-start justify-center flex-col relative h-full overflow-hidden px-1">
          <div className="mb-5 md:mb-10 absolute top-0 left-0">
            <Logo />
          </div>
          {children}
        </div>

        {/* Decorative circle */}
        <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute top-1/2 left-1/4" />

        {/* Image */}
        <div className="bg-primary rounded-2xl hidden md:flex items-center justify-center p-10 h-full overflow-hidden">
          <img
            src="/assets/landing_page/Info_Black.png"
            className="w-full p-10 2xl:p-20"
            alt="Information"
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
