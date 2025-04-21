"use client";

import React from "react";
import { Button } from "./ui/button";

type Transaction = {
  amount: string;
  date: string;
  description: string;
  category: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return <div>No transactions yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-[var(--brand-dark-shade)] dark:bg-zinc-800">
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{tx.amount}</td>
              <td className="px-4 py-2">{tx.date}</td>
              <td className="px-4 py-2">{tx.description}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2 space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(idx)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(idx)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
