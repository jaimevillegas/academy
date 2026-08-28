import { authorityMetrics } from "@/data/paths";

export function MetricsStrip() {
  return (
    // La retícula se dibuja con gap-px sobre el color de borde: así las líneas
    // siguen siendo de 1px al reflowar de 2 a 4 columnas.
    <section className="grid w-full grid-cols-2 gap-px border-b border-[var(--grid)] bg-[var(--grid)] lg:grid-cols-4">
      {authorityMetrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col gap-[8px] bg-[var(--chassis)] px-[20px] py-[24px] md:px-[32px] md:py-[30px]"
        >
          <span className="font-mono-plex text-[30px] font-medium tracking-[-1px] text-[var(--text)] md:text-[36px] xl:text-[40px]">
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
