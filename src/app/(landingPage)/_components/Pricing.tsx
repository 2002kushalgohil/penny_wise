import React from "react";
import { Button } from "@/components/ui/button";

// Interface for pricing features
interface PricingFeature {
  imgSrc: string;
  title: string;
}

// Interface for pricing plan
interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PricingProps {
  setIsEmailSignupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

// Pricing component
const Pricing: React.FC<PricingProps> = ({ setIsEmailSignupDialog }) => {
  // Pricing features data
  const pricingFeatures: PricingFeature[] = [
    {
      imgSrc: "track.svg",
      title: "Track Transactions",
    },
    {
      imgSrc: "insights.svg",
      title: "Insights Charts",
    },
    {
      imgSrc: "wallet.svg",
      title: "Multiple Wallet",
    },
    {
      imgSrc: "bank.svg",
      title: "Bank Integration",
    },
  ];

  // Pricing plan data
  const pricing: PricingPlan[] = [
    {
      name: "BASIC",
      price: "FREE",
      description: "Start managing your finances for free with our basic plan.",
      features: [
        "Budget Tracking",
        "Expense Monitoring",
        "Goal Setting",
        "Bill Reminders",
      ],
    },
    {
      name: "PRO",
      price: "$9/month",
      description:
        "Unlock advanced features for comprehensive financial management.",
      features: [
        "All FREE plan features",
        "Income Management",
        "Enhanced Analytics",
        "Export Reports for Any Date Range",
      ],
    },
    {
      name: "EXPERT",
      price: "$15/month",
      description:
        "Get access to premium tools for ultimate financial control.",
      features: [
        "All PRO plan features",
        "Premium Analytics",
        "Bill Reminders with Customization",
        "Premium Customer Support",
      ],
    },
  ];

  return (
    <div id="Pricing" className="globalPadding flex items-center justify-center flex-col gap-16">
      <div className="w-full md:w-7/12 flex items-center justify-center flex-col gap-5">
        <h3 className="gradientText text-2xl md:text-4xl !z-20">
          Choose Your Plan
        </h3>
      </div>

      <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Pricing features */}
        {pricingFeatures.map((data, index) => (
          <div key={index} className="flex items-center justify-start gap-5">
            <img
              src={`assets/landing_page/pricing/${data.imgSrc}`}
              className="w-12 md:w-14 !z-20"
              alt={data.title}
            />
            <p className="!z-20">{data.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-10">
        {/* Pricing plans */}
        {pricing.map((data, index) => (
          <div
            key={index}
            className="customCard w-full !z-20 flex items-start justify-between flex-col gap-5"
          >
            <span className="bg-primary px-5 py-2 text-xs rounded-full">
              {data.name}
            </span>
            <h3 className="gradientText text-2xl md:text-4xl">
              {data.price}
            </h3>
            <p>{data.description}</p>

            <h4 className="mt-10">FEATURES</h4>

            {/* Features list */}
            <ul className="list-disc grid gap-2 marker:text-primary mb-5">
              {data.features.map((feature, featureIndex) => (
                <li key={featureIndex}>
                  <p>{feature}</p>
                </li>
              ))}
            </ul>

            {/* Button to join the waiting list */}
            <Button onClick={() => setIsEmailSignupDialog(true)} size="lg" className="z-10 w-full">
              JOIN WAITING LIST
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
