import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-[var(--brand-card-from)] to-[var(--brand-card-to)] dark:from-[oklch(0.129_0.042_264.695)] dark:to-[oklch(0.208_0.042_265.755)] rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to Finance Tracker
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Link 
            href="/dashboard"
            className="group p-6 rounded-xl shadow-2xl border border-gray-400 dark:border-zinc-800 hover:scale-[1.03] hover:shadow-xl transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-colors">
              View Dashboard
            </h2>
            <p className="text-slate-900 dark:text-gray-300">Check your financial overview and recent activity</p>
          </Link>
          <Link 
            href="/transactions"
            className="group p-6 rounded-xl shadow-2xl dark:bg-zinc-900/80 border border-gray-400 dark:border-zinc-800 hover:scale-[1.03] hover:shadow-xl transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-colors">
              Manage Transactions
            </h2>
            <p className="text-slate-900 dark:text-gray-300">Add and review your financial transactions</p>
          </Link>
        </div>
      </div>
    </div>
  )
}