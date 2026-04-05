import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const SummaryCard = ({ title, amount, icon: Icon, color, trend, trendValue, delay = "" }) => {
  const colorMap = {
    blue:  { bg: "bg-sky-50",    icon: "bg-sky-500",    text: "text-sky-600",    border: "border-sky-100"  },
    green: { bg: "bg-emerald-50", icon: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-100" },
    red:   { bg: "bg-red-50",    icon: "bg-red-500",    text: "text-red-600",    border: "border-red-100"  },
  };
  const c = colorMap[color] ?? colorMap.blue;

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-slate-400";

  return (
    <div
      className={`
        bg-white rounded-2xl p-5 border ${c.border}
        shadow-sm hover:shadow-md transition-all duration-300
        hover:-translate-y-0.5
        animate-fade-up ${delay}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`w-9 h-9 rounded-xl ${c.icon} flex items-center justify-center shadow-sm`}>
          {Icon && <Icon size={16} className="text-white" />}
        </div>
      </div>

      <p
        className="text-2xl font-bold text-slate-800 mb-2 animate-count-up"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        ₹ {amount}
      </p>

      {trendValue && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon size={13} />
          <span>{trendValue} vs last month</span>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
