import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to Finance Tracker</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Link 
            href="/dashboard"
            className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">View Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">Check your financial overview and recent activity</p>
          </Link>
          <Link 
            href="/transactions"
            className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Transactions</h2>
            <p className="text-gray-600 dark:text-gray-400">Add and review your financial transactions</p>
          </Link>
        </div>
      </div>
    </div>
  )
}