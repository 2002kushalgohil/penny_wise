import React from "react";
import HeadLine from "./HeadLine";

// Define interface for a single feature
interface Feature {
  imgSrc: string;
  title: string;
  description: string;
}

// Define props interface for the Features component
interface FeaturesProps {}

// Features component
const Features: React.FC<FeaturesProps> = () => {
  // Data for features
  const data: Feature[] = [
    {
      imgSrc: "Money.svg",
      title: "Budget Tracking",
      description:
        "Keep track of your spending easily with our intuitive budget tracker",
    },
    {
      imgSrc: "Goal.svg",
      title: "Goal Setting",
      description:
        "Set and achieve financial milestones effortlessly with our tools.",
    },
    {
      imgSrc: "Analytics.svg",
      title: "Report Generation",
      description:
        "Gain insights into your financial habits with detailed reports.",
    },
    {
      imgSrc: "Bill.svg",
      title: "Bill Reminders",
      description:
        "Stay ahead of due dates with our convenient bill reminder feature.",
    },
    {
      imgSrc: "Category.svg",
      title: "Expense Categorisation",
      description: "Categorise your expenses for better understanding",
    },
  ];

  // Tags for features
  const tags: string[] = [
    "Finance",
    "Budgeting",
    "Tracking",
    "Insights",
    "Goals",
    "Reports",
    "Reminder",
  ];

  // Function to render a single feature card
  const featureCard = (
    feature: Feature,
    isLongCard: boolean,
    index: number
  ) => {
    return (
      <div
        key={index}
        className={`customCard w-full !z-20 flex items-start justify-between flex-col gap-10 ${
          isLongCard && "lg:flex-row-reverse lg:items-center"
        }`}
      >
        <div>
          <img
            className="w-24 md:w-36"
            src={`assets/landing_page/features/${feature.imgSrc}`}
            alt={feature.title}
          />
        </div>
        <div>
          <h4 className="text-2xl">{feature.title}</h4>
          <p>{feature.description}</p>
        </div>
      </div>
    );
  };

  // Function to render a single feature chip
  const featureChip = (tag: string, index: number) => {
    return (
      <div
        key={index}
        className="customCard !z-20 !rounded-xl !p-4 md:!p-5 flex items-start justify-between gap-5"
      >
        <img src="assets/landing_page/headline.svg" alt="Headline" />
        <p>{tag}</p>
      </div>
    );
  };

  return (
    <div
      id="Features"
      className="globalPadding flex items-center justify-center flex-col gap-10 relative"
    >
      {/* Background circles */}
      <div className="h-80 w-80 rounded-full bg-primary blur-[250px] absolute bottom-24 left-40 z-10" />
      <div className="h-80 w-80 rounded-full bg-secondary blur-[250px] absolute top-0 right-0" />

      {/* Headline */}
      <HeadLine title="WHAT YOU'LL GET" />

      {/* Subtitle */}
      <div className="w-full md:w-7/12 text-left md:text-center">
        <h3 className="gradientText text-2xl md:text-4xl !z-20">
          Discover financial control with personalised insights
        </h3>
      </div>

      {/* Features */}
      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 !z-20">
        {data.slice(0, 3).map((feature, index) => {
          return featureCard(feature, false, index);
        })}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 !z-20">
        {data.slice(3, 5).map((feature, index) => {
          return featureCard(feature, true, index);
        })}
      </div>

      {/* Feature tags */}
      <div className="w-full md:w-8/12 flex items-center justify-center flex-wrap gap-10 !z-20">
        {tags.map((tag, index) => {
          return featureChip(tag, index);
        })}
      </div>
    </div>
  );
};

export default Features;
