"use client"
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Define data type for each data point
interface Data {
  name: string;
  amount: number;
}

// Sample data for incomes
const data: Data[] = [
  { name: "Jan", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", amount: Math.floor(Math.random() * 2000) + 500 },
];

// Define primary color
const primaryColor = "rgb(157, 77%, 60%)"; // Your primary color

// Incomes component renders an area chart for incomes
export function Incomes() { 
  return (
    <ResponsiveContainer width="100%" height={350}>
      {/* AreaChart component */}
      <AreaChart data={data}>
        {/* XAxis component */}
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* YAxis component */}
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        {/* Area component */}
        <Area
          type="monotone"
          dataKey="amount"
          className="fill-primary"
          stroke={primaryColor}
          fill={primaryColor}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
