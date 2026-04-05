import { TrendingUp, TrendingDown, Tag, BarChart2 } from "lucide-react";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const Insights = ({ transactions = [] }) => {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3 animate-fade-up">
        <BarChart2 size={40} className="text-slate-300" />
        <p className="text-sm">No transaction data available yet.</p>
      </div>
    );
  }

  const totalIncome  = transactions.filter(t => t.type === "income" ).reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const netSavings   = totalIncome - totalExpense;
  const savingsRate  = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;


  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const catEntries = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const maxCat = catEntries[0]?.[1] || 1;

  return (
    <div className="animate-fade-up space-y-5">

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Income",    value: `₹ ${totalIncome.toLocaleString()}`,  color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: TrendingUp   },
          { label: "Total Expenses",  value: `₹ ${totalExpense.toLocaleString()}`, color: "text-red-500",     bg: "bg-red-50",     border: "border-red-100",     icon: TrendingDown },
          { label: "Net Savings",     value: `₹ ${netSavings.toLocaleString()}`,   color: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-100",     icon: TrendingUp   },
          { label: "Savings Rate",    value: `${savingsRate}%`,                    color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100",  icon: BarChart2    },
        ].map(({ label, value, color, bg, border, icon: Icon }, i) => (
          <div
            key={label}
            className={`${bg} border ${border} rounded-2xl p-5 animate-fade-up`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <Icon size={15} className={color} />
            </div>
            <p className={`text-xl font-bold ${color}`} style={{ fontFamily: "'Syne', sans-serif" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-up delay-200">
        <div className="flex items-center gap-2 mb-5">
          <Tag size={15} className="text-slate-400" />
          <h2
            className="text-base font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Spending by Category
          </h2>
        </div>

        <div className="space-y-4">
          {catEntries.map(([cat, amt], i) => {
            const pct = ((amt / maxCat) * 100).toFixed(0);
            return (
              <div key={cat} className="animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.07}s` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-slate-700">{cat}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-600">₹ {amt.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${pct}%`,
                      background: COLORS[i % COLORS.length],
                      animationDelay: `${0.3 + i * 0.08}s`,
                    }}
                  />
                </div>
              </div>
            );
          })}
          {catEntries.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-6">No expense data found.</p>
          )}
        </div>
      </div>

      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-fade-up delay-300">
        <h2
          className="text-base font-bold text-slate-800 mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Income vs Expenses
        </h2>
        <div className="flex gap-3 items-end h-28">
          {[
            { label: "Income",   val: totalIncome,  color: "bg-emerald-400" },
            { label: "Expenses", val: totalExpense, color: "bg-red-400"     },
          ].map(({ label, val, color }) => {
            const max = Math.max(totalIncome, totalExpense, 1);
            const h = Math.max(12, (val / max) * 100);
            return (
              <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-semibold text-slate-600">₹ {val.toLocaleString()}</span>
                <div className="w-full flex items-end justify-center">
                  <div
                    className={`w-full max-w-[60px] rounded-t-xl ${color} transition-all duration-700`}
                    style={{ height: `${h}%`, minHeight: "12px" }}
                  />
                </div>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Insights;
