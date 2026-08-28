import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { certificates, enrollments, student } from "@/data/enrollment";
import { getCourseByCode } from "@/data/courses";
import { formatHours } from "@/lib/types";

export const metadata: Metadata = {
  title: "Mis cursos · VILLEGAS_ACADEMIA",
  description:
    "Progreso por unidad, última lección vista y certificados emitidos.",
};

export default function MyCoursesPage() {
  const rows = enrollments
    .map((enrollment) => ({
      enrollment,
      course: getCourseByCode(enrollment.courseCode),
    }))
    .filter((row) => row.course !== undefined);

  const active = rows.filter((row) => row.enrollment.progress < 1);
  const completed = rows.filter((row) => row.enrollment.progress >= 1);

  const hoursDone = rows.reduce(
    (sum, row) => sum + row.course!.durationHours * row.enrollment.progress,
    0,
  );

  const stats = [
    { key: "EN CURSO", value: String(active.length).padStart(2, "0") },
    { key: "COMPLETADOS", value: String(completed.length).padStart(2, "0") },
    { key: "HORAS CURSADAS", value: formatHours(hoursDone) },
    { key: "CERTIFICADOS", value: String(certificates.length).padStart(2, "0") },
  ];

  return (
    <>
      <Navbar path="~/ MIS_CURSOS" />

      <main className="flex w-full flex-col">
        <header className="flex flex-col gap-[24px] border-b border-[var(--grid)] px-page py-[32px] lg:flex-row lg:items-end lg:justify-between xl:py-[40px]">
          <div className="flex items-center gap-[18px]">
            <span className="flex h-[56px] w-[56px] items-center justify-center border border-[var(--grid)] bg-[var(--panel-raised)] font-mono-plex text-[16px] text-[var(--text-dim)]">
              {student.initials}
            </span>
            <div className="flex flex-col gap-[6px]">
              <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
                EXPEDIENTE DE ESTUDIANTE
              </span>
              <h1 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.5px] text-[var(--text)] md:text-[32px] md:tracking-[-0.8px]">
                {student.name}
              </h1>
              <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
                {student.email} · ALTA {student.memberSince}
              </span>
            </div>
          </div>

          <dl className="flex w-fit max-w-full overflow-x-auto border border-[var(--grid)]">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className={
                  "flex flex-col gap-[5px] px-[20px] py-[14px] " +
                  (index < stats.length - 1
                    ? "border-r border-[var(--grid)]"
                    : "")
                }
              >
                <dt className="font-mono-plex text-[9.5px] tracking-[0.9px] text-[var(--text-faint)]">
                  {stat.key}
                </dt>
                <dd className="whitespace-nowrap font-mono-plex text-[20px] text-[var(--text)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <section className="flex flex-col gap-[24px] border-b border-[var(--grid)] px-page py-[32px] xl:py-[40px]">
          <div className="flex items-end justify-between">
            <h2 className="text-[26px] font-semibold tracking-[-0.5px] text-[var(--text)]">
              En curso
            </h2>
            <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
              {active.length} UNIDADES ACTIVAS
            </span>
          </div>

          {active.length === 0 ? (
            <div className="flex flex-col items-center gap-[12px] border border-[var(--grid)] bg-[var(--panel)] px-page py-[56px]">
              <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
                SIN UNIDADES ACTIVAS
              </span>
              <Link
                href="/catalogo"
                className="border border-[var(--grid)] px-[18px] py-[11px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
              >
                [ EXPLORAR_CATÁLOGO ]
              </Link>
            </div>
          ) : (
            <div className="flex flex-col border border-[var(--grid)]">
              {active.map(({ enrollment, course }, index) => {
                const percent = Math.round(enrollment.progress * 100);
                return (
                  <article
                    key={enrollment.courseCode}
                    className={
                      "flex flex-col gap-[16px] bg-[var(--panel)] px-[20px] py-[20px] xl:flex-row xl:items-center xl:gap-[24px] xl:px-[24px] " +
                      (index < active.length - 1
                        ? "border-b border-[var(--grid)]"
                        : "")
                    }
                  >
                    <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--phosphor)] xl:w-[80px]">
                      {course!.courseCode}
                    </span>

                    <div className="flex flex-1 flex-col gap-[10px]">
                      <div className="flex flex-col gap-[6px] md:flex-row md:items-baseline md:justify-between md:gap-[16px]">
                        <h3 className="text-[17px] font-medium text-[var(--text)]">
                          {course!.title}
                        </h3>
                        <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
                          ÚLTIMA LECCIÓN · {enrollment.lastLesson}
                        </span>
                      </div>

                      <div className="flex items-center gap-[14px]">
                        <div className="h-[4px] flex-1 bg-white/10">
                          <div
                            className="h-full bg-[var(--phosphor)]"
                            style={{ width: percent + "%" }}
                          />
                        </div>
                        <span className="w-[44px] text-right font-mono-plex text-[11px] text-[var(--text-dim)]">
                          {percent}%
                        </span>
                        <span className="hidden w-[110px] text-right font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)] sm:block">
                          {enrollment.lessonsDone} LECC. · {enrollment.lastAccess}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={"/catalogo/" + course!.slug}
                      className="flex h-[40px] items-center justify-center gap-[8px] border border-[var(--phosphor)] px-[18px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--phosphor)] transition-instrument hover:bg-[var(--phosphor)] hover:text-[var(--chassis)]"
                    >
                      [ CONTINUAR ]
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-[24px] px-page py-[32px] xl:py-[40px]">
          <div className="flex items-end justify-between">
            <h2 className="text-[26px] font-semibold tracking-[-0.5px] text-[var(--text)]">
              Completados
            </h2>
            <Link
              href="/certificados"
              className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--cyan)] transition-instrument hover:text-[var(--text)]"
            >
              VER_CERTIFICADOS →
            </Link>
          </div>

          <div className="flex flex-col border border-[var(--grid)]">
            <div className="flex h-[34px] items-center border-b border-[var(--grid)] bg-[var(--chassis)] px-[24px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-faint)]">
              <span className="w-[80px]">CÓDIGO</span>
              <span className="flex-1">UNIDAD</span>
              <span className="hidden w-[90px] md:block">CARGA</span>
              <span className="hidden w-[110px] lg:block">FINALIZADO</span>
              <span className="w-[130px]">CERTIFICADO</span>
            </div>

            {completed.map(({ enrollment, course }) => {
              const certificate = certificates.find(
                (item) => item.courseCode === enrollment.courseCode,
              );
              return (
                <div
                  key={enrollment.courseCode}
                  className="flex min-h-[52px] items-center gap-[8px] border-b border-[var(--grid-soft)] px-[20px] py-[10px] last:border-b-0 xl:px-[24px]"
                >
                  <span className="w-[80px] font-mono-plex text-[11px] text-[var(--text-dim)]">
                    {course!.courseCode}
                  </span>
                  <span className="flex-1 text-[14px] text-[var(--text)]">
                    {course!.title}
                  </span>
                  <span className="hidden w-[90px] font-mono-plex text-[11px] text-[var(--text-dim)] md:block">
                    {formatHours(course!.durationHours)}
                  </span>
                  <span className="hidden w-[110px] font-mono-plex text-[11px] text-[var(--text-faint)] lg:block">
                    {enrollment.lastAccess}
                  </span>
                  <span className="w-[130px]">
                    {certificate ? (
                      <Link
                        href="/certificados"
                        className="flex w-fit items-center gap-[7px] border border-[var(--grid)] px-[10px] py-[5px] font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-dim)] transition-instrument hover:border-[var(--phosphor)] hover:text-[var(--phosphor)]"
                      >
                        <Award size={12} strokeWidth={1.5} />
                        EMITIDO
                      </Link>
                    ) : (
                      <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
                        EN TRÁMITE
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
