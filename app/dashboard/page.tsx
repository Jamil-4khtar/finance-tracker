import React from "react";

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Example summary cards */}
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Most Recent</h2>
          <p className="text-2xl font-bold">-</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
          <p className="text-2xl font-bold">-</p>
        </div>
      </div>
      {/* Placeholder for charts */}
      <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Charts Coming Soon</h2>
        <p>Visualize your spending with interactive charts.</p>
      </div>
    </main>
  );
}