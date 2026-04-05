import { TrendingUp, TrendingDown } from "lucide-react";

const categoryColors = {
  Salary:    "bg-sky-100 text-sky-700",
  Freelance: "bg-violet-100 text-violet-700",
  Food:      "bg-amber-100 text-amber-700",
  Shopping:  "bg-pink-100 text-pink-700",
  Rent:      "bg-slate-100 text-slate-700",
  Travel:    "bg-emerald-100 text-emerald-700",
};

const TransactionRow = ({ txn }) => {
  const catStyle = categoryColors[txn.category] ?? "bg-slate-100 text-slate-600";

  return (
    <tr className="group border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      <td className="py-3.5 px-4 text-sm text-slate-500 whitespace-nowrap">{txn.date}</td>
      <td className="py-3.5 px-4">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${catStyle}`}>
          {txn.category}
        </span>
      </td>
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full
            ${txn.type === "income"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
            }`}
        >
          {txn.type === "income" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
        </span>
      </td>
      <td className={`py-3.5 px-4 text-sm font-semibold whitespace-nowrap ${
        txn.type === "income" ? "text-emerald-600" : "text-red-500"
      }`}>
        {txn.type === "income" ? "+" : "-"}₹ {txn.amount.toLocaleString()}
      </td>
    </tr>
  );
};

export default TransactionRow;
