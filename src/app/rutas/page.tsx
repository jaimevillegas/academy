import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { learningPaths } from "@/data/paths";
import { getCourseByCode } from "@/data/courses";
import { formatHours } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rutas de formación · VILLEGAS_ACADEMIA",
  description:
    "Secuencias de cursos encadenados por dependencia real entre disciplinas: prototipado físico, diseño mecánico avanzado y coordinación BIM.",
};

const accentVar = {
  phosphor: "var(--phosphor)",
  cyan: "var(--cyan)",
  amber: "var(--amber)",
};

export default function PathsPage() {
  const totalCourses = learningPaths.reduce(
    (sum, path) => sum + path.courseCodes.length,
    0,
  );

  return (
    <>
      <Navbar />

      <main className="flex w-full flex-col">
        <header className="flex flex-col gap-[16px] border-b border-[var(--grid)] px-page py-[32px] lg:flex-row lg:items-end lg:justify-between xl:py-[40px]">
          <div className="flex flex-col gap-[12px] lg:max-w-[720px]">
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
              RUTAS DE FORMACIÓN · {learningPaths.length} SECUENCIAS
            </span>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.8px] text-[var(--text)] md:text-[38px] xl:text-[44px] xl:tracking-[-1.2px]">
              Rutas
            </h1>
            <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
              Cada ruta encadena cursos por dependencia técnica, no por
              temática. El orden es el orden en que se puede ejecutar el trabajo
              real.
            </p>
          </div>
          <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
            {totalCourses} CURSOS ENCADENADOS
          </span>
        </header>

        {learningPaths.map((path) => {
          const accent = accentVar[path.accent];
          return (
            <section
              key={path.code}
              className="flex flex-col border-b border-[var(--grid)] lg:flex-row"
            >
              <div className="flex flex-col gap-[16px] border-b border-[var(--grid)] bg-[var(--panel)] px-page py-[32px] lg:w-[380px] lg:border-b-0 lg:border-r xl:w-[440px] xl:py-[40px]">
                <span
                  className="font-mono-plex text-[11px] tracking-[1.4px]"
                  style={{ color: accent }}
                >
                  {path.code}
                </span>
                <h2 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.6px] text-[var(--text)] md:text-[28px]">
                  {path.title}
                </h2>
                <p className="text-[14px] leading-[1.6] text-[var(--text-dim)]">
                  {path.description}
                </p>
                <dl className="mt-[8px] flex border border-[var(--grid)]">
                  <div className="flex flex-1 flex-col gap-[4px] border-r border-[var(--grid)] px-[16px] py-[12px]">
                    <dt className="font-mono-plex text-[9.5px] tracking-[0.9px] text-[var(--text-faint)]">
                      CARGA TOTAL
                    </dt>
                    <dd className="font-mono-plex text-[18px] text-[var(--text)]">
                      {path.totalHours} h
                    </dd>
                  </div>
                  <div className="flex flex-1 flex-col gap-[4px] px-[16px] py-[12px]">
                    <dt className="font-mono-plex text-[9.5px] tracking-[0.9px] text-[var(--text-faint)]">
                      UNIDADES
                    </dt>
                    <dd className="font-mono-plex text-[18px] text-[var(--text)]">
                      {String(path.courseCodes.length).padStart(2, "0")}
                    </dd>
                  </div>
                </dl>
              </div>

              <ol className="flex flex-1 flex-col">
                <li className="hidden h-[34px] items-center border-b border-[var(--grid)] bg-[var(--chassis)] px-[20px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-faint)] md:flex xl:px-[32px]">
                  <span className="w-[40px]">PASO</span>
                  <span className="w-[90px]">CÓDIGO</span>
                  <span className="flex-1">UNIDAD</span>
                  <span className="w-[120px]">NIVEL</span>
                  <span className="w-[70px]">CARGA</span>
                  <span className="w-[24px]" />
                </li>

                {path.courseCodes.map((code, index) => {
                  const course = getCourseByCode(code);
                  const isLast = index === path.courseCodes.length - 1;
                  const row = (
                    <>
                      <span
                        className="w-[40px] font-mono-plex text-[10px]"
                        style={{ color: accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="w-[90px] font-mono-plex text-[11px] text-[var(--text-dim)]">
                        {code}
                      </span>
                      <span className="flex-1 text-[14px] text-[var(--text)]">
                        {course ? course.title : "Unidad en preparación"}
                      </span>
                      <span className="hidden w-[120px] font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)] md:block">
                        {course ? course.difficultyLevel : "—"}
                      </span>
                      <span className="w-[70px] font-mono-plex text-[11px] text-[var(--text-dim)]">
                        {course ? formatHours(course.durationHours) : "—"}
                      </span>
                      <span className="flex w-[24px] justify-end">
                        {isLast ? (
                          <Flag
                            size={12}
                            strokeWidth={1.5}
                            className="text-[var(--text-faint)]"
                          />
                        ) : (
                          <ArrowRight
                            size={12}
                            strokeWidth={1.5}
                            className="text-[var(--text-faint)]"
                          />
                        )}
                      </span>
                    </>
                  );

                  return (
                    <li
                      key={code}
                      className="border-b border-[var(--grid-soft)]"
                    >
                      {course ? (
                        <Link
                          href={"/catalogo/" + course.slug}
                          className="flex min-h-[56px] items-center gap-[8px] px-[20px] py-[10px] transition-instrument hover:bg-[var(--panel)] xl:px-[32px]"
                        >
                          {row}
                        </Link>
                      ) : (
                        <div className="flex min-h-[56px] items-center gap-[8px] px-[20px] py-[10px] opacity-60 xl:px-[32px]">
                          {row}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </main>

      <Footer />
    </>
  );
}
