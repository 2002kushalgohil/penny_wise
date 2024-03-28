import React, { ReactNode } from "react";

// Define props interface for the layout component
interface LayoutProps {
  children: ReactNode;
}

// Layout component
function Layout({ children }: LayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default Layout;
