"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TransactionList } from "../TransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import { useLoading } from "@/context/LoadingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const CATEGORY_OPTIONS = [
  "Food",
  "Utilities",
  "Leisure",
  "Housing",
  "Transport",
  "Health",
  "Education",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other"
];

export default function TransactionForm() {
  const {
    transactions,
    error,
    editIndex,
    setEditIndex,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();
  const {setIsLoading} = useLoading();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const transaction = { amount, date, description, category };
    console.log(transaction)
    const success =
      editIndex !== null
        ? await updateTransaction(editIndex, transaction)
        : await addTransaction(transaction);

    if (success) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("");
      setEditIndex(null);
    }
    setIsLoading(false)
  };

  const handleEdit = (index: number) => {
    const transaction = transactions[index];
    setAmount(transaction.amount);
    setDate(transaction.date);
    setDescription(transaction.description);
    setCategory(transaction.category || CATEGORY_OPTIONS[0]);
    setEditIndex(index);
  };

  return (
    <div className="space-y-8 p-6 text-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4 bg-[var(--brand-dark-shade)] p-6 rounded-2xl shadow-2xl">
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
        {/* --- Category Dropdown --- */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Category</label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent  className="bg-transparent backdrop-blur-md shadow-none border border-white/20">
              {CATEGORY_OPTIONS.map((opt, idx) => (
                <SelectItem key={idx} value={opt}>{opt}</SelectItem>
            ))}
            </SelectContent>
          </Select>


        </div>
        <div className="space-x-2">
            <Button
            type="submit"
            className="bg-gradient-to-r from-text-slate-400 to-gray-200 bg-clip-text text-transparent  hover:from-primary hover:to-secondary border-2 border-y-gray-500 shadow"
            >
            {editIndex !== null ? "Update" : "Add"}
            </Button>
          {editIndex !== null && (
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                setAmount("");
                setDate("");
                setDescription("");
                setCategory("");
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

    </div>
  );
}
