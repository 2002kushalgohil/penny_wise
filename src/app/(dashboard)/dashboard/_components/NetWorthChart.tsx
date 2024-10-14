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

interface Data {
  name: string;
  amount: number;
}

const data: Data[] = [
  { name: "Jan", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", amount: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", amount: Math.floor(Math.random() * 2000) + 500 },
];

const NetWorthChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#57CC99" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NetWorthChart;
