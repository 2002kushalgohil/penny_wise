"use client";
// Importing required modules from nextjs and recharts
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type DataPoint = {
  name: string;
  income: number;
  expense: number;
};

const data: DataPoint[] = [
  {
    name: "Jan",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    income: Math.floor(Math.random() * 5000) + 1000,
    expense: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${value}`} // Formatting tick labels as currency
        />
        <Tooltip />
        <Bar
          dataKey="income"
          stackId="a"
          radius={[8, 8, 0, 0]}
          className="fill-primary" // Adding fill class for primary income
        />
        <Bar
          dataKey="expense"
          stackId="a"
          radius={[8, 8, 0, 0]}
          className="fill-secondary" // Adding fill class for secondary expenses
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
