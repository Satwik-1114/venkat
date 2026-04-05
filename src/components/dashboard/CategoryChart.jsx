import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
        <p className="font-medium text-slate-300">{payload[0].name}</p>
        <p className="font-bold text-sky-400 mt-0.5">₹ {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CategoryChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-fade-up delay-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-base font-bold text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Spending Breakdown
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">By category</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={52}
              outerRadius={80}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

      
        <div className="flex-1 flex flex-col gap-2.5 min-w-0 w-full sm:w-auto">
          {data.map((item, i) => {
            const pct = total ? ((item.value / total) * 100).toFixed(0) : 0;
            return (
              <div key={item.name} className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="text-xs text-slate-600 truncate flex-1">{item.name}</span>
                <span className="text-xs font-semibold text-slate-800 flex-shrink-0">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
