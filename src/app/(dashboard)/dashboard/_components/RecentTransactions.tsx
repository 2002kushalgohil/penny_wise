import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define props type for IncomeExpenseItem component
type IncomeExpenseItemProps = {
  avatarFallbackText: string;
  name: string;
  email: string;
  amount: string;
};

// IncomeExpenseItem component
const IncomeExpenseItem: React.FC<IncomeExpenseItemProps> = ({
  avatarFallbackText,
  name,
  email,
  amount,
}) => {
  return (
    <div className="flex items-center">
      {/* Avatar */}
      <Avatar className="h-9 w-9">
        <AvatarFallback>{avatarFallbackText}</AvatarFallback>
      </Avatar>
      {/* Details */}
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      {/* Amount */}
      <div className={`ml-auto font-medium ${amount.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{amount}</div>
    </div>
  );
};

// RecentTransactions component
export const RecentTransactions: React.FC = () => {
  return (
    <div className="space-y-8 max-h-80 overflow-y-scroll customScroll">
      {/* Render transactions */}
      {[
         {
          avatarFallbackText: "OM",
          name: "Salary",
          email: "income@email.com",
          amount: "+$5,000.00",
        },
        {
          avatarFallbackText: "JL",
          name: "Rent",
          email: "expenses@email.com",
          amount: "-$1,200.00",
        },
        {
          avatarFallbackText: "OM",
          name: "Salary",
          email: "income@email.com",
          amount: "+$5,000.00",
        },
        {
          avatarFallbackText: "JL",
          name: "Rent",
          email: "expenses@email.com",
          amount: "-$1,200.00",
        },
        {
          avatarFallbackText: "OM",
          name: "Salary",
          email: "income@email.com",
          amount: "+$5,000.00",
        },
        {
          avatarFallbackText: "JL",
          name: "Rent",
          email: "expenses@email.com",
          amount: "-$1,200.00",
        },
        {
          avatarFallbackText: "OM",
          name: "Salary",
          email: "income@email.com",
          amount: "+$5,000.00",
        },
        {
          avatarFallbackText: "JL",
          name: "Rent",
          email: "expenses@email.com",
          amount: "-$1,200.00",
        },
        {
          avatarFallbackText: "OM",
          name: "Salary",
          email: "income@email.com",
          amount: "+$5,000.00",
        },
        {
          avatarFallbackText: "JL",
          name: "Rent",
          email: "expenses@email.com",
          amount: "-$1,200.00",
        },
      ].map((item, index) => (
        <IncomeExpenseItem
          key={index}
          avatarFallbackText={item.avatarFallbackText}
          name={item.name}
          email={item.email}
          amount={item.amount}
        />
      ))}
    </div>
  );
};
