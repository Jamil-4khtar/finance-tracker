"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false); // Hide spinner after route/path changes
  }, [pathname, setIsLoading]);

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gradient-to-br from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] dark:bg-gradient-to-br dark:from-[oklch(0.129_0.042_264.695)] dark:to-[oklch(0.208_0.042_265.755)] text-gray-900 dark:text-gray-100`}>
        {isLoading && <LoadingSpinner />}
        <div className="min-h-screen flex flex-col">
          <nav className="shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  onClick={() => pathname !== "/" ? setIsLoading(true) : undefined}
                  className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight hover:from-secondary hover:to-primary"
                >
                  Finance Tracker
                </Link>
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
                <div className="hidden md:flex space-x-6">
                  <Link href="/dashboard" onClick={() => pathname !== "/dashboard" ? setIsLoading(true) : undefined} className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Dashboard</Link>
                  <Link href="/transactions" onClick={() => pathname !== "/transactions" ? setIsLoading(true) : undefined} className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Transactions</Link>
                  <Link href="/budgets" onClick={() => pathname !== "/budgets" ? setIsLoading(true) : undefined} className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Budgets</Link>
                </div>
              </div>
              <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-4`}>
                <Link 
                  href="/dashboard" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false)
                    if (pathname !== "/dashboard") setIsLoading(true)
                  }}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/transactions" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false)
                    if (pathname !== "/transactions") setIsLoading(true)
                  }}
                >
                  Transactions
                </Link>
                <Link 
                  href="/budgets" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false)
                    if (pathname !== "/budgets") setIsLoading(true)
                  }}
                >
                  Budgets
                </Link>
              </div>
            </div>
          </nav>
          <main className="flex-1 min-h-full">{children}</main>
          <footer className="border-t border-gray-600/50 dark:border-zinc-800/50">
            <div className="container mx-auto text-center p-2 text-sm text-gray-900 dark:text-gray-400">
              Finance Tracker © {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <LayoutContent>{children}</LayoutContent>
    </LoadingProvider>
  );
}