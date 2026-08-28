import { authorityMetrics } from "@/data/paths";

export function MetricsStrip() {
  return (
    <section className="flex w-full border-b border-[var(--grid)]">
      {authorityMetrics.map((metric, index) => (
        <div
          key={metric.label}
          className={
            "flex flex-1 flex-col gap-[8px] px-[32px] py-[30px] " +
            (index < authorityMetrics.length - 1
              ? "border-r border-[var(--grid)]"
              : "")
          }
        >
          <span className="font-mono-plex text-[40px] font-medium tracking-[-1px] text-[var(--text)]">
            {metric.value}
          </span>
          <span className="font-mono-plex text-[10px] leading-[1.4] tracking-[0.9px] text-[var(--text-dim)]">
            {metric.label}
          </span>
          <span className="text-[11px] text-[var(--text-faint)]">
            {metric.detail}
          </span>
        </div>
      ))}
    </section>
  );
}
