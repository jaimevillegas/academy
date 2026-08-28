import Image from "next/image";
import Link from "next/link";
import { formatHours, type Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  const specs = [
    { key: "DURACIÓN", value: formatHours(course.durationHours) },
    { key: "NIVEL", value: course.difficultyLevel },
    { key: "PRERREQ.", value: course.prerequisiteCode ?? "NINGUNO" },
  ];
  const available = course.status === "DISPONIBLE";

  return (
    <article className="flex h-full flex-col overflow-hidden border border-[var(--grid)] bg-[var(--panel)]">
      <div className="relative flex h-[190px] flex-col justify-between border-b border-[var(--grid)] bg-[var(--panel-raised)] p-[12px]">
        <Image
          src={course.renderUrl}
          alt={"Render técnico del curso " + course.courseCode}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72px] bg-gradient-to-t from-[var(--chassis)] to-transparent" />
        <div className="relative flex items-start justify-between">
          <span className="border border-[var(--grid)] bg-[var(--chassis)] px-[8px] py-[4px] font-mono-plex text-[10px] tracking-[0.8px] text-[var(--phosphor)]">
            {course.courseCode}
          </span>
          <span
            className="font-mono-plex text-[9px] tracking-[0.8px]"
            style={{ color: available ? "var(--text-dim)" : "var(--amber)" }}
          >
            {course.status}
          </span>
        </div>
        <span className="relative font-mono-plex text-[9px] tracking-[1.2px] text-[var(--text-faint)]">
          {course.discipline}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[14px] p-[18px]">
        <h3 className="text-[19px] font-semibold leading-[1.25] text-[var(--text)]">
          {course.title}
        </h3>

        <dl className="flex flex-col border-t border-[var(--grid-soft)]">
          {specs.map((spec) => (
            <div
              key={spec.key}
              className="flex h-[26px] items-center justify-between border-b border-[var(--grid-soft)]"
            >
              <dt className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
                {spec.key}
              </dt>
              <dd className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-dim)]">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={"/catalogo/" + course.slug}
          className="mt-auto flex h-[40px] items-center justify-center border border-[var(--phosphor)] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--phosphor)] transition-instrument hover:bg-[var(--phosphor)] hover:text-[var(--chassis)]"
        >
          [ INSPECCIONAR_CURSO ]
        </Link>
      </div>
    </article>
  );
}
