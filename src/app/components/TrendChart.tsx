import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", sales: 8500 },
  { day: "Tue", sales: 9200 },
  { day: "Wed", sales: 11400 },
  { day: "Thu", sales: 10800 },
  { day: "Fri", sales: 13200 },
  { day: "Sat", sales: 14800 },
  { day: "Sun", sales: 12486 },
];

export function TrendChart() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
          7-Day Performance
        </h3>
        <div className="mt-1 text-2xl font-bold tabular-nums text-[#111827]">
          $80,386
        </div>
        <p className="text-xs text-[#9CA3AF]">Total weekly sales</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
            dx={-10}
            domain={[0, 16000]}
            ticks={[0, 4000, 8000, 12000, 16000]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "12px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
            labelStyle={{ color: "#6B7280", marginBottom: "4px" }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#064E3B"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#064E3B", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
