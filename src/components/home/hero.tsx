import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Move, Rotate3d, Ruler, ZoomIn } from "lucide-react";

const viewportTools = [
  { Icon: Rotate3d, label: "Orbitar", active: true },
  { Icon: Move, label: "Desplazar", active: false },
  { Icon: ZoomIn, label: "Zoom", active: false },
  { Icon: Ruler, label: "Medir", active: false },
];

const viewportStats = [
  { key: "PIEZAS", value: "24" },
  { key: "TRIÁNGULOS", value: "184K" },
  { key: "FPS", value: "60" },
];

export function Hero() {
  return (
    <section className="flex h-[620px] w-full border-b border-[var(--grid)]">
      <div className="flex h-full w-[640px] flex-col justify-between border-r border-[var(--grid)] px-[48px] py-[56px]">
        <div className="flex flex-col gap-[26px]">
          <div className="flex items-center gap-[10px]">
            <span className="h-px w-[28px] bg-[var(--phosphor)]" />
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
              PLATAFORMA DE FORMACIÓN TÉCNICA
            </span>
          </div>

          <h1 className="text-[60px] font-semibold leading-[1.02] tracking-[-1.5px] text-[var(--text)]">
            Ingeniería enseñada
            <br />
            como se ejecuta.
          </h1>

          <p className="text-[16px] leading-[1.6] text-[var(--text-dim)]">
            SOLIDWORKS, KiCad y Revit enseñados desde el criterio de diseño, no
            desde el menú del software. Cada curso entrega un artefacto real:
            una pieza manufacturable, una PCB ruteada, un modelo BIM coordinado.
          </p>

          <div className="flex items-center gap-[12px]">
            <Link
              href="/catalogo"
              className="flex items-center gap-[9px] bg-[var(--phosphor)] px-[26px] py-[15px] font-mono-plex text-[12px] font-semibold tracking-[0.8px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)]"
            >
              EXPLORAR_CATÁLOGO
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link
              href="/rutas"
              className="flex items-center gap-[9px] border border-[var(--grid)] px-[26px] py-[15px] font-mono-plex text-[12px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
            >
              VER_RUTAS
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[14px] border-t border-[var(--grid)] pt-[16px]">
          <span className="flex h-[40px] w-[40px] items-center justify-center border border-[var(--grid)] bg-[var(--panel-raised)] font-mono-plex text-[12px] text-[var(--text-dim)]">
            JV
          </span>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[13px] font-semibold text-[var(--text)]">
              Ing. Jaime Andrés Villegas Buriticá
            </span>
            <span className="font-mono-plex text-[9.5px] tracking-[0.6px] text-[var(--text-faint)]">
              INGENIERÍA MECATRÓNICA · LÍDER TÉCNICO E INSTRUCTOR
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex h-full flex-1 flex-col justify-between overflow-hidden bg-[var(--panel)] p-[16px]">
        <Image
          src="/renders/hero-gearbox.png"
          alt="Ensamble de reductor en visor 3D"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          className="object-cover"
        />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-[7px] border border-[var(--grid)] bg-[var(--chassis)]/80 px-[10px] py-[6px]">
            <span className="h-[5px] w-[5px] rounded-full bg-[var(--amber)]" />
            <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-dim)]">
              WEBGL · MODELO INTERACTIVO
            </span>
          </div>

          <div className="flex flex-col border border-[var(--grid)] bg-[var(--chassis)]/80">
            {viewportTools.map(({ Icon, label, active }, index) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={
                  "flex h-[32px] w-[32px] items-center justify-center transition-instrument hover:bg-[var(--panel-raised)] " +
                  (index < viewportTools.length - 1
                    ? "border-b border-[var(--grid)] "
                    : "") +
                  (active
                    ? "text-[var(--phosphor)]"
                    : "text-[var(--text-faint)]")
                }
              >
                <Icon size={14} strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex items-end justify-between">
          <dl className="flex border border-[var(--grid)] bg-[var(--chassis)]/80">
            {viewportStats.map((stat, index) => (
              <div
                key={stat.key}
                className={
                  "flex flex-col gap-[3px] px-[14px] py-[8px] " +
                  (index < viewportStats.length - 1
                    ? "border-r border-[var(--grid)]"
                    : "")
                }
              >
                <dt className="font-mono-plex text-[9px] tracking-[0.8px] text-[var(--text-faint)]">
                  {stat.key}
                </dt>
                <dd className="font-mono-plex text-[13px] text-[var(--phosphor)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
            ENSAMBLE_REDUCTOR_V4.GLB
          </span>
        </div>
      </div>
    </section>
  );
}
