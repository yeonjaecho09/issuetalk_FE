import { TrendingUp, TrendingDown, AlertTriangle, Target } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  icon: React.ReactNode;
}

function KPICard({ label, value, trend, icon }: KPICardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-[#6B7280]">
          {label}
        </span>
        <div className="text-[#9CA3AF]">{icon}</div>
      </div>

      <div className="mb-2">
        <div className="text-3xl font-bold tabular-nums text-[#111827]">
          {value}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          {trend.direction === "up" ? (
            <TrendingUp className="h-3 w-3 text-[#064E3B]" />
          ) : (
            <TrendingDown className="h-3 w-3 text-[#EF4444]" />
          )}
          <span
            className={`text-xs tabular-nums ${
              trend.direction === "up" ? "text-[#064E3B]" : "text-[#EF4444]"
            }`}
          >
            {trend.value}
          </span>
          <span className="text-xs text-[#9CA3AF]">vs yesterday</span>
        </div>
      )}
    </div>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <KPICard
        label="Sales Today"
        value="$12,486"
        trend={{ value: "+2.4%", direction: "up" }}
        icon={<TrendingUp className="h-5 w-5" />}
      />
      <KPICard
        label="Spoilage %"
        value="1.2%"
        trend={{ value: "-0.3%", direction: "up" }}
        icon={<AlertTriangle className="h-5 w-5" />}
      />
      <KPICard
        label="Low Stock Alerts"
        value="7"
        icon={<AlertTriangle className="h-5 w-5" />}
      />
      <KPICard
        label="Daily Target"
        value="84%"
        trend={{ value: "+5.2%", direction: "up" }}
        icon={<Target className="h-5 w-5" />}
      />
    </div>
  );
}
