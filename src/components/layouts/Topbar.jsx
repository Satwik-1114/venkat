import { useLocation } from "react-router-dom";
import { Menu, Bell, ChevronDown } from "lucide-react";

const routeLabels = {
  "/":             "Dashboard",
  "/transactions": "Transactions",
  "/insights":     "Insights",
};

const Topbar = ({ role, setRole, onMenuClick }) => {
  const { pathname } = useLocation();
  const pageTitle = routeLabels[pathname] ?? "Finance";

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-4 md:px-6 gap-4">
      
      
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
        >
          <Menu size={20} />
        </button>
        <h1
          className="text-lg md:text-xl font-bold text-slate-800 truncate"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {pageTitle}
        </h1>
      </div>

      
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">

        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              appearance-none pl-3 pr-7 py-1.5 text-sm font-medium
              bg-slate-100 border border-slate-200 rounded-lg
              text-slate-700 cursor-pointer
              hover:bg-slate-200 transition-colors
              focus:outline-none focus:ring-2 focus:ring-sky-500/40
            "
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>

        
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-500 border-2 border-white" />
        </button>

        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
          U
        </div>

      </div>
    </header>
  );
};

export default Topbar;
