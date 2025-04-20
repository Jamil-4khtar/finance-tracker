// Define types for clarity
import type { Transaction } from "./useTransactions";

interface MonthlyData {
  month: string;
  total: number;
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthlyMap: Record<string, number> = {};
  transactions.forEach((tx) => {
    if (!tx.date) return;
    const month = tx.date.slice(0, 7);
    const amt = parseFloat(tx.amount);
    if (!isNaN(amt)) {
      monthlyMap[month] = (monthlyMap[month] || 0) + amt;
    }
  });
  return Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));
}

export function getCategoryTotals(transactions: Transaction[]): Record<string, number> {
  const categoryTotals: Record<string, number> = {};
  transactions.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + parseFloat(tx.amount);
  });
  return categoryTotals;
}