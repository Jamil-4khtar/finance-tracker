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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "12px",
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          />
          <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
