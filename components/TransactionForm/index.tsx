"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TransactionList } from "../TransactionList";
import { MonthlyChart } from "../MonthlyChart";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionForm() {
  const {
    transactions,
    monthlyData,
    error,
    editIndex,
    setEditIndex,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = { amount, date, description };

    const success =
      editIndex !== null
        ? updateTransaction(editIndex, transaction)
        : addTransaction(transaction);

    if (success) {
      setAmount("");
      setDate("");
      setDescription("");
      setEditIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    const transaction = transactions[index];
    setAmount(transaction.amount);
    setDate(transaction.date);
    setDescription(transaction.description);
    setEditIndex(index);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        {error && <div className="text-red-500">{error}</div>}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Amount</label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 96.01"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Grocery shopping"
          />
        </div>
        <div className="space-x-2">
          <Button type="submit">{editIndex !== null ? "Update" : "Add"}</Button>
          {editIndex !== null && (
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setAmount("");
                setDate("");
                setDescription("");
                setEditIndex(null);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />

      <MonthlyChart data={monthlyData} />
    </div>
  );
}
