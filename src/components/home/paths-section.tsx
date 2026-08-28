import Link from "next/link";
import { ChevronRight, Flag } from "lucide-react";
import { learningPaths } from "@/data/paths";

const accentVar = {
  phosphor: "var(--phosphor)",
  cyan: "var(--cyan)",
  amber: "var(--amber)",
};

export function PathsSection() {
  const totalCourses = learningPaths.reduce(
    (sum, path) => sum + path.courseCodes.length,
    0,
  );

  return (
    <section className="flex w-full flex-col gap-[32px] border-b border-[var(--grid)] px-[48px] py-[64px]">
      <header className="flex items-end justify-between">
        <div className="flex w-[620px] flex-col gap-[12px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
            02 — RUTAS DE FORMACIÓN
          </span>
          <h2 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.8px] text-[var(--text)]">
            Secuencias con dependencia real entre disciplinas
          </h2>
        </div>
        <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
          {learningPaths.length} RUTAS · {totalCourses} CURSOS ENCADENADOS
        </span>
      </header>

      <div className="flex items-stretch gap-[20px]">
        {learningPaths.map((path) => {
          const accent = accentVar[path.accent];
          return (
            <article
              key={path.code}
              className="flex flex-1 flex-col border border-[var(--grid)] bg-[var(--panel)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--grid)] px-[16px] py-[12px]">
                <span
                  className="font-mono-plex text-[11px] tracking-[1px]"
                  style={{ color: accent }}
                >
                  {path.code}
                </span>
                <span className="font-mono-plex text-[11px] text-[var(--text-faint)]">
                  {path.totalHours} h
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-[14px] p-[20px]">
                <h3 className="text-[22px] font-semibold leading-[1.2] text-[var(--text)]">
                  {path.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[var(--text-dim)]">
                  {path.description}
                </p>

                <ol className="flex flex-col pt-[6px]">
                  {path.courseCodes.map((code, index) => {
                    const isLast = index === path.courseCodes.length - 1;
                    const StepIcon = isLast ? Flag : ChevronRight;
                    return (
                      <li
                        key={code}
                        className="flex h-[32px] items-center gap-[10px] border-t border-[var(--grid-soft)]"
                      >
                        <span
                          className="font-mono-plex text-[10px]"
                          style={{ color: accent }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono-plex text-[11px] text-[var(--text-dim)]">
                          {code}
                        </span>
                        <span className="flex-1" />
                        <StepIcon
                          size={12}
                          strokeWidth={1.5}
                          className="text-[var(--text-faint)]"
                        />
                      </li>
                    );
                  })}
                </ol>
              </div>

              <Link
                href={"/rutas/" + path.code.toLowerCase()}
                className="flex h-[44px] items-center justify-center border-t border-[var(--grid)] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
              >
                [ ABRIR_RUTA ]
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
