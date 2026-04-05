import { useState } from "react";
import SearchBar from "../transactions/SearchBar";
import FilterBar from "../transactions/FilterBar";
import TransactionTable from "../transactions/TransactionTable";
import { Plus, ArrowUpDown, X } from "lucide-react";

const Transactions = ({ role, transactions, setTransactions }) => {
  const [search,    setSearch]    = useState("");
  const [filter,    setFilter]    = useState("all");
  const [sortBy,    setSortBy]    = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [form, setForm] = useState({ date: "", category: "", amount: "", type: "income" });

  const handleAdd = () => {
    if (!form.date || !form.category || !form.amount) return;
    setTransactions([
      ...transactions,
      { id: Date.now(), date: form.date, category: form.category, amount: Number(form.amount), type: form.type },
    ]);
    setForm({ date: "", category: "", amount: "", type: "income" });
    setShowModal(false);
  };

  const filtered = transactions
    .filter((txn) => {
      const matchSearch = txn.category.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || txn.type === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

  const totalIncome  = filtered.filter(t => t.type === "income" ).reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="animate-fade-up">

      
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="text-xs text-slate-400 mt-0.5">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        {role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="
              flex items-center gap-2 px-4 py-2.5 rounded-xl
              bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium
              shadow-sm shadow-sky-500/30 transition-all duration-200
              hover:-translate-y-0.5 active:translate-y-0
            "
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-xl border border-emerald-100 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Filtered Income</span>
          <span className="text-sm font-bold text-emerald-600">₹ {totalIncome.toLocaleString()}</span>
        </div>
        <div className="bg-white rounded-xl border border-red-100 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Filtered Expense</span>
          <span className="text-sm font-bold text-red-500">₹ {totalExpense.toLocaleString()}</span>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-2.5 mb-4">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar filter={filter} setFilter={setFilter} />

        
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
          <ArrowUpDown size={13} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm text-slate-600 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <span className="text-slate-300">|</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm text-slate-600 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      
      <TransactionTable transactions={filtered} />

      
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            
            
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
              <h2
                className="text-lg font-bold text-slate-800"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                New Transaction
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            
            <div className="px-6 py-5 flex flex-col gap-4">
              
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Type</label>
                <div className="flex gap-2">
                  {["income", "expense"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                        form.type === t
                          ? t === "income"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-red-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all"
                />
              </div>

             
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Salary, Groceries..."
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all placeholder-slate-300"
                />
              </div>

              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition-all placeholder-slate-300"
                />
              </div>
            </div>

            
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition-all hover:-translate-y-0.5"
              >
                Add Transaction
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
