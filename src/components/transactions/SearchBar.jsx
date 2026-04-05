import { Search, X } from "lucide-react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative flex-1 min-w-[180px]">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full pl-9 pr-8 py-2 text-sm
          bg-white border border-slate-200 rounded-xl
          text-slate-700 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400
          transition-all duration-200
        "
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
