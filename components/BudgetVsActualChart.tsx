"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Budget } from "@/hooks/useBudgets";

interface Props {
  budgets: Budget[];
  getActualSpent: (category: string, month: string) => number;
  selectedMonth: string;
}

export function BudgetVsActualChart({ budgets, getActualSpent, selectedMonth }: Props) {
  // Prepare data for the selected month
  const data = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => ({
      category: b.category,
      Budgeted: b.amount,
      Actual: getActualSpent(b.category, b.month),
    }));

  if (data.length === 0) {
    return <div className="text-gray-500">No budgets for this month.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Budgeted" fill="#8884d8" />
        <Bar dataKey="Actual" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}