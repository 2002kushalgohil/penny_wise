"use client";
import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

export function Expenses() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#57CC99"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
          strokeDasharray="5 5"
        />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
