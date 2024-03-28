import React from "react";

// Interface for single information item
interface InfoItem {
  imgSrc: string;
  description: string;
}

// Info component
function Info() {
  // Information data
  const info: InfoItem[] = [
    {
      imgSrc: "tracker.svg",
      description: "Keep track of spending with our intuitive budget tracker.",
    },
    {
      imgSrc: "speed.svg",
      description:
        "Set and achieve financial goals effortlessly with our tools.",
    },
    {
      imgSrc: "security.svg",
      description: "Financial data is kept safe and confidential.",
    },
  ];

  return (
    <div className="bgGrid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 content-center h-full min-h-screen w-screen globalPadding relative">
        {/* Background circle */}
        <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute bottom-24 right-1/4 z-10" />

        {/* Image section */}
        <div className="flex items-center justify-center">
          <img
            src="assets/landing_page/info.png"
            className="w-full"
            alt="Laptop"
          />
        </div>

        {/* Text section */}
        <div className="gap-5 flex items-start justify-center flex-col">
          <h3 className="gradientText text-2xl md:text-4xl font-semibold !z-20">
            Penny Wise: Budget-Friendly, Speedy, Secure
          </h3>
          <p className="!z-20">
            Unlock financial empowerment with Penny Wise, offering
            budget-friendly solutions, swift transactions..
          </p>

          {/* Info items */}
          <div className="w-full grid gap-5 mt-5 md:mt-10">
            {info.map((data, index) => {
              return (
                <div className="flex items-center justify-start gap-5 !z-20" key={index}>
                  <img className="!z-20" src={`assets/landing_page/info/${data.imgSrc}`} alt={data.imgSrc} />
                  <p className="!z-20">{data.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
