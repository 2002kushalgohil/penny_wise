"use client";

import React, { useState } from "react";
import TopBar from "./_components/TopBar"; // Importing TopBar component
import { Button } from "@/components/ui/button"; // Importing Button component
import { TransactionTable } from "./_components/TransactionTable"; // Importing TransactionTable component
import TransactionDialog from "./_components/TransactionDialog";

// Define a unified type for transactions
interface TransactionItem {
  type: string;
  source: string;
  amount: number;
  date: Date;
  financeType: "income" | "expense"; // New property to categorize as income or expense
  note?: string;
  invoiceUrl?: string;
  tags?: string[];
}

// Define types for income and expenses data
interface PageProps {}

// Function to combine and sort transactions by date
function combineAndSortByDate(
  transactions: TransactionItem[]
): TransactionItem[] {
  // Sort the transactions by date (latest first)
  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Define data for income and expenses
const data: TransactionItem[] = [
  {
    type: "Salary",
    source: "ABC Company",
    amount: 5000,
    date: new Date("2024-04-01T08:00:00"),
    financeType: "income", // Categorizing as income
    note: "Monthly salary",
    invoiceUrl: "https://example.com/receipt123",
    tags: ["income", "salary"],
  },
  {
    type: "Freelance",
    source: "XYZ Client",
    amount: 1500,
    invoiceUrl: "https://example.com/receipt456",
    tags: ["income", "freelance"],
    note: "Design project completion",
    financeType: "income", // Categorizing as income
    date: new Date("2024-03-25T15:30:00"),
  },
  {
    type: "Food",
    source: "Restaurant A",
    amount: 50,
    invoiceUrl: "https://example.com/receipt789",
    tags: ["expense", "food"],
    note: "Lunch with colleagues",
    financeType: "expense", // Categorizing as expense
    date: new Date("2024-04-01T12:45:00"),
  },
  {
    type: "Transportation",
    source: "City Center",
    amount: 30,
    date: new Date("2024-03-30T09:20:00"),
    financeType: "expense", // Categorizing as expense
    note: "Taxi ride to the airport",
    invoiceUrl: "https://example.com/receipt012",
    tags: ["expense", "transportation"],
  },
];

// Combine and sort transactions
const transactions = combineAndSortByDate(data);

// Define the page component
const Page: React.FC<PageProps> = () => {
  const [isCreateTransaction, setIsCreateTransaction] =
    useState<boolean>(false);
  return (
    <div className="w-full h-full space-y-4">
      <TopBar />
      <Button onClick={() => setIsCreateTransaction(true)}>
        Add a transaction
      </Button>
      <TransactionTable transactions={transactions} />

      <TransactionDialog
        isCreateTransaction={isCreateTransaction}
        setIsCreateTransaction={setIsCreateTransaction}
      />
    </div>
  );
};

export default Page;
