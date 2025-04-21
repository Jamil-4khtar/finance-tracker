import React from "react";
import { Budget } from "@/hooks/useBudgets";
import { BudgetForm } from "./BudgetForm";
import { Button } from "./ui/button";

interface BudgetListProps {
  budgets: Budget[];
  onEdit: (index: number, budget: Budget) => void;
  onDelete: (index: number) => void;
  editingIndex: number | null;
  onCancelEdit: () => void;
  onUpdate: (index: number, budget: Budget) => Promise<boolean>;
}

export function BudgetList({
  budgets,
  onEdit,
  onDelete,
  editingIndex,
  onCancelEdit,
  onUpdate,
}: BudgetListProps) {
  return (
    <div className="space-y-4">
      {budgets.length === 0 && (
        <div className="text-gray-500">No budgets set yet.</div>
      )}
      {budgets.map((budget, idx) =>
        editingIndex === idx ? (
          <div key={budget._id || idx} className="bg-[var(--brand-dark-shade)] shadow rounded-lg p-4">
            <BudgetForm
              initial={budget}
              onSubmit={async (updated) => await onUpdate(idx, updated)}
              onCancel={onCancelEdit}
            />
          </div>
        ) : (
          <div
            key={budget._id || idx}
            className="flex items-center justify-between bg-[var(--brand-dark-shade)] shadow rounded-lg p-4"
          >
            <div>
              <div className="font-semibold">{budget.category}</div>
              <div className="text-sm text-gray-500">
                {budget.month} &mdash; ${budget.amount}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => onEdit(idx, budget)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(idx)}>
                Delete
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}