"use client"; 

import { Inter } from "next/font/google"
import "./globals.css"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LoadingSpinner } from "@/components/LoadingSpinner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStartLoading = () => setIsLoading(true);
    const handleStopLoading = () => setIsLoading(false);

    // Add route change listeners
    window.addEventListener('beforeunload', handleStartLoading);
    
    // Handle route changes
    handleStopLoading();

    return () => {
      window.removeEventListener('beforeunload', handleStartLoading);
    };
  }, [pathname, searchParams]);

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
                  className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight hover:from-secondary hover:to-primary"
                >
                  Finance Tracker
                </Link>
                
                {/* Mobile menu button */}
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

                {/* Desktop menu */}
                <div className="hidden md:flex space-x-6">
                  <Link href="/dashboard" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Dashboard</Link>
                  <Link href="/transactions" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Transactions</Link>
                  <Link href="/budgets" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Budgets</Link>
                </div>
              </div>

              {/* Mobile menu */}
              <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 space-y-4`}>
                <Link 
                  href="/dashboard" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/transactions" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Transactions
                </Link>
                <Link 
                  href="/budgets" 
                  className="block font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
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
  )
}