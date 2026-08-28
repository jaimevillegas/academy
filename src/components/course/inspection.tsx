import Image from "next/image";
import {
  Bookmark,
  Layers,
  Maximize,
  Move,
  Play,
  Rotate3d,
  Ruler,
  Share2,
  ZoomIn,
} from "lucide-react";
import { formatHours, type Course, type SyllabusModule } from "@/lib/types";
import { countLessons } from "@/lib/types";

const tools = [
  { Icon: Rotate3d, label: "Orbitar", active: true },
  { Icon: Move, label: "Desplazar", active: false },
  { Icon: ZoomIn, label: "Zoom", active: false },
  { Icon: Layers, label: "Capas", active: false },
  { Icon: Ruler, label: "Medir", active: false },
  { Icon: Maximize, label: "Pantalla completa", active: false },
];

const axes = [
  { key: "X", value: "124.50", color: "#FF5F56" },
  { key: "Y", value: "86.20", color: "var(--phosphor)" },
  { key: "Z", value: "41.75", color: "var(--cyan)" },
];

function modelName(course: Course) {
  const file = course.model3dUrl?.split("/").pop();
  return (file ?? course.slug.replace(/-/g, "_") + ".glb").toUpperCase();
}

export function Inspection({
  course,
  modules,
  resourceCount,
}: {
  course: Course;
  modules: SyllabusModule[];
  resourceCount: number;
}) {
  const metadata = [
    { key: "CÓDIGO", value: course.courseCode, accent: true },
    {
      key: "DURACIÓN",
      value: formatHours(course.durationHours) + " · " + countLessons(modules) + " lecciones",
      accent: false,
    },
    { key: "NIVEL", value: course.difficultyLevel, accent: false },
    {
      key: "PRERREQUISITO",
      value: course.prerequisiteCode ?? "NINGUNO",
      accent: false,
    },
    { key: "SOFTWARE", value: course.software.join(" · "), accent: false },
    { key: "ENTREGABLE", value: course.deliverable, accent: false },
    { key: "ACTUALIZADO", value: course.updatedAt, accent: false },
  ];

  return (
    <section className="flex w-full flex-col border-b border-[var(--grid)] lg:h-[680px] lg:flex-row">
      <div className="relative flex h-[340px] w-full flex-col justify-between overflow-hidden border-b border-[var(--grid)] bg-[var(--panel)] p-[14px] md:h-[460px] lg:h-full lg:flex-1 lg:border-b-0 lg:border-r lg:p-[18px]">
        <Image
          src={course.canvasUrl ?? course.renderUrl}
          alt={"Modelo 3D del entregable de " + course.courseCode}
          fill
          sizes="70vw"
          priority
          className="object-cover"
        />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-[8px] border border-[var(--grid)] bg-[var(--chassis)]/80 px-[11px] py-[7px]">
            <span className="h-[5px] w-[5px] rounded-full bg-[var(--phosphor)]" />
            <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-dim)]">
              ENTREGABLE FINAL · {modelName(course)}
            </span>
          </div>

          <div className="flex flex-col border border-[var(--grid)] bg-[var(--chassis)]/80">
            {tools.map(({ Icon, label, active }, index) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={
                  "flex h-[34px] w-[34px] items-center justify-center transition-instrument hover:bg-[var(--panel-raised)] " +
                  (index < tools.length - 1
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
            {axes.map((axis, index) => (
              <div
                key={axis.key}
                className={
                  "flex items-center gap-[8px] px-[13px] py-[8px] " +
                  (index < axes.length - 1
                    ? "border-r border-[var(--grid)]"
                    : "")
                }
              >
                <dt
                  className="font-mono-plex text-[10px]"
                  style={{ color: axis.color }}
                >
                  {axis.key}
                </dt>
                <dd className="font-mono-plex text-[10px] text-[var(--text-dim)]">
                  {axis.value} mm
                </dd>
              </div>
            ))}
          </dl>
          <span className="hidden font-mono-plex text-[9.5px] tracking-[0.8px] text-[var(--text-faint)] xl:block">
            ARRASTRAR PARA ORBITAR · SCROLL PARA ZOOM
          </span>
        </div>
      </div>

      <aside className="flex w-full flex-col bg-[var(--chassis)] lg:h-full lg:w-[400px] xl:w-[460px]">
        <div className="flex h-[34px] items-center justify-between border-b border-[var(--grid)] bg-[var(--panel)] px-[20px]">
          <span className="font-mono-plex text-[10px] tracking-[1.4px] text-[var(--text-dim)]">
            BRIEFING
          </span>
          <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
            REV 4.2
          </span>
        </div>

        <div className="relative flex h-[230px] flex-col justify-between overflow-hidden border-b border-[var(--grid)] bg-[var(--panel)] p-[14px]">
          <Image
            src={course.trailerUrl ?? course.renderUrl}
            alt={"Trailer del curso " + course.courseCode}
            fill
            sizes="460px"
            className="object-cover"
          />
          <div className="relative flex items-start justify-between">
            <span className="border border-[var(--grid)] bg-[var(--chassis)]/80 px-[9px] py-[5px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-dim)]">
              TRAILER
            </span>
            <span className="font-mono-plex text-[9.5px] text-[var(--text-dim)]">
              02:41
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              aria-label="Reproducir trailer"
              className="pointer-events-auto flex h-[52px] w-[52px] items-center justify-center border border-[var(--phosphor)] bg-[var(--chassis)]/80 text-[var(--phosphor)] transition-instrument hover:bg-[var(--phosphor)] hover:text-[var(--chassis)]"
            >
              <Play size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative h-[3px] w-full bg-white/15">
            <div className="h-full w-[96px] bg-[var(--phosphor)]" />
          </div>
        </div>

        <dl className="flex flex-1 flex-col px-[20px] py-[16px]">
          {metadata.map((row, index) => (
            <div
              key={row.key}
              className={
                "flex min-h-[30px] items-center justify-between gap-[16px] py-[4px] md:py-0 " +
                (index < metadata.length - 1
                  ? "border-b border-[var(--grid-soft)]"
                  : "")
              }
            >
              <dt className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
                {row.key}
              </dt>
              <dd
                className={
                  "text-right font-mono-plex text-[11px] " +
                  (row.accent
                    ? "text-[var(--phosphor)]"
                    : "text-[var(--text-dim)]")
                }
              >
                {row.value}
              </dd>
            </div>
          ))}
          <div className="flex h-[30px] items-center justify-between gap-[16px] border-t border-[var(--grid-soft)]">
            <dt className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
              ARCHIVOS
            </dt>
            <dd className="font-mono-plex text-[11px] text-[var(--text-dim)]">
              {resourceCount}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-[10px] border-t border-[var(--grid)] p-[20px]">
          <a
            href={course.udemyLink ?? "#"}
            className="flex h-[48px] items-center justify-center bg-[var(--phosphor)] font-mono-plex text-[12px] font-semibold tracking-[1px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)]"
          >
            [ ACCEDER_AL_CURSO ]
          </a>
          <div className="flex gap-[10px]">
            {[
              { label: "GUARDAR", Icon: Bookmark },
              { label: "COMPARTIR", Icon: Share2 },
            ].map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                className="group flex h-[38px] flex-1 items-center justify-center gap-[8px] border border-[var(--grid)] transition-instrument hover:border-[var(--text)] hover:bg-[var(--text)]"
              >
                <Icon
                  size={13}
                  strokeWidth={1.5}
                  className="text-[var(--text-dim)] transition-instrument group-hover:text-[var(--chassis)]"
                />
                <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-dim)] transition-instrument group-hover:text-[var(--chassis)]">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
