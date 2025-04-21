import TransactionForm from "@/components/TransactionForm";

export default function TransactionsPage() {
  return (
      <main className=" w-full min-h-screen p-6 bg-gradient-to-b from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)]">
      {/* <h1 className="text-2xl font-bold mb-6">Transactions</h1> */}
      <div className="">
          <TransactionForm />
      </div>
    </main>
  );
}