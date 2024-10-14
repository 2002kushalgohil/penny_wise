import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

function Hero({ setIsEmailSignupDialog }: HeroProps) {
  return (
    <div className="dots" id="Home">
      <div className="h-80 w-80 rounded-full bg-secondary blur-[200px] absolute -top-40 -left-40" />
      <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute bottom-0 right-40" />

      <img
        className="absolute -top-[50px] md:-top-[200px] -left-0"
        src="assets/landing_page/HERO_ETC.png"
        alt="Laptop"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 content-center h-screen w-screen globalPadding">
        <div className="grid gap-5">
          <h1 className="gradientText text-3xl md:text-5xl z-10">
            Take Control of Your Finances with Penny Wise
          </h1>
          <p className="z-10">
            Effortlessly Manage Your Budget and Take Strides Toward Achieving
            Financial Freedom
          </p>

          <div className="flex items-start justify-start gap-5 mt-5">
            <Button
              onClick={() => setIsEmailSignupDialog(true)}
              size="lg"
              className="z-10"
            >
              JOIN THE WAITLIST
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <img
            className="w-full md:absolute md:w-4/6 md:top-[15%] md:-right-1/4 z-10"
            src="assets/landing_page/HERO_LAPTOP.png"
            alt="Laptop"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
