import TransactionForm from "@/components/TransactionForm";

export default function TransactionsPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="space-y-8">
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
          <TransactionForm />
        </div>
      </div>
    </main>
  );
}