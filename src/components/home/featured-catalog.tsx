import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/data/courses";

const featuredCodes = ["SWK-310", "KIC-302", "REV-215"];

export function FeaturedCatalog() {
  const featured = featuredCodes
    .map((code) => courses.find((course) => course.courseCode === code))
    .filter((course) => course !== undefined);

  return (
    <section className="flex w-full flex-col gap-[32px] border-b border-[var(--grid)] px-[48px] py-[64px]">
      <header className="flex items-end justify-between">
        <div className="flex w-[620px] flex-col gap-[12px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
            03 — CATÁLOGO TÉCNICO
          </span>
          <h2 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.8px] text-[var(--text)]">
            Últimas unidades publicadas
          </h2>
        </div>
        <Link
          href="/catalogo"
          className="flex items-center gap-[8px] border border-[var(--grid)] px-[18px] py-[11px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
        >
          VER_ÍNDICE_COMPLETO ({courses.length})
          <ArrowRight size={13} strokeWidth={1.5} />
        </Link>
      </header>

      <div className="flex items-stretch gap-[20px]">
        {featured.map((course) => (
          <div key={course.courseCode} className="flex-1">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}
