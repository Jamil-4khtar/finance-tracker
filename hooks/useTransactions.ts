import { useState, useEffect } from "react";

export interface Transaction {
  _id?: string;
  amount: string;
  date: string;
  description: string;
  category: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isList, setIsList] = useState(false)

  // Fetch all transactions from the backend
  useEffect(() => {
    setIsList(true)
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data)
        setIsList(false)
      })
      .catch(() => {
        setError("Failed to load transactions.")
        setIsList(false)
      });
  }, []);

  // Add a new transaction
  const addTransaction = async (transaction: Transaction) => {
    if (!transaction.amount || !transaction.date || !transaction.description || !transaction.category) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      const newTx = await res.json();
      setTransactions([newTx, ...transactions]);
      return true;
    } else {
      setError("Failed to add transaction.");
      return false;
    }
  };

  // Update an existing transaction
  const updateTransaction = async (index: number, transaction: Transaction) => {
    const tx = transactions[index];
    if (!tx || !tx._id) {
      setError("Transaction not found.");
      return false;
    }
    if (!transaction.amount || !transaction.date || !transaction.description || !transaction.category) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(Number(transaction.amount))) {
      setError("Amount must be a number.");
      return false;
    }
    setError("");
    const res = await fetch(`/api/transactions/${tx._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      const updatedTx = await res.json();
      const updatedList = [...transactions];
      updatedList[index] = updatedTx;
      setTransactions(updatedList);
      return true;
    } else {
      setError("Failed to update transaction.");
      return false;
    }
  };

  // Delete a transaction
  const deleteTransaction = async (index: number) => {
    const tx = transactions[index];
    if (!tx || !tx._id) {
      setError("Transaction not found.");
      return;
    }
    const res = await fetch(`/api/transactions/${tx._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTransactions(transactions.filter((_, i) => i !== index));
      setError("");
    } else {
      setError("Failed to delete transaction.");
    }
  };

  return {
    transactions,
    error,
    editIndex,
    setEditIndex,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    isList
    // ...other exports...
  };
}