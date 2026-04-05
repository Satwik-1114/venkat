import SummaryCard from "../dashboard/SummaryCard";
import BalanceChart from "../dashboard/BalanceChart";
import CategoryChart from "../dashboard/CategoryChart";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const Dashboard = ({ transactions = [] }) => {
  const totalIncome  = transactions.filter(t => t.type === "income" ).reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance      = totalIncome - totalExpense;


  const now = new Date();
  const balanceData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const monthIncome  = transactions
      .filter(t => { const td = new Date(t.date); return td.getFullYear() === y && td.getMonth() === m && t.type === "income"; })
      .reduce((s, t) => s + t.amount, 0);
    const monthExpense = transactions
      .filter(t => { const td = new Date(t.date); return td.getFullYear() === y && td.getMonth() === m && t.type === "expense"; })
      .reduce((s, t) => s + t.amount, 0);
    return { name: MONTH_NAMES[m], balance: monthIncome - monthExpense };
  });


  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const categoryData = Object.entries(catMap).map(([name, value]) => ({ name, value }));

 
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Total Balance"
          amount={balance.toLocaleString()}
          icon={Wallet}
          color="blue"
          trend="up"
          trendValue="+12%"
          delay="delay-100"
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome.toLocaleString()}
          icon={TrendingUp}
          color="green"
          trend="up"
          trendValue="+8%"
          delay="delay-200"
        />
        <SummaryCard
          title="Total Expenses"
          amount={totalExpense.toLocaleString()}
          icon={TrendingDown}
          color="red"
          trend="down"
          trendValue="-3%"
          delay="delay-300"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <BalanceChart data={balanceData} />
        {categoryData.length > 0 && <CategoryChart data={categoryData} />}
      </div>

      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm animate-fade-up delay-400">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <h2
            className="text-base font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Recent Transactions
          </h2>
          <a
            href="/transactions"
            className="text-xs font-medium text-sky-500 hover:text-sky-700 transition-colors"
          >
            View all →
          </a>
        </div>
        <div className="divide-y divide-slate-50">
          {recent.map((txn) => (
            <div key={txn.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white
                  ${txn.type === "income" ? "bg-emerald-500" : "bg-red-400"}`}
              >
                {txn.type === "income" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{txn.category}</p>
                <p className="text-xs text-slate-400">{txn.date}</p>
              </div>
              <p
                className={`text-sm font-semibold flex-shrink-0 ${
                  txn.type === "income" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}₹ {txn.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
