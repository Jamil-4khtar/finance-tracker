"use client";

import React from "react";
import { Button } from "./ui/button";

type Transaction = {
  amount: string;
  date: string;
  description: string;
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((tx, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
          >
            <div className="space-x-4">
              <span>
                <strong>Amount: </strong>
                {tx.amount}
              </span>
              <span>
                <strong>Date: </strong>
                {tx.date}
              </span>
              <span>
                <strong>Description: </strong>
                {tx.description}
              </span>
            </div>
            <div className="space-x-2">
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => onEdit(idx)}
              >
                Edit
              </Button>
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={() => onDelete(idx)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
