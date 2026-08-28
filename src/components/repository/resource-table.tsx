"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { resourceAccent } from "@/data/resources";
import type { Resource, ResourceType } from "@/lib/types";

const typeOptions: ResourceType[] = ["PDF", "CAD", "STL", "ZIP", "VIDEO"];

export function ResourceTable({ resources }: { resources: Resource[] }) {
  const [types, setTypes] = useState<ResourceType[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return resources.filter((resource) => {
      if (types.length > 0 && !types.includes(resource.resourceType)) {
        return false;
      }
      if (needle.length > 0) {
        const haystack = (
          resource.title +
          " " +
          resource.courseCodes.join(" ")
        ).toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [resources, types, query]);

  function toggleType(type: ResourceType) {
    setTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  }

  return (
    <>
      <div className="flex h-[48px] items-center gap-[16px] border-b border-[var(--grid)] bg-[var(--panel)] px-[48px]">
        <span className="w-[110px] font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
          TIPO
        </span>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => setTypes([])}
            aria-pressed={types.length === 0}
            className={
              "border px-[12px] py-[7px] font-mono-plex text-[11px] tracking-[0.6px] transition-instrument " +
              (types.length === 0
                ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--chassis)]"
                : "border-[var(--grid)] text-[var(--text-dim)] hover:border-[var(--text)] hover:text-[var(--text)]")
            }
          >
            TODOS
          </button>
          {typeOptions.map((type) => {
            const active = types.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={active}
                className={
                  "border px-[12px] py-[7px] font-mono-plex text-[11px] tracking-[0.6px] transition-instrument " +
                  (active
                    ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--chassis)]"
                    : "border-[var(--grid)] text-[var(--text-dim)] hover:border-[var(--text)] hover:text-[var(--text)]")
                }
              >
                {type}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex h-[32px] w-[320px] items-center gap-[10px] border border-[var(--grid)] bg-[var(--chassis)] px-[12px] transition-instrument focus-within:border-[var(--cyan)]">
          <Search
            size={13}
            strokeWidth={1.5}
            className="text-[var(--text-faint)]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="buscar recurso o curso…"
            aria-label="Buscar en el repositorio"
            className="flex-1 bg-transparent font-mono-plex text-[11px] text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
          />
        </div>
      </div>

      <div className="flex h-[34px] items-center border-b border-[var(--grid)] bg-[var(--chassis)] px-[48px] font-mono-plex text-[9.5px] tracking-[1px] text-[var(--text-faint)]">
        <span className="w-[90px]">TIPO</span>
        <span className="flex-1">RECURSO</span>
        <span className="w-[200px]">CURSOS VINCULADOS</span>
        <span className="w-[90px]">PESO</span>
      </div>

      {filtered.map((resource) => (
        <a
          key={resource.id}
          href={resource.urlOrPath}
          className="flex h-[52px] items-center border-b border-[var(--grid-soft)] px-[48px] transition-instrument hover:bg-[var(--panel)]"
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
          <span className="w-[200px] font-mono-plex text-[11px] text-[var(--text-dim)]">
            {resource.courseCodes.join(" · ")}
          </span>
          <span className="w-[90px] font-mono-plex text-[11px] text-[var(--text-faint)]">
            {resource.size}
          </span>
        </a>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-[10px] px-[48px] py-[56px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--amber)]">
            SIN COINCIDENCIAS
          </span>
          <p className="text-[14px] text-[var(--text-dim)]">
            Ningún recurso del repositorio cumple el filtro activo.
          </p>
        </div>
      )}

      <div className="flex h-[44px] items-center justify-between px-[48px]">
        <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
          MOSTRANDO {filtered.length} DE {resources.length} REGISTROS
        </span>
        <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
          ÍNDICE SINCRONIZADO · {new Date().getFullYear()}
        </span>
      </div>
    </>
  );
}
