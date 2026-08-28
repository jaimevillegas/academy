"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy, Menu, X } from "lucide-react";

const navItems = [
  { label: "INICIO", href: "/", external: false },
  { label: "CATÁLOGO_TÉCNICO", href: "/catalogo", external: false },
  { label: "RUTAS", href: "/rutas", external: false },
  { label: "REPOSITORIO", href: "/repositorio", external: false },
  { label: "PORTAFOLIO", href: "https://jaimevillegas.dev", external: true },
];

const statusFlags = ["REV 1.0.0", "BUILD 2026.08.28", "LAT 12ms"];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar({ path }: { path?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activeItem = navItems.find(
    (item) => !item.external && isActive(pathname, item.href),
  );
  const statusPath = path ?? "~/ " + (activeItem ? activeItem.label : "INICIO");

  return (
    <header className="w-full bg-[var(--chassis)]">
      <div className="flex h-[60px] items-center justify-between gap-[16px] border-b border-[var(--grid)] px-[20px] xl:px-[28px]">
        <Link href="/" className="flex items-center gap-[10px]">
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center font-mono-plex text-[14px] font-semibold bg-[var(--phosphor)] text-[var(--chassis)]">
            J
          </span>
          <span className="flex flex-col gap-px">
            <span className="font-mono-plex text-[13px] font-semibold tracking-[0.5px] text-[var(--text)]">
              VILLEGAS_ACADEMIA
            </span>
            <span className="hidden font-mono-plex text-[9px] tracking-[0.6px] text-[var(--text-faint)] sm:block">
              FORMACIÓN TÉCNICA · CAD / EDA / BIM
            </span>
          </span>
        </Link>

        <nav className="hidden h-full items-center lg:flex">
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const state = active
              ? "border-[var(--phosphor)] text-[var(--phosphor)]"
              : "border-transparent text-[var(--text-dim)] hover:text-[var(--text)]";
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={
                  "flex h-full items-center border-b-2 px-[10px] font-mono-plex text-[11px] tracking-[0.8px] transition-instrument xl:px-[16px] " +
                  state
                }
              >
                [{item.label}]
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-[8px]">
          <Link
            href="/soporte"
            className="group hidden items-center gap-[7px] border border-[var(--grid)] px-[14px] py-[8px] transition-instrument hover:border-[var(--text)] hover:bg-[var(--text)] lg:flex"
          >
            <LifeBuoy
              size={13}
              strokeWidth={1.5}
              className="text-[var(--text-dim)] transition-instrument group-hover:text-[var(--chassis)]"
            />
            <span className="font-mono-plex text-[11px] tracking-[0.8px] text-[var(--text-dim)] transition-instrument group-hover:text-[var(--chassis)]">
              SOPORTE
            </span>
          </Link>
          <Link
            href="/login"
            className="bg-[var(--phosphor)] px-[16px] py-[8px] font-mono-plex text-[11px] font-semibold tracking-[0.8px] text-[var(--chassis)] transition-instrument hover:bg-[var(--text)]"
          >
            LOGIN
          </Link>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
            className="flex h-[36px] w-[36px] items-center justify-center border border-[var(--grid)] text-[var(--text-dim)] transition-instrument hover:border-[var(--text)] hover:text-[var(--text)] lg:hidden"
          >
            {open ? (
              <X size={16} strokeWidth={1.5} />
            ) : (
              <Menu size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-b border-[var(--grid)] bg-[var(--panel)] lg:hidden">
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={
                  "flex h-[48px] items-center border-b border-[var(--grid-soft)] px-[20px] font-mono-plex text-[12px] tracking-[0.8px] transition-instrument " +
                  (active
                    ? "text-[var(--phosphor)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]")
                }
              >
                [{item.label}]
              </Link>
            );
          })}
          <Link
            href="/soporte"
            onClick={() => setOpen(false)}
            className="flex h-[48px] items-center gap-[8px] px-[20px] font-mono-plex text-[12px] tracking-[0.8px] text-[var(--text-dim)] transition-instrument hover:text-[var(--text)]"
          >
            <LifeBuoy size={13} strokeWidth={1.5} />
            SOPORTE
          </Link>
        </nav>
      )}

      <div className="flex h-[28px] items-center justify-between gap-[16px] border-b border-[var(--grid)] bg-[var(--panel)] px-[20px] xl:px-[28px]">
        <div className="flex items-center gap-[20px]">
          <span className="flex items-center gap-[7px]">
            <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--phosphor)]" />
            <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-dim)]">
              SISTEMA OPERATIVO
            </span>
          </span>
          {statusFlags.map((flag) => (
            <span
              key={flag}
              className="hidden font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)] lg:block"
            >
              {flag}
            </span>
          ))}
        </div>
        <span className="truncate font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
          {statusPath}
        </span>
      </div>
    </header>
  );
}
