"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type MonthlyData = {
  month: string;
  total: number;
};

type MonthlyChartProps = {
  data: MonthlyData[];
};

export function MonthlyChart({ data }: MonthlyChartProps) {
  if (data.length === 0) {
    return <div>No data to display.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
