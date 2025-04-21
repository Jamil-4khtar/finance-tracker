"use client";

import React from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { getMonthlyData, getCategoryTotals } from "@/hooks/transactionSelectors";
import { MonthlyChart } from "@/components/MonthlyChart";
import { CategoryPieChart } from "@/components/CategoryPieChart"; // Add this import

export default function DashboardPage() {
  const { transactions } = useTransactions();
  const monthlyData = getMonthlyData(transactions);
  const categoryTotals = getCategoryTotals(transactions);

  // Calculate total expenses
  const total = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  // Find most recent transaction
  const mostRecent = transactions.length
    ? transactions.reduce((a, b) => (a.date > b.date ? a : b))
    : null;

  const topCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <main className=" space-y-6 w-full min-h-screen p-6 bg-gradient-to-b from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] text-gray-200">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold">${total.toFixed(2)}</p>
        </div>
        <div className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Most Recent</h2>
          {mostRecent ? (
            <div>
              <div className="font-medium">{mostRecent.description}</div>
              <div className="text-sm text-gray-500">{mostRecent.date}</div>
              <div className="text-sm">{mostRecent.category}</div>
              <div className="text-lg font-bold">${parseFloat(mostRecent.amount).toFixed(2)}</div>
            </div>
          ) : (
            <p>-</p>
          )}
        </div>
        <div className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Top Category</h2>
          <p className="text-2xl font-bold">{topCategory}</p>
        </div>
      </div>
      {/* Add MonthlyChart and CategoryPieChart here */}
      <div className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
        <MonthlyChart data={monthlyData || []} />
      </div>
      <div className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
        <CategoryPieChart transactions={transactions} />
      </div>
    </main>
  );
}