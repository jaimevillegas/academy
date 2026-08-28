"use client";

import { useMemo } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import {
  countActiveFilters,
  useCatalogFilters,
  type SortKey,
} from "@/store/catalog-filters";
import type {
  Course,
  CourseStatus,
  DifficultyLevel,
  Discipline,
  SoftwareTag,
} from "@/lib/types";

const PAGE_SIZE = 9;

const disciplineOptions: Discipline[] = [
  "MECÁNICA_CAD",
  "ELECTRÓNICA_EDA",
  "ARQUITECTURA_BIM",
  "MANUFACTURA",
];
const levelOptions: DifficultyLevel[] = [
  "FUNDAMENTOS",
  "INTERMEDIO",
  "AVANZADO",
];
const statusOptions: CourseStatus[] = ["DISPONIBLE", "EN DESARROLLO"];
const softwareOptions: SoftwareTag[] = [
  "SOLIDWORKS",
  "KICAD",
  "REVIT",
  "CURA",
  "ANSYS",
];
const sortOptions: SortKey[] = ["CÓDIGO", "DURACIÓN", "NIVEL"];
const levelWeight: Record<DifficultyLevel, number> = {
  FUNDAMENTOS: 0,
  INTERMEDIO: 1,
  AVANZADO: 2,
};

function Toggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "border px-[12px] py-[7px] font-mono-plex text-[11px] tracking-[0.6px] transition-instrument " +
        (active
          ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--chassis)]"
          : "border-[var(--grid)] text-[var(--text-dim)] hover:border-[var(--text)] hover:text-[var(--text)]")
      }
    >
      {label}
    </button>
  );
}

function FilterRow({
  label,
  last,
  children,
}: {
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "flex h-[48px] items-center gap-[16px] px-[48px] " +
        (last ? "" : "border-b border-[var(--grid-soft)]")
      }
    >
      <span className="w-[110px] font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
        {label}
      </span>
      <div className="flex items-center gap-[8px]">{children}</div>
    </div>
  );
}

