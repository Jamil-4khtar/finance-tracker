"use client";

import React, { useEffect, useState } from "react";
import { useBudgets,  } from "@/hooks/useBudgets";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetList } from "@/components/BudgetList";
import { useTransactions } from "@/hooks/useTransactions";
import { BudgetVsActualChart } from "@/components/BudgetVsActualChart";
import { LoadingDiv } from "@/components/LoadingSpinner";

export default function BudgetsPage() {
  const { budgets, error, addBudget, updateBudget, deleteBudget } = useBudgets();
  const { transactions, isList } = useTransactions();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Initialize selectedMonth to the current month
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [flag, setFlag] = useState(true)
  useEffect(() => {
    if (!isList) {
      setFlag(false)
    }
  }, [isList])

  function getActualSpent(category: string, month: string) {
    return transactions
      .filter(
        (tx) =>
          tx.category === category &&
          tx.date.slice(0, 7) === month
      )
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  }

  const summary = budgets.reduce(
    (acc, budget) => {
      const actual = getActualSpent(budget.category, budget.month);
      if (actual > budget.amount) {
        acc.over += 1;
        acc.overspent += actual - budget.amount;
      } else {
        acc.under += 1;
        acc.underspent += budget.amount - actual;
      }
      return acc;
    },
    { over: 0, under: 0, overspent: 0, underspent: 0 }
  );

  // const handleEdit = (index: number) => setEditingIndex(index);
  // const handleCancelEdit = () => setEditingIndex(null);

  return (
    <main className="w-full min-h-screen p-6 bg-gradient-to-b from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] text-slate-200">
      <h1 className="text-2xl font-bold mb-6">Budgets</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-[var(--brand-dark-shade)] text-green-800 rounded px-4 py-2">
          Under budget: {summary.under}
        </div>
        <div className="bg-[var(--brand-dark-shade)] text-red-800 rounded px-4 py-2">
          Over budget: {summary.over}
        </div>
        <div className="bg-[var(--brand-dark-shade)] text-green-700 rounded px-4 py-2">
          Total underspent: ${summary.underspent.toFixed(2)}
        </div>
        <div className="bg-[var(--brand-dark-shade)] text-red-700 rounded px-4 py-2">
          Total overspent: ${summary.overspent.toFixed(2)}
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-medium">Select Month:</label>
        <input
          type="month"
          title="selectmonths"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="bg-[var(--brand-dark-shade)] dark:bg-zinc-900 shadow rounded-lg p-6 mb-8">
        {
          !flag ? <BudgetVsActualChart
                    budgets={budgets}
                    getActualSpent={getActualSpent}
                    selectedMonth={selectedMonth}
                  />
                  : <LoadingDiv/>
        }
        
      </div>

      <div className="bg-[var(--brand-dark-shade)] dark:bg-zinc-900 shadow rounded-lg p-6 mb-8">
        <BudgetForm onSubmit={addBudget} />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>


      <div className="space-y-4 mb-8">
        {budgets.map((budget) => {
          const actual = getActualSpent(budget.category, budget.month);
          const percent = budget.amount
            ? Math.min(100, Math.round((actual / budget.amount) * 100))
            : 0;
          return (
            <div
              key={budget._id}
              className="bg-[var(--brand-dark-shade)] dark:bg-zinc-800 rounded p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{budget.category} ({budget.month})</span>
                <span>
                  <span
                    className={
                      actual > budget.amount
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }
                  >
                    ${actual.toFixed(2)}
                  </span>
                  {" / "}
                  ${budget.amount.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-[var(--brand-dark-shade)] dark:bg-zinc-700 rounded h-2">
                <div
                  className={
                    "h-2 rounded " +
                    (actual > budget.amount
                      ? "bg-red-500"
                      : "bg-green-500")
                  }
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <BudgetList
        budgets={budgets}
        onEdit={setEditingIndex}
        onDelete={deleteBudget}
        editingIndex={editingIndex}
        onCancelEdit={() => setEditingIndex(null)}
        onUpdate={async (idx, updated) => {
          const success = await updateBudget(idx, updated);
          if (success) setEditingIndex(null);
          return success;
        }}
      />
    </main>
  );
}