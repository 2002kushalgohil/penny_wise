import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, CreditCard, DollarSign, Users } from "lucide-react";

// Define the data interface for cardData
interface CardData {
  title: string;
  backgroundColor: string;
  icon: JSX.Element;
  amount: string;
  change: string;
}

// Sample data for cards
const cardData: CardData[] = [
  {
    title: "Total Budget",
    backgroundColor: "#E3F5FF",
    icon: <DollarSign style={{ width: "15px" }} />,
    amount: "$45,231.89",
    change: "+20.1% from last month",
  },
  {
    title: "Expenses",
    backgroundColor: "#E5ECF6",
    icon: <Users style={{ width: "15px" }} />,
    amount: "-$2350",
    change: "-180.1% from last month",
  },
  {
    title: "Income",
    backgroundColor: "#E3F5FF",
    icon: <CreditCard style={{ width: "15px" }} />,
    amount: "+$12,234",
    change: "+19% from last month",
  },
  {
    title: "Savings",
    backgroundColor: "#E5ECF6",
    icon: <BarChart2 style={{ width: "15px" }} />,
    amount: "+$573",
    change: "+201 since last hour",
  },
];

// Define props interface for CardComponent
interface CardComponentProps extends CardData {}

// CardComponent renders a single card
const CardComponent: React.FC<CardComponentProps> = ({ title, backgroundColor, icon, amount, change }) => {
  return (
    <Card className={`border-0 !text-black`} style={{ backgroundColor: backgroundColor }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

// CardsWorkflow renders multiple cards using cardData
function CardsWorkflow() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((data, index) => (
        <CardComponent key={index} {...data} />
      ))}
    </div>
  );
}

export default CardsWorkflow;
