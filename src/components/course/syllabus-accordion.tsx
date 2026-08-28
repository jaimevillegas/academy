"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Circle, CirclePlay } from "lucide-react";
import { countLessons, type SyllabusModule } from "@/lib/types";

export function SyllabusAccordion({ modules }: { modules: SyllabusModule[] }) {
  const [open, setOpen] = useState<string[]>(
    modules.length > 0 ? [modules[0].code] : [],
  );

  const allOpen = open.length === modules.length;

  function toggle(code: string) {
    setOpen((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code],
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-[24px] border-b border-[var(--grid)] px-page py-[32px] lg:border-b-0 lg:border-r xl:py-[40px]">
      <header className="flex flex-wrap items-end justify-between gap-[12px]">
        <div className="flex flex-col gap-[10px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
            ÍNDICE TÉCNICO
          </span>
          <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[var(--text)] md:text-[26px]">
            {modules.length} módulos · {countLessons(modules)} lecciones
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            setOpen(allOpen ? [] : modules.map((module) => module.code))
          }
          className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)] transition-instrument hover:text-[var(--text)]"
        >
          {allOpen ? "PLEGAR TODO −" : "EXPANDIR TODO +"}
        </button>
      </header>

      <div className="flex flex-col border border-[var(--grid)]">
        {modules.map((module, index) => {
          const isOpen = open.includes(module.code);
          const Chevron = isOpen ? ChevronDown : ChevronRight;
          return (
            <section
              key={module.code}
              className={
                "flex flex-col " +
                (index < modules.length - 1
                  ? "border-b border-[var(--grid)]"
                  : "")
              }
            >
              <button
                type="button"
                onClick={() => toggle(module.code)}
                aria-expanded={isOpen}
                className={
                  "flex min-h-[56px] items-center gap-[12px] px-[16px] py-[10px] text-left transition-instrument md:gap-[16px] md:px-[20px] " +
                  (isOpen
                    ? "bg-[var(--panel)]"
                    : "hover:bg-[var(--panel)]")
                }
              >
                <Chevron
                  size={15}
                  strokeWidth={1.5}
                  className={
                    isOpen
                      ? "text-[var(--phosphor)]"
                      : "text-[var(--text-faint)]"
                  }
                />
                <span
                  className={
                    "w-[38px] font-mono-plex text-[11px] " +
                    (isOpen
                      ? "text-[var(--phosphor)]"
                      : "text-[var(--text-faint)]")
                  }
                >
                  {module.code}
                </span>
                <span className="flex-1 text-[16px] font-medium text-[var(--text)]">
                  {module.title}
                </span>
                <span className="hidden font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)] sm:block">
                  {String(module.lessons.length).padStart(2, "0")} LECC.
                </span>
                <span className="w-[52px] text-right font-mono-plex text-[11px] text-[var(--text-dim)]">
                  {module.hours.toFixed(1)} h
                </span>
              </button>

              {isOpen && (
                <ol className="flex flex-col border-t border-[var(--grid)] pb-[14px] pl-[16px] pr-[16px] pt-[8px] md:pl-[53px] md:pr-[20px]">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const LessonIcon = lessonIndex === 0 ? CirclePlay : Circle;
                    return (
                      <li
                        key={lesson.title}
                        className="flex min-h-[34px] items-center gap-[10px] py-[6px] md:gap-[14px] md:py-0"
                      >
                        <LessonIcon
                          size={13}
                          strokeWidth={1.5}
                          className={
                            lessonIndex === 0
                              ? "text-[var(--phosphor)]"
                              : "text-[var(--text-faint)]"
                          }
                        />
                        <span className="font-mono-plex text-[10px] text-[var(--text-faint)]">
                          {String(lessonIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[14px] text-[var(--text-dim)]">
                          {lesson.title}
                        </span>
                        <span className="font-mono-plex text-[11px] text-[var(--text-faint)]">
                          {lesson.duration}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
