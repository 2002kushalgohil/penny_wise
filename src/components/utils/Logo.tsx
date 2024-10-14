import React from "react";

// Define the Logo component
const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-start gap-5">
      {/* Logo images */}
      <img
        src="/logos/LogoBlack.svg"
        className="w-14 dark:hidden"
        alt="Penny Wise Logo - Black version"
      />
      <img
        src="/logos/LogoWhite.svg"
        className="w-14 hidden dark:flex"
        alt="Penny Wise Logo - White version"
      />
      {/* Logo title */}
      <h4 className="text-md font-bold">PENNY WISE</h4>
    </div>
  );
};

export default Logo;
