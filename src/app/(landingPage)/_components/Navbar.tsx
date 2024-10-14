import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";
import Logo from "@/components/utils/Logo";

const generateNavbarLink = (
  label: string,
  isMobile: boolean,
  setIsFullNav: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return (
    <a
      href={`#${label}`}
      className={`opacity-70 hover:opacity-100 hover:underline hover:!text-primary transition-all cursor-pointer ${
        isMobile && "text-2xl mb-5"
      }`}
      onClick={() => {
        setIsFullNav(false);
      }}
    >
      {label}
    </a>
  );
};

// Navbar component
const Navbar: React.FC<{
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsEmailSignupDialog }) => {
  const [isFullNav, setIsFullNav] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const toggleNavbar = () => {
    setIsFullNav((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isFullNav ? "hidden" : "";
  }, [isFullNav]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`globalPadding fixed top-0 left-0 w-full !py-5 z-50 flex items-center justify-between gap-10 transition-all duration-200 ${
          scrollPosition > 10 ? "backdrop-blur-lg" : ""
        }`}
      >
        <a href="#Home">
          <Logo />
        </a>
        <div className="hidden lg:flex items-center justify-start gap-5">
          {generateNavbarLink("Home", false, setIsFullNav)}
          {generateNavbarLink("About", false, setIsFullNav)}
          {generateNavbarLink("Features", false, setIsFullNav)}
          {generateNavbarLink("Pricing", false, setIsFullNav)}
          {generateNavbarLink("FAQs", false, setIsFullNav)}
          {generateNavbarLink("Contact-Us", false, setIsFullNav)}
        </div>
        <Button
          onClick={() => setIsEmailSignupDialog(true)}
          className="hidden lg:flex"
          size="lg"
        >
          JOIN THE WAITLIST
        </Button>
        <Button
          onClick={toggleNavbar}
          variant="ghost"
          className="flex lg:hidden"
        >
          {isFullNav ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </Button>
      </div>
      <div
        className={`globalPadding flex fixed top-0 right-0 !py-5 h-screen w-full backdrop-blur-lg backdrop-filter lg:hidden flex-col items-center z-50 ${
          isFullNav ? "transform translate-x-0" : "transform translate-x-full"
        } `}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div className="w-full flex items-center justify-between">
          <a href="#home">
            <Logo />
          </a>

          <Button
            onClick={toggleNavbar}
            variant="ghost"
            className="flex lg:hidden"
          >
            <Cross1Icon />
          </Button>
        </div>

        <div className="flex items-center justify-start flex-col gap-5 mt-20">
          {generateNavbarLink("Home", true, setIsFullNav)}
          {generateNavbarLink("About", true, setIsFullNav)}
          {generateNavbarLink("Features", true, setIsFullNav)}
          {generateNavbarLink("Pricing", true, setIsFullNav)}
          {generateNavbarLink("FAQs", true, setIsFullNav)}
          {generateNavbarLink("Contact-Us", true, setIsFullNav)}
        </div>
      </div>
    </>
  );
};

export default Navbar;
