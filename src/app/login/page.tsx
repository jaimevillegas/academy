import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Acceso · VILLEGAS_ACADEMIA",
  description: "Acceso a cursos matriculados, progreso y certificados.",
};

const notes = [
  ["MÉTODO", "CORREO + CLAVE"],
  ["PROVEEDOR", "SUPABASE AUTH"],
  ["ESTADO", "NO CONECTADO"],
  ["SESIÓN", "SIN PERSISTENCIA"],
];

export default function LoginPage() {
  return (
    <>
      <Navbar path="~/ ACCESO" />

      <main className="flex flex-1 flex-col items-center justify-center gap-[32px] px-page py-[40px] lg:flex-row lg:gap-[64px] lg:py-[72px]">
        <LoginForm />

        <aside className="flex w-full max-w-[460px] flex-col gap-[20px] lg:w-[360px]">
          <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--phosphor)]">
            PANEL DE ESTADO
          </span>
          <p className="text-[14px] leading-[1.6] text-[var(--text-dim)]">
            La autenticación se resolverá contra Supabase. Hasta que el backend
            esté conectado, este formulario valida el formato de entrada en
            local y no transmite credenciales.
          </p>
          <dl className="flex flex-col border-t border-[var(--grid-soft)]">
            {notes.map(([key, value]) => (
              <div
                key={key}
                className="flex h-[32px] items-center justify-between border-b border-[var(--grid-soft)]"
              >
                <dt className="font-mono-plex text-[10px] tracking-[0.8px] text-[var(--text-faint)]">
                  {key}
                </dt>
                <dd
                  className={
                    "font-mono-plex text-[11px] " +
                    (value === "NO CONECTADO"
                      ? "text-[var(--amber)]"
                      : "text-[var(--text-dim)]")
                  }
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </main>
    </>
  );
}
