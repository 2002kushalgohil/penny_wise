import React from "react";
import HeadLine from "./HeadLine";

// Companies component
function Companies() {
  // List of company logos
  const companies: string[] = ["google.png", "amazon.png", "facebook.png", "netflix.png"];

  return (
    <div className="globalPadding flex items-center justify-center flex-col gap-10">
      {/* Headline */}
      <HeadLine title="COMPANIES USING PENNY WISE" />

      {/* Company logos */}
      <div className="flex items-center justify-center gap-10 flex-wrap w-full">
        {/* Render company logos */}
        {companies.map((item, index) => {
          return (
            <img
              key={index}
              src={`/assets/landing_page/logos/${item}`}
              alt={item}
              className="w-24"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Companies;
