"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define data type for each data point
interface Data {
  name: string;
  amount: number;
}

// Sample data for net worth chart
const data: Data[] = [
  { name: "Jan", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", amount: Math.floor(Math.random() * 2000) + 500 },
];

// NetWorthChart component renders a line chart for net worth
const NetWorthChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
        {/* Tooltip component */}
        <Tooltip />
        {/* Line component */}
        <Line type="monotone" dataKey="amount" stroke="#57CC99" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetWorthChart;
