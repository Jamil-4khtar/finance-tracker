import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Budget } from "@/hooks/useBudgets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetFormProps {
  onSubmit: (budget: Budget) => Promise<boolean>;
  initial?: Budget;
  onCancel?: () => void;
}

const CATEGORY_OPTIONS = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

export function BudgetForm({ onSubmit, initial, onCancel }: BudgetFormProps) {
  const [category, setCategory] = useState(initial?.category || "");
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [month, setMonth] = useState(initial?.month || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      category,
      amount: Number(amount),
      month,
    });
    setCategory("");
    setAmount("");
    setMonth("");
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        {/* <select
          className="w-full border rounded px-3 py-2"
          title="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select> */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-transparent backdrop-blur-md shadow-none border border-white/20">
            {CATEGORY_OPTIONS.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Month</label>
        <Input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button className="bg-gradient-to-r from-text-slate-400 to-gray-200 bg-clip-text text-transparent  hover:from-primary hover:to-secondary border-2 border-y-gray-500 shadow" type="submit">{initial ? "Update" : "Add"} Budget</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}