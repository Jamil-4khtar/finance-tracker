"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"
];

type CategoryPieChartProps = {
  transactions: {
    amount: string;
    category: string;
  }[];
};

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  // Group and sum by category
  const data = React.useMemo(() => {
    const map: { [cat: string]: number } = {};
    transactions.forEach(tx => {
      const amt = parseFloat(tx.amount);
      if (!isNaN(amt)) {
        map[tx.category] = (map[tx.category] || 0) + amt;
      }
    });
    return Object.entries(map).map(([category, total]) => ({
      category,
      total
    }));
  }, [transactions]);

  if (data.length === 0) {
    return <div>No category data to display.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, idx) => (
        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
      <Legend layout="horizontal" align="center" verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}