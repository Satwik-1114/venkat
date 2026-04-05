import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  { to: "/",             label: "Dashboard",    icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight  },
  { to: "/insights",     label: "Insights",     icon: BarChart3       },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      
      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-[260px] bg-[#0f172a] text-white flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Wallet size={16} className="text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Fintrak
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        
        <p className="px-6 text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Menu
        </p>

        
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                animate-slide-left delay-${(i + 1) * 100}
                ${
                  isActive
                    ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`transition-colors ${
                      isActive ? "text-sky-400" : "text-slate-500"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span>{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        
        <div className="p-4 m-3 mb-4 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            U
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">User</p>
            <p className="text-xs text-slate-500 truncate">user@fintrak.app</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
