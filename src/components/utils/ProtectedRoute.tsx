// Import necessary modules from React and Next.js
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";

// Define the props interface for the ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Define the ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // State to manage authentication status
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Effect to check authentication status on component mount
  useEffect(() => {
    // Retrieve access token from localStorage
    const token = localStorage.getItem("accessToken");

    // If no access token is found, redirect to login page
    if (!token) {
      redirect("/login");
    }

    // Set authentication status to true
    setAuthenticated(true);
  }, []);

  // If not authenticated, render nothing
  if (!authenticated) {
    return null;
  }

  // If authenticated, render children components
  return <>{children}</>;
};

// Export the ProtectedRoute component
export default ProtectedRoute;
