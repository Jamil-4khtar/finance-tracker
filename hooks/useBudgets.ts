import { useState, useEffect } from "react";

export interface Budget {
  _id?: string;
  category: string;
  amount: number;
  month: string; // Format: "YYYY-MM"
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch all budgets
  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => setBudgets(data))
      .catch(() => setError("Failed to load budgets."));
  }, []);

  // Add a new budget
  const addBudget = async (budget: Budget) => {
    if (!budget.category || !budget.amount || !budget.month) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });
    if (res.ok) {
      const newBudget = await res.json();
      setBudgets([newBudget, ...budgets]);
      return true;
    } else {
      setError("Failed to add budget.");
      return false;
    }
  };

  // Update an existing budget
  const updateBudget = async (index: number, budget: Budget) => {
    const b = budgets[index];
    if (!b || !b._id) {
      setError("Budget not found.");
      return false;
    }
    if (!budget.category || !budget.amount || !budget.month) {
      setError("All fields are required.");
      return false;
    }
    setError("");
    const res = await fetch(`/api/budgets/${b._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });
    if (res.ok) {
      const updatedBudget = await res.json();
      const updatedList = [...budgets];
      updatedList[index] = updatedBudget;
      setBudgets(updatedList);
      return true;
    } else {
      setError("Failed to update budget.");
      return false;
    }
  };

  // Delete a budget
  const deleteBudget = async (index: number) => {
    const b = budgets[index];
    if (!b || !b._id) {
      setError("Budget not found.");
      return;
    }
    const res = await fetch(`/api/budgets/${b._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setBudgets(budgets.filter((_, i) => i !== index));
      setError("");
    } else {
      setError("Failed to delete budget.");
    }
  };

  return {
    budgets,
    error,
    addBudget,
    updateBudget,
    deleteBudget,
  };
}