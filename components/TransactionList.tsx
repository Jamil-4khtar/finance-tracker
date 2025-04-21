"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useLoading } from "@/context/LoadingContext";
import { useTransactions } from "@/hooks/useTransactions";
import { LoadingBar } from "./LoadingSpinner";

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
  const {setIsLoading} = useLoading()
  const [flag, setFlag] = useState(true)
  const { isList } = useTransactions();

  useEffect(() => {
    if (!isList) {
      setFlag(false)
    }
  }, [isList])


  return (
    <div className="overflow-x-auto bg-[var(--brand-dark-shade)] p-6 rounded-2xl shadow-2xs">
      {flag && <LoadingBar><span>Transactions are being fetched...</span></LoadingBar>}
      {transactions.length > 0 ?
      <table className="min-w-full border rounded">
        <thead>
          <tr className=" dark:bg-zinc-800">
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
                  onClick={() =>{ 
                    onEdit(idx)
                    scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth"
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setIsLoading(true)
                    onDelete(idx)
                    setIsLoading(false)
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : !flag && <div>No Transactions yet.</div> }
    </div>
  );
}
