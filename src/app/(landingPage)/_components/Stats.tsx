import React from "react";

interface Statistic {
  title: string;
  value: string;
}

function Stats() {
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
        {stats.map((data, index) => {
          return (
            <div
              className="text-center flex flex-col items-center justify-center gap-2"
              key={index}
            >
              <h2 className="gradientText text-4xl md:text-6xl !z-20">
                {data.value}
              </h2>
              <p className="!z-20">{data.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
