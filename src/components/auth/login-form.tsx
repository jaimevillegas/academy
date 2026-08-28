"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";

type Status = "idle" | "checking" | "unavailable";

interface FieldErrors {
  email?: string;
  password?: string;
}

const inputBase =
  "h-[42px] border bg-[var(--chassis)] px-[12px] font-mono-plex text-[13px] text-[var(--text)] outline-none transition-instrument placeholder:text-[var(--text-faint)]";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "FORMATO DE CORREO NO VÁLIDO";
    }
    if (password.length < 8) {
      nextErrors.password = "MÍNIMO 8 CARACTERES";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    // Sin backend todavía: se deja constancia del estado real del sistema.
    window.setTimeout(() => setStatus("unavailable"), 400);
  }

  return (
    <div className="flex w-full max-w-[460px] flex-col border border-[var(--grid)] bg-[var(--panel)]">
      <div className="flex h-[34px] items-center justify-between border-b border-[var(--grid)] bg-[var(--panel-raised)] px-[20px]">
        <span className="font-mono-plex text-[10px] tracking-[1.4px] text-[var(--text-dim)]">
          ACCESO_AL_SISTEMA
        </span>
        <span className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
          REV 1.0.0
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-[20px] p-[24px] md:p-[32px]"
      >
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-[26px] font-semibold tracking-[-0.5px] text-[var(--text)]">
            Identificación
          </h1>
          <p className="text-[14px] leading-[1.55] text-[var(--text-dim)]">
            Acceso a cursos matriculados, progreso y certificados emitidos.
          </p>
        </div>

        <label className="flex flex-col gap-[7px]">
          <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
            CORREO
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="usuario@dominio.com"
            aria-invalid={errors.email !== undefined}
            className={
              inputBase +
              (errors.email
                ? " border-[var(--amber)]"
                : " border-[var(--grid)] focus:border-[var(--phosphor)]")
            }
          />
          {errors.email && (
            <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--amber)]">
              {errors.email}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-[7px]">
          <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
            CLAVE
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            aria-invalid={errors.password !== undefined}
            className={
              inputBase +
              (errors.password
                ? " border-[var(--amber)]"
                : " border-[var(--grid)] focus:border-[var(--phosphor)]")
            }
          />
          {errors.password && (
            <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--amber)]">
              {errors.password}
            </span>
          )}
        </label>

        <button
          type="submit"
          disabled={status === "checking"}
          className="flex h-[46px] items-center justify-center gap-[8px] bg-[var(--phosphor)] font-mono-plex text-[12px] font-semibold tracking-[1px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)] disabled:opacity-60"
        >
          {status === "checking" && (
            <Loader2 size={14} strokeWidth={2} className="animate-spin" />
          )}
          [ INICIAR_SESIÓN ]
        </button>

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
              SERVICIO DE AUTENTICACIÓN NO CONECTADO. LAS CREDENCIALES NO SE HAN
              ENVIADO A NINGÚN SERVIDOR.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[var(--grid-soft)] pt-[16px]">
          <Link
            href="/soporte"
            className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)] transition-instrument hover:text-[var(--text)]"
          >
            RECUPERAR_ACCESO
          </Link>
          <Link
            href="/catalogo"
            className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--cyan)] transition-instrument hover:text-[var(--text)]"
          >
            SIN CUENTA · VER_CATÁLOGO →
          </Link>
        </div>
      </form>
    </div>
  );
}
