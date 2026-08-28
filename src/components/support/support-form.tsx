"use client";

import { useState, type FormEvent } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

const categories = ["ACCESO", "CONTENIDO", "ARCHIVOS", "FACTURACIÓN"];

type Status = "idle" | "sending" | "unavailable";

export function SupportForm({ courseCodes }: { courseCodes: string[] }) {
  const [category, setCategory] = useState(categories[0]);
  const [courseCode, setCourseCode] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (subject.trim().length < 6) {
      nextErrors.subject = "MÍNIMO 6 CARACTERES";
    }
    if (message.trim().length < 20) {
      nextErrors.message = "DESCRIBE LA INCIDENCIA · MÍNIMO 20 CARACTERES";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    // Sin backend todavía: no se envía nada a ningún servidor.
    window.setTimeout(() => setStatus("unavailable"), 400);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-1 flex-col gap-[24px] border-b border-[var(--grid)] px-page py-[32px] lg:border-b-0 lg:border-r xl:py-[40px]"
    >
      <div className="flex flex-col gap-[10px]">
        <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
          NUEVA INCIDENCIA
        </span>
        <h2 className="text-[26px] font-semibold tracking-[-0.5px] text-[var(--text)]">
          Abrir ticket de soporte
        </h2>
      </div>

      <fieldset className="flex flex-col gap-[10px]">
        <legend className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
          CATEGORÍA
        </legend>
        <div className="flex flex-wrap gap-[8px]">
          {categories.map((option) => {
            const active = category === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                aria-pressed={active}
                className={
                  "border px-[12px] py-[7px] font-mono-plex text-[11px] tracking-[0.6px] transition-instrument " +
                  (active
                    ? "border-[var(--phosphor)] bg-[var(--phosphor)] text-[var(--chassis)]"
                    : "border-[var(--grid)] text-[var(--text-dim)] hover:border-[var(--text)] hover:text-[var(--text)]")
                }
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-[7px]">
        <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
          UNIDAD RELACIONADA (OPCIONAL)
        </span>
        <select
          value={courseCode}
          onChange={(event) => setCourseCode(event.target.value)}
          className="h-[42px] border border-[var(--grid)] bg-[var(--chassis)] px-[12px] font-mono-plex text-[13px] text-[var(--text)] outline-none transition-instrument focus:border-[var(--phosphor)]"
        >
          <option value="">NINGUNA</option>
          {courseCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
          ASUNTO
        </span>
        <input
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          placeholder="resumen en una línea"
          aria-invalid={errors.subject !== undefined}
          className={
            "h-[42px] border bg-[var(--chassis)] px-[12px] font-mono-plex text-[13px] text-[var(--text)] outline-none transition-instrument placeholder:text-[var(--text-faint)] " +
            (errors.subject
              ? "border-[var(--amber)]"
              : "border-[var(--grid)] focus:border-[var(--phosphor)]")
          }
        />
        {errors.subject && (
          <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--amber)]">
            {errors.subject}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-[7px]">
        <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
          DESCRIPCIÓN
        </span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={7}
          placeholder="pasos para reproducir, versión del software, capturas…"
          aria-invalid={errors.message !== undefined}
          className={
            "resize-none border bg-[var(--chassis)] p-[12px] font-mono-plex text-[13px] leading-[1.6] text-[var(--text)] outline-none transition-instrument placeholder:text-[var(--text-faint)] " +
            (errors.message
              ? "border-[var(--amber)]"
              : "border-[var(--grid)] focus:border-[var(--phosphor)]")
          }
        />
        <div className="flex justify-between">
          {errors.message ? (
            <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--amber)]">
              {errors.message}
            </span>
          ) : (
            <span />
          )}
          <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
            {message.trim().length} CARACTERES
          </span>
        </div>
      </label>

      <div className="flex flex-wrap items-center gap-[16px]">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-[46px] items-center justify-center gap-[8px] bg-[var(--phosphor)] px-[28px] font-mono-plex text-[12px] font-semibold tracking-[1px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)] disabled:opacity-60"
        >
          {status === "sending" && (
            <Loader2 size={14} strokeWidth={2} className="animate-spin" />
          )}
          [ ENVIAR_TICKET ]
        </button>
        <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
          RESPUESTA MEDIA · 12 h HÁBILES
        </span>
      </div>

      {status === "unavailable" && (
        <div
          role="status"
          className="flex items-start gap-[10px] border border-[var(--amber)] px-[14px] py-[12px]"
        >
          <AlertTriangle
            size={14}
            strokeWidth={1.5}
            className="mt-[2px] shrink-0 text-[var(--amber)]"
          />
          <p className="font-mono-plex text-[10.5px] leading-[1.5] tracking-[0.4px] text-[var(--amber)]">
            COLA DE TICKETS NO CONECTADA. EL MENSAJE NO SE HA ENVIADO. USA EL
            CORREO DIRECTO MIENTRAS TANTO.
          </p>
        </div>
      )}
    </form>
  );
}
