"use client";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

const primaryColor = "rgb(157, 77%, 60%)"; // Your primary color

export function Incomes() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
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
