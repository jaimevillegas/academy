import Link from "next/link";
import { resourceAccent, resources } from "@/data/resources";

const TOTAL_RECORDS = 212;

export function RepositorySection() {
  return (
    <section className="flex w-full flex-col border-b border-[var(--grid)] bg-[var(--panel)] lg:flex-row">
      <div className="flex flex-col justify-center gap-[18px] border-b border-[var(--grid)] px-page py-[40px] lg:w-[420px] lg:border-b-0 lg:border-r lg:py-[56px] xl:w-[480px]">
        <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--cyan)]">
          04 — REPOSITORIO
        </span>
        <h2 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.5px] text-[var(--text)] md:text-[30px] xl:text-[32px] xl:tracking-[-0.8px]">
          Base de conocimiento abierta
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
          Archivos CAD, guías en PDF, librerías de componentes y ejercicios
          resueltos. Cada recurso está enlazado a los cursos donde se utiliza.
        </p>
        <Link
          href="/repositorio"
          className="flex w-fit items-center border border-[var(--cyan)] px-[20px] py-[13px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--cyan)] transition-instrument hover:bg-[var(--cyan)] hover:text-[var(--chassis)]"
        >
          [ ABRIR_REPOSITORIO ]
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex h-[34px] items-center border-b border-[var(--grid)] bg-[var(--chassis)] px-[20px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-faint)] xl:px-[24px]">
          <span className="w-[70px] xl:w-[90px]">TIPO</span>
          <span className="flex-1">RECURSO</span>
          <span className="hidden w-[110px] sm:block">CURSO</span>
          <span className="w-[70px] text-right sm:text-left">PESO</span>
        </div>

        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex min-h-[52px] items-center border-b border-[var(--grid-soft)] px-[20px] py-[8px] transition-instrument hover:bg-[var(--panel-raised)] xl:px-[24px]"
          >
            <span className="w-[70px] xl:w-[90px]">
              <span
                className="border px-[7px] py-[3px] font-mono-plex text-[9.5px] tracking-[0.8px]"
                style={{
                  color: resourceAccent[resource.resourceType],
                  borderColor: resourceAccent[resource.resourceType],
                }}
              >
                {resource.resourceType}
              </span>
            </span>
            <span className="flex-1 text-[14px] text-[var(--text)]">
              {resource.title}
            </span>
            <span className="hidden w-[110px] font-mono-plex text-[11px] text-[var(--text-dim)] sm:block">
              {resource.courseCodes[0]}
            </span>
            <span className="w-[70px] text-right font-mono-plex text-[11px] text-[var(--text-faint)] sm:text-left">
              {resource.size}
            </span>
          </div>
        ))}

        <div className="flex h-[40px] items-center justify-between px-[20px] xl:px-[24px]">
          <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
            MOSTRANDO {resources.length} DE {TOTAL_RECORDS} REGISTROS
          </span>
          <Link
            href="/repositorio"
            className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-dim)] transition-instrument hover:text-[var(--text)]"
          >
            CARGAR MÁS →
          </Link>
        </div>
      </div>
    </section>
  );
}
