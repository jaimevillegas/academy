import type { Metadata } from "next";
import Link from "next/link";
import { Award, Download, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { certificates, student } from "@/data/enrollment";
import { getCourseByCode } from "@/data/courses";
import { formatHours } from "@/lib/types";

export const metadata: Metadata = {
  title: "Certificados · VILLEGAS_ACADEMIA",
  description:
    "Certificados emitidos, con hash de verificación pública por unidad completada.",
};

export default function CertificatesPage() {
  const issued = certificates
    .map((certificate) => ({
      certificate,
      course: getCourseByCode(certificate.courseCode),
    }))
    .filter((row) => row.course !== undefined);

  const totalHours = issued.reduce(
    (sum, row) => sum + (row.course?.durationHours ?? 0),
    0,
  );

  return (
    <>
      <Navbar path="~/ CERTIFICADOS" />

      <main className="flex w-full flex-col">
        <header className="flex flex-col gap-[24px] border-b border-[var(--grid)] px-page py-[32px] lg:flex-row lg:items-end lg:justify-between xl:py-[40px]">
          <div className="flex flex-col gap-[12px] lg:max-w-[720px]">
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
              REGISTRO DE ACREDITACIONES
            </span>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.8px] text-[var(--text)] md:text-[38px] xl:text-[44px] xl:tracking-[-1.2px]">
              Certificados
            </h1>
            <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
              Cada certificado lleva un hash de verificación pública que
              acredita la unidad completada, su carga horaria y la fecha de
              emisión.
            </p>
          </div>

          <dl className="flex w-fit border border-[var(--grid)]">
            {[
              {
                key: "EMITIDOS",
                value: String(issued.length).padStart(2, "0"),
              },
              { key: "CARGA ACREDITADA", value: formatHours(totalHours) },
            ].map((stat, index) => (
              <div
                key={stat.key}
                className={
                  "flex flex-col gap-[5px] px-[20px] py-[14px] " +
                  (index === 0 ? "border-r border-[var(--grid)]" : "")
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

        <section className="flex flex-col gap-[20px] px-page py-[32px] xl:py-[40px]">
          {issued.length === 0 ? (
            <div className="flex flex-col items-center gap-[12px] border border-[var(--grid)] bg-[var(--panel)] px-page py-[64px]">
              <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
                SIN CERTIFICADOS EMITIDOS
              </span>
              <p className="text-[14px] text-[var(--text-dim)]">
                Los certificados se emiten al completar el 100 % de una unidad.
              </p>
              <Link
                href="/mis-cursos"
                className="border border-[var(--grid)] px-[18px] py-[11px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
              >
                [ VER_MIS_CURSOS ]
              </Link>
            </div>
          ) : (
            issued.map(({ certificate, course }) => (
              <article
                key={certificate.id}
                className="flex flex-col border border-[var(--grid)] bg-[var(--panel)] md:flex-row"
              >
                <div className="flex w-full flex-row items-center justify-center gap-[10px] border-b border-[var(--grid)] bg-[var(--panel-raised)] py-[14px] md:w-[120px] md:flex-col md:border-b-0 md:border-r md:py-[28px]">
                  <Award
                    size={26}
                    strokeWidth={1}
                    className="text-[var(--amber)]"
                  />
                  <span className="font-mono-plex text-[9.5px] tracking-[0.8px] text-[var(--text-faint)]">
                    ACREDITADO
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-[14px] px-[20px] py-[20px] md:px-[28px] md:py-[24px]">
                  <div className="flex flex-col gap-[16px] lg:flex-row lg:items-start lg:justify-between lg:gap-[24px]">
                    <div className="flex flex-col gap-[6px]">
                      <span className="font-mono-plex text-[11px] tracking-[1px] text-[var(--phosphor)]">
                        {certificate.code}
                      </span>
                      <h2 className="text-[22px] font-semibold leading-[1.2] text-[var(--text)]">
                        {course?.title}
                      </h2>
                      <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
                        {student.name.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-[10px]">
                      <button
                        type="button"
                        className="flex h-[38px] items-center gap-[8px] border border-[var(--grid)] px-[16px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-dim)] transition-instrument hover:border-[var(--text)] hover:text-[var(--text)]"
                      >
                        <ShieldCheck size={13} strokeWidth={1.5} />
                        VERIFICAR
                      </button>
                      <button
                        type="button"
                        className="flex h-[38px] items-center gap-[8px] bg-[var(--phosphor)] px-[16px] font-mono-plex text-[11px] font-semibold tracking-[0.8px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)]"
                      >
                        <Download size={13} strokeWidth={1.5} />
                        DESCARGAR_PDF
                      </button>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-[12px] border-t border-[var(--grid-soft)] pt-[14px] md:flex">
                    {[
                      { key: "UNIDAD", value: certificate.courseCode },
                      {
                        key: "CARGA",
                        value: formatHours(course?.durationHours ?? 0),
                      },
                      { key: "EMISIÓN", value: certificate.issuedAt },
                      { key: "HASH", value: certificate.hash },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex flex-1 flex-col gap-[4px]"
                      >
                        <dt className="font-mono-plex text-[9.5px] tracking-[0.9px] text-[var(--text-faint)]">
                          {item.key}
                        </dt>
                        <dd className="font-mono-plex text-[12px] text-[var(--text-dim)]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))
          )}

          <p className="font-mono-plex text-[10px] leading-[1.6] tracking-[0.6px] text-[var(--text-faint)]">
            EMISIÓN Y VERIFICACIÓN PENDIENTES DE CONEXIÓN CON SUPABASE · LOS
            BOTONES NO GENERAN ARCHIVOS TODAVÍA
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
