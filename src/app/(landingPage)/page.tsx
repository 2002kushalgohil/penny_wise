"use client"
// Import necessary dependencies
import React, { useState } from "react";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Companies from "./_components/Companies";
import Features from "./_components/Features";
import Info from "./_components/Info";
import Stats from "./_components/Stats";
import Testimonial from "./_components/Testimonial";
import Pricing from "./_components/Pricing";
import FAQ from "./_components/FAQ";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import EmailDialog from "./_components/utils/EmailDialog";
import { Toaster } from "@/components/ui/sonner";


// Define the page component
function Page() {
  // State to control the email signup dialog
  const [isEmailSignupDialog, setIsEmailSignupDialog] = useState<boolean>(false);

  return (
    <div className="flex justify-center">
      <div className="overflow-hidden w-full max-w-[2000px]">
        {/* Navbar component */}
        <Navbar setIsEmailSignupDialog={setIsEmailSignupDialog} />
        
        {/* Various page sections */}
        <Hero setIsEmailSignupDialog={setIsEmailSignupDialog} />
        <About />
        <Companies />
        <Features />
        <Info />
        <Stats />
        <Testimonial />
        <Pricing setIsEmailSignupDialog={setIsEmailSignupDialog} />
        <FAQ />
        <Contact />
        <Footer setIsEmailSignupDialog={setIsEmailSignupDialog} />
      </div>
      
      {/* Email signup dialog component */}
      <EmailDialog
        isEmailSignupDialog={isEmailSignupDialog}
        setIsEmailSignupDialog={setIsEmailSignupDialog}
      />
      <Toaster /> {/* Render toaster component */}
    </div>
  );
}

export default Page;
