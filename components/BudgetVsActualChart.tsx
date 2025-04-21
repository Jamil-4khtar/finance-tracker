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
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="category" tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip contentStyle={{ fontSize: 12 }} cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
      <Legend wrapperStyle={{ fontSize: 12 }} />
      <Bar dataKey="Budgeted" fill="#4F46E5" radius={[4, 4, 0, 0]} />
      <Bar dataKey="Actual" fill="#10B981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}