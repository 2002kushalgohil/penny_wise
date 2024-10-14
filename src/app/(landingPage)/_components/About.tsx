import React from "react";
import HeadLine from "./HeadLine";

function About() {
  return (
    <div
      id="About"
      className="globalPadding flex items-center justify-center flex-col gap-10"
    >
      <HeadLine title="INTRODUCING PENNY WISE" />

      <div className="w-full md:w-8/12 text-left md:text-center">
        <h3 className="gradientText text-2xl md:text-4xl !z-20">
          Penny Wise simplifies budgeting, expense tracking, and goal setting in
          one intuitive platform. Take control of your finances and pave the way
          to financial freedom effortlessly with Penny Wise.
        </h3>
      </div>
    </div>
  );
}

export default About;
