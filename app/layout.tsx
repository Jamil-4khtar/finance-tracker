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
      <body
        className={`
          ${inter.className} min-h-full
          bg-gradient-to-br from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)]
          dark:bg-gradient-to-br dark:from-[oklch(0.129_0.042_264.695)] dark:to-[oklch(0.208_0.042_265.755)]
          text-gray-900 dark:text-gray-100
        `}
      >
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
                <div className="space-x-6">
                  <Link href="/dashboard" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Dashboard</Link>
                  <Link href="/transactions" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors">Transactions</Link>
                  <Link href="/budgets" className="font-medium border rounded p-2 bg-gradient-to-br from-text-primary to-secondary bg-clip-text text-transparent hover:from-secondary hover:to-primary transition-colors ">Budgets</Link>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1 p-4">{children}</main>
          <footer className="border-t border-gray-600/50 dark:border-zinc-800/50">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-800 dark:text-gray-400">
              Finance Tracker © {new Date().getFullYear()}
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}