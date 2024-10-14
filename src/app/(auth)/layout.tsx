import AuthLayout from "@/components/layouts/AuthLayout";
import React, { ReactNode } from "react";

// Define props interface for the layout component
interface LayoutProps {
  children: ReactNode;
}

// Layout component
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
}

export default Layout;
