import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Inspection } from "@/components/course/inspection";
import { SyllabusAccordion } from "@/components/course/syllabus-accordion";
import { DependencyTree } from "@/components/course/dependency-tree";
import {
  courses,
  getCourseByCode,
  getCourseBySlug,
  getNextCourse,
} from "@/data/courses";
import { getResourcesByCourse } from "@/data/resources";
import { getSyllabus } from "@/data/syllabus";
import { countLessons, formatHours } from "@/lib/types";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalogo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Curso no encontrado · VILLEGAS_ACADEMIA" };
  return {
    title: course.courseCode + " · " + course.title,
    description: course.summary,
  };
}

export default async function CoursePage({
  params,
}: PageProps<"/catalogo/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const modules = getSyllabus(course.courseCode);
  const resources = getResourcesByCourse(course.courseCode);
  const prerequisite = course.prerequisiteCode
    ? getCourseByCode(course.prerequisiteCode)
    : undefined;
  const next = getNextCourse(course.courseCode);

  const chips = [
    { label: course.courseCode, color: "var(--phosphor)", solid: true },
    { label: course.discipline, color: "var(--text-dim)", solid: false },
    { label: course.difficultyLevel, color: "var(--amber)", solid: false },
    { label: course.status, color: "var(--text-dim)", solid: false },
  ];

  const stats = [
    { key: "DURACIÓN", value: formatHours(course.durationHours) },
    { key: "LECCIONES", value: String(countLessons(modules)) },
    { key: "ARCHIVOS", value: String(resources.length) },
  ];

  return (
    <>
      <Navbar path={"~/ CATÁLOGO_TÉCNICO / " + course.courseCode} />

      <main className="flex w-full flex-col">
        <nav
          aria-label="Migas de pan"
          className="flex h-[36px] items-center gap-[10px] border-b border-[var(--grid)] px-[48px] font-mono-plex text-[10px] tracking-[0.8px]"
        >
          <Link
            href="/catalogo"
            className="text-[var(--text-faint)] transition-instrument hover:text-[var(--text)]"
          >
            CATÁLOGO
          </Link>
          <span className="text-[var(--text-faint)]">/</span>
          <span className="text-[var(--text-faint)]">{course.discipline}</span>
          <span className="text-[var(--text-faint)]">/</span>
          <span className="text-[var(--text-dim)]">{course.courseCode}</span>
        </nav>

        <header className="flex items-end justify-between gap-[48px] border-b border-[var(--grid)] px-[48px] py-[36px]">
          <div className="flex w-[760px] flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="border px-[10px] py-[5px] font-mono-plex text-[10px] tracking-[0.8px]"
                  style={{
                    borderColor: chip.color,
                    backgroundColor: chip.solid ? chip.color : "transparent",
                    color: chip.solid ? "var(--chassis)" : chip.color,
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <h1 className="text-[44px] font-semibold leading-[1.08] tracking-[-1.2px] text-[var(--text)]">
              {course.title}
            </h1>
            <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
              {course.summary} Entregable final: {course.deliverable}.
            </p>
          </div>

          <dl className="flex border border-[var(--grid)]">
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

        <Inspection
          course={course}
          modules={modules}
          resourceCount={resources.length}
        />

        <div className="flex border-b border-[var(--grid)]">
          <SyllabusAccordion modules={modules} />
          <DependencyTree
            course={course}
            resources={resources}
            prerequisite={prerequisite}
            next={next}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