export function CatalogView({ courses }: { courses: Course[] }) {
  const state = useCatalogFilters();
  const activeFilters = countActiveFilters(state);

  const filtered = useMemo(() => {
    const query = state.query.trim().toLowerCase();
    const result = courses.filter((course) => {
      if (
        state.disciplines.length > 0 &&
        !state.disciplines.includes(course.discipline)
      ) {
        return false;
      }
      if (
        state.levels.length > 0 &&
        !state.levels.includes(course.difficultyLevel)
      ) {
        return false;
      }
      if (state.statuses.length > 0 && !state.statuses.includes(course.status)) {
        return false;
      }
      if (
        state.software.length > 0 &&
        !course.software.some((tag) => state.software.includes(tag))
      ) {
        return false;
      }
      if (query.length > 0) {
        const haystack = (
          course.courseCode +
          " " +
          course.title +
          " " +
          course.discipline +
          " " +
          course.software.join(" ")
        ).toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (state.sort === "DURACIÓN") return b.durationHours - a.durationHours;
      if (state.sort === "NIVEL") {
        return levelWeight[a.difficultyLevel] - levelWeight[b.difficultyLevel];
      }
      return a.courseCode.localeCompare(b.courseCode);
    });
  }, [
    courses,
    state.disciplines,
    state.levels,
    state.statuses,
    state.software,
    state.query,
    state.sort,
  ]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(state.page, pageCount);
  const pageStart = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(pageStart, pageStart + PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : pageStart + 1;
  const rangeEnd = pageStart + visible.length;

  return (
    <>
      <header className="flex items-end justify-between border-b border-[var(--grid)] px-[48px] py-[40px]">
        <div className="flex w-[640px] flex-col gap-[12px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
            ÍNDICE DE UNIDADES · {courses.length} REGISTROS
          </span>
          <h1 className="text-[44px] font-semibold leading-[1.1] tracking-[-1.2px] text-[var(--text)]">
            Catálogo técnico
          </h1>
        </div>
        <div className="flex h-[44px] w-[360px] items-center gap-[10px] border border-[var(--grid)] bg-[var(--panel)] px-[14px] transition-instrument focus-within:border-[var(--phosphor)]">
          <Search size={15} strokeWidth={1.5} className="text-[var(--text-faint)]" />
          <input
            type="search"
            value={state.query}
            onChange={(event) => state.setQuery(event.target.value)}
            placeholder="buscar por código, título o etiqueta…"
            aria-label="Buscar en el catálogo"
            className="flex-1 bg-transparent font-mono-plex text-[12px] text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
          />
          <span className="font-mono-plex text-[11px] text-[var(--text-faint)]">
            ⌘K
          </span>
        </div>
      </header>

      <section
        aria-label="Panel de filtros"
        className="border-b border-[var(--grid)] bg-[var(--panel)]"
      >
        <FilterRow label="DISCIPLINA">
          <Toggle
            label="TODAS"
            active={state.disciplines.length === 0}
            onClick={() => {
              state.disciplines.forEach((value) =>
                state.toggleDiscipline(value),
              );
            }}
          />
          {disciplineOptions.map((option) => (
            <Toggle
              key={option}
              label={option}
              active={state.disciplines.includes(option)}
              onClick={() => state.toggleDiscipline(option)}
            />
          ))}
        </FilterRow>

        <FilterRow label="NIVEL">
          {levelOptions.map((option) => (
            <Toggle
              key={option}
              label={option}
              active={state.levels.includes(option)}
              onClick={() => state.toggleLevel(option)}
            />
          ))}
        </FilterRow>

        <FilterRow label="ESTADO">
          {statusOptions.map((option) => (
            <Toggle
              key={option}
              label={option}
              active={state.statuses.includes(option)}
              onClick={() => state.toggleStatus(option)}
            />
          ))}
        </FilterRow>

        <FilterRow label="SOFTWARE" last>
          {softwareOptions.map((option) => (
            <Toggle
              key={option}
              label={option}
              active={state.software.includes(option)}
              onClick={() => state.toggleSoftware(option)}
            />
          ))}
        </FilterRow>
      </section>

      <div className="flex h-[44px] items-center justify-between border-b border-[var(--grid)] px-[48px]">
        <div className="flex items-center gap-[16px]">
          <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)]">
            {filtered.length} RESULTADOS
          </span>
          <span className="font-mono-plex text-[11px] text-[var(--text-faint)]">
            /
          </span>
          {activeFilters > 0 ? (
            <button
              type="button"
              onClick={state.clearAll}
              className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-faint)] transition-instrument hover:text-[var(--phosphor)]"
            >
              {activeFilters} FILTROS APLICADOS · LIMPIAR
            </button>
          ) : (
            <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-faint)]">
              SIN FILTROS APLICADOS
            </span>
          )}
        </div>

        <div className="flex items-center gap-[10px]">
          <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-faint)]">
            ORDENAR:
          </span>
          {sortOptions.map((option) => {
            const active = state.sort === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => state.setSort(option)}
                className={
                  "border px-[10px] py-[5px] font-mono-plex text-[11px] tracking-[0.6px] transition-instrument " +
                  (active
                    ? "border-[var(--grid)] text-[var(--text)]"
                    : "border-transparent text-[var(--text-faint)] hover:text-[var(--text-dim)]")
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-[48px] py-[36px]">
        {visible.length > 0 ? (
          <div className="grid grid-cols-3 gap-[20px]">
            {visible.map((course) => (
              <CourseCard key={course.courseCode} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-[12px] border border-[var(--grid)] bg-[var(--panel)] px-[48px] py-[64px]">
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
              SIN COINCIDENCIAS
            </span>
            <p className="text-[14px] text-[var(--text-dim)]">
              Ningún registro del índice cumple la combinación de filtros
              activa.
            </p>
            <button
              type="button"
              onClick={state.clearAll}
              className="border border-[var(--grid)] px-[18px] py-[11px] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text)] transition-instrument hover:bg-[var(--text)] hover:text-[var(--chassis)]"
            >
              [ LIMPIAR_FILTROS ]
            </button>
          </div>
        )}
      </div>

      <div className="flex h-[56px] items-center justify-between border-t border-[var(--grid)] px-[48px]">
        <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
          REGISTROS {String(rangeStart).padStart(2, "0")}–
          {String(rangeEnd).padStart(2, "0")} DE {filtered.length}
        </span>
        <div className="flex border border-[var(--grid)]">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={page === 1}
            onClick={() => state.setPage(page - 1)}
            className="flex h-[32px] w-[36px] items-center justify-center border-r border-[var(--grid)] font-mono-plex text-[11px] text-[var(--text-dim)] transition-instrument hover:bg-[var(--panel-raised)] disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                type="button"
                onClick={() => state.setPage(number)}
                aria-current={number === page ? "page" : undefined}
                className={
                  "flex h-[32px] w-[36px] items-center justify-center border-r border-[var(--grid)] font-mono-plex text-[11px] transition-instrument " +
                  (number === page
                    ? "bg-[var(--phosphor)] text-[var(--chassis)]"
                    : "text-[var(--text-dim)] hover:bg-[var(--panel-raised)]")
                }
              >
                {String(number).padStart(2, "0")}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="Página siguiente"
            disabled={page === pageCount}
            onClick={() => state.setPage(page + 1)}
            className="flex h-[32px] w-[36px] items-center justify-center font-mono-plex text-[11px] text-[var(--text-dim)] transition-instrument hover:bg-[var(--panel-raised)] disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
