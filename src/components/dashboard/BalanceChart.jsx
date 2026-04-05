import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
        <p className="font-medium text-slate-300 mb-1">{label}</p>
        <p className="font-bold text-sky-400">₹ {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const BalanceChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-fade-up delay-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-base font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Balance Trend
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Monthly overview</p>
        </div>
        <span className="text-xs font-medium bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full border border-sky-100">
          6 months
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#0ea5e9"
            strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={{ r: 3.5, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 5, fill: "#0ea5e9", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
