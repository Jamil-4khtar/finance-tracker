import { Inter } from "next/font/google"
import "./globals.css"
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-semibold">Finance Tracker</Link>
                <div className="space-x-4">
                  <a href="/dashboard" className="hover:text-primary">Dashboard</a>
                  <a href="/transactions" className="hover:text-primary">Transactions</a>
                  <a href="/budgets" className="hover:text-primary">Budgets</a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Finance Tracker © {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}