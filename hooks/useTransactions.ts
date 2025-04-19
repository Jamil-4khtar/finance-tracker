"use client";

import { useState, useMemo } from 'react';

type Transaction = {
  amount: string;
  date: string;
  description: string;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

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
    if (!transaction.amount || !transaction.date || !transaction.description) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    setTransactions([...transactions, transaction]);
    return true;
  };

  const updateTransaction = (index: number, transaction: Transaction) => {
    if (!transaction.amount || !transaction.date || !transaction.description) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    const updated = [...transactions];
    updated[index] = transaction;
    setTransactions(updated);
    return true;
  };

  const deleteTransaction = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
    }
  };

  return {
    transactions,
    monthlyData,
    error,
    editIndex,
    setEditIndex,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};