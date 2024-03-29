import React, { ReactNode } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";

// Define props interface for the Layout component
interface LayoutProps {
  children: ReactNode;
}

// Layout component
const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
}

export default Layout;
