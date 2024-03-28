import React from "react";

// Interface for single statistic
interface Statistic {
  title: string;
  value: string;
}

// Stats component
function Stats() {
  // Statistics data
  const stats: Statistic[] = [
    {
      title: "Happy Customers",
      value: "15+",
    },
    {
      title: "Hours spent on craft",
      value: "1k+",
    },
    {
      title: "Review rate",
      value: "4.8",
    },
  ];

  return (
    <div className="globalPadding w-full">
      <div className="w-full flex items-center justify-center flex-col md:flex-row gap-10 md:gap-20">
        {/* Mapping through statistics data */}
        {stats.map((data, index) => {
          return (
            <div className="text-center flex flex-col items-center justify-center gap-2" key={index}>
              {/* Displaying statistic value */}
              <h2 className="gradientText text-4xl md:text-6xl !z-20">
                {data.value}
              </h2>
              {/* Displaying statistic title */}
              <p className="!z-20">{data.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
