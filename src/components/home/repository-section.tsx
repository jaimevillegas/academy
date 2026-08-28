import Link from "next/link";
import { resourceAccent, resources } from "@/data/resources";

const TOTAL_RECORDS = 212;

export function RepositorySection() {
  return (
    <section className="flex w-full border-b border-[var(--grid)] bg-[var(--panel)]">
      <div className="flex w-[480px] flex-col justify-center gap-[18px] border-r border-[var(--grid)] px-[48px] py-[56px]">
        <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--cyan)]">
          04 — REPOSITORIO
        </span>
        <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.8px] text-[var(--text)]">
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
        <div className="flex h-[34px] items-center border-b border-[var(--grid)] bg-[var(--chassis)] px-[24px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-faint)]">
          <span className="w-[90px]">TIPO</span>
          <span className="flex-1">RECURSO</span>
          <span className="w-[110px]">CURSO</span>
          <span className="w-[70px]">PESO</span>
        </div>

        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex h-[52px] items-center border-b border-[var(--grid-soft)] px-[24px] transition-instrument hover:bg-[var(--panel-raised)]"
          >
            <span className="w-[90px]">
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
            <span className="w-[110px] font-mono-plex text-[11px] text-[var(--text-dim)]">
              {resource.courseCodes[0]}
            </span>
            <span className="w-[70px] font-mono-plex text-[11px] text-[var(--text-faint)]">
              {resource.size}
            </span>
          </div>
        ))}

        <div className="flex h-[40px] items-center justify-between px-[24px]">
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
