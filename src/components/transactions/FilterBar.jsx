const FilterBar = ({ filter, setFilter }) => {
  const options = [
    { value: "all",     label: "All"     },
    { value: "income",  label: "Income"  },
    { value: "expense", label: "Expense" },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setFilter(opt.value)}
          className={`
            px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${
              filter === opt.value
                ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
