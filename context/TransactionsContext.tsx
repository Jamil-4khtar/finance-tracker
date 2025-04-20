"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

type Transaction = {
  amount: string;
  date: string;
  description: string;
  category: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  monthlyData: { month: string; total: number }[];
  error: string;
  editIndex: number | null;
  setEditIndex: (index: number | null) => void;
  addTransaction: (transaction: Transaction) => boolean;
  updateTransaction: (index: number, transaction: Transaction) => boolean;
  deleteTransaction: (index: number) => void;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("transactions");
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const map: { [month: string]: number } = {};

    transactions.forEach((tx) => {
      if (!tx.date) return;
      const month = tx.date.slice(0, 7);
      const amt = parseFloat(tx.amount);
      if (!isNaN(amt)) {
        map[month] = (map[month] || 0) + amt;
      }
    });

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total }));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    if (
      !transaction.amount ||
      !transaction.date ||
      !transaction.description ||
      !transaction.category
    ) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    setTransactions((prev) => [...prev, transaction]);
    return true;
  };

  const updateTransaction = (index: number, transaction: Transaction) => {
    if (
      !transaction.amount ||
      !transaction.date ||
      !transaction.description ||
      !transaction.category
    ) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    setTransactions((prev) =>
      prev.map((t, i) => (i === index ? transaction : t))
    );
    return true;
  };

  const deleteTransaction = (index: number) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  const value = {
    transactions,
    monthlyData,
    error,
    editIndex,
    setEditIndex,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext);
  if (!ctx)
    throw new Error(
      "useTransactionsContext must be used within TransactionsProvider"
    );
  return ctx;
}
