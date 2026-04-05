import TransactionRow from "./TransactionRow";

const TransactionTable = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Date</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Category</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</th>
              <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <TransactionRow key={txn.id} txn={txn} />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-400 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">🔍</span>
                    <span>No transactions found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
