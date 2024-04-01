"use client"
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define data type for each data point
interface Data {
  name: string;
  amount: number;
}

// Sample data for expenses
const data: Data[] = [
  { name: "Jan", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", amount: Math.floor(Math.random() * 2000) + 500 },
];

// Expenses component renders a line chart for expenses
export function Expenses() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      {/* LineChart component */}
      <LineChart data={data}>
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
        {/* Line component */}
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#57CC99"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
          strokeDasharray="5 5"
        />
        {/* Tooltip component */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
