import type { Stat } from "@/data/caseStudies";
import CountUp from "./CountUp";

export default function StatGrid({
  stats,
  tone = "card",
  columns = 3,
}: {
  stats: Stat[];
  tone?: "card" | "plain";
  columns?: 3 | 4;
}) {
  const cols = columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  const bg = tone === "card" ? "bg-card-bg" : "bg-background";
  return (
    <div className={`grid grid-cols-2 ${cols} gap-4`}>
      {stats.map((s) => (
        <div key={s.label} className={`${bg} border border-card-border rounded-xl p-5 md:p-6 text-foreground text-center`}>
          <div className="text-3xl md:text-4xl font-bold font-mono">
            <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <div className="text-xs md:text-sm mt-1 uppercase tracking-wider opacity-70">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
