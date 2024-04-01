"use client"
import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

// Define data type for each segment of the pie chart
interface Data {
  name: string;
  value: number;
}

// Sample data for the pie chart
const data: Data[] = [
  { name: "Food", value: Math.floor(Math.random() * 1000) + 500 },
  { name: "Transportation", value: Math.floor(Math.random() * 1000) + 500 },
  { name: "Entertainment", value: Math.floor(Math.random() * 1000) + 500 },
  { name: "Utilities", value: Math.floor(Math.random() * 1000) + 500 },
  { name: "Others", value: Math.floor(Math.random() * 1000) + 500 }
];

// Define colors for each segment of the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Budgets component renders the pie chart
export function Budgets() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        {/* Render pie */}
        <Pie
          data={data}
          paddingAngle={2}
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {/* Render each segment with custom color */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* Render tooltip */}
        <Tooltip />
        {/* Render legend */}
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Customized label component for pie chart segments
const renderCustomizedLabel: React.FC<any> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  // Calculate position for the label
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  // Render the label
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
