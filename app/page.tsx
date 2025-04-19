import Link from 'next/link';
import React from 'react';

function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Personal Finance Visualizer</h1>
      <p className="text-gray-700 mb-8 text-lg text-center max-w-xl">
        Track your expenses, visualize your spending, and manage your finances with ease.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/80 font-semibold transition">Go to Dashboard</Link>
        <Link href="/transactions" className="bg-secondary text-secondary-foreground px-6 py-3 rounded hover:bg-secondary/80 font-semibold transition">View Transactions</Link>
      </div>
    </main>
  );
}

export default HomePage;
