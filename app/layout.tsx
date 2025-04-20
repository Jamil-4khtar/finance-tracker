import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { TransactionsProvider } from "@/context/TransactionsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Visualizer",
  description: "Track and visualize your personal finances",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <TransactionsProvider>
          <header className="w-full border-b mb-8">
            <nav className="container mx-auto flex items-center gap-6 py-4">
              <Link href="/" className="font-bold text-lg">Finance Visualizer</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/transactions">Transactions</Link>
              {/* Add Budgets link */}
              <Link href="/budgets">Budgets</Link>
            </nav>
          </header>
          {children}
        </TransactionsProvider>
      </body>
    </html>
  );
}
