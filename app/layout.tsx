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
    <html lang="en">
      <body className="...">
        <TransactionsProvider>
          <nav className="bg-white dark:bg-zinc-900 shadow mb-8">
            <div className="container mx-auto flex gap-6 py-4">
              <Link href="/" className="font-medium hover:underline">
                Home
              </Link>
              <Link href="/dashboard" className="font-medium hover:underline">
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="font-medium hover:underline"
              >
                Transactions
              </Link>
            </div>
          </nav>
          {children}
        </TransactionsProvider>
      </body>
    </html>
  );
}
