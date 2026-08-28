import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubMark, LinkedinMark, YoutubeMark } from "@/components/icons/brand";

const columns = [
  {
    title: "NAVEGACIÓN",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Catálogo técnico", href: "/catalogo" },
      { label: "Rutas", href: "/rutas" },
      { label: "Repositorio", href: "/repositorio" },
    ],
  },
  {
    title: "DISCIPLINAS",
    links: [
      { label: "Mecánica / CAD", href: "/catalogo?disciplina=mecanica-cad" },
      {
        label: "Electrónica / EDA",
        href: "/catalogo?disciplina=electronica-eda",
      },
      {
        label: "Arquitectura / BIM",
        href: "/catalogo?disciplina=arquitectura-bim",
      },
      { label: "Manufactura", href: "/catalogo?disciplina=manufactura" },
    ],
  },
  {
    title: "CUENTA",
    links: [
      { label: "Iniciar sesión", href: "/login" },
      { label: "Mis cursos", href: "/mis-cursos" },
      { label: "Certificados", href: "/certificados" },
      { label: "Soporte técnico", href: "/soporte" },
    ],
  },
];

const socials = [
  { Icon: GithubMark, label: "GitHub", href: "https://github.com" },
  { Icon: LinkedinMark, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: YoutubeMark, label: "YouTube", href: "https://youtube.com" },
  { Icon: Mail, label: "Correo", href: "mailto:contacto@villegas.academy" },
];

const legalFlags = ["PRIVACIDAD", "TÉRMINOS", "REV 1.0.0"];

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--grid)] bg-[var(--chassis)]">
      <div className="flex flex-col gap-[32px] border-b border-[var(--grid)] px-page py-[40px] lg:flex-row lg:gap-[64px] lg:py-[48px]">
        <div className="flex flex-col gap-[16px] lg:w-[380px]">
          <span className="font-mono-plex text-[15px] font-semibold tracking-[0.8px] text-[var(--text)]">
            VILLEGAS_ACADEMIA
          </span>
          <p className="text-[13px] leading-[1.6] text-[var(--text-dim)]">
            Formación técnica en diseño mecánico, electrónica y BIM. Instrucción
            dirigida por Ing. Jaime Andrés Villegas Buriticá.
          </p>
          <div className="flex gap-[8px]">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-[32px] w-[32px] items-center justify-center border border-[var(--grid)] transition-instrument hover:border-[var(--text)] hover:bg-[var(--text)]"
              >
                <Icon
                  size={14}
                  strokeWidth={1.5}
                  className="text-[var(--text-dim)] transition-instrument group-hover:text-[var(--chassis)]"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[28px] sm:grid-cols-3 lg:flex lg:flex-1 lg:gap-[64px]">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-1 flex-col gap-[14px]">
              <span className="font-mono-plex text-[10px] tracking-[1.2px] text-[var(--text-faint)]">
                {column.title}
              </span>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-[var(--text-dim)] transition-instrument hover:text-[var(--text)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[8px] px-page py-[14px] md:h-[44px] md:flex-row md:items-center md:justify-between md:py-0">
        <span className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]">
          © 2026 VILLEGAS_ACADEMIA · TODOS LOS DERECHOS RESERVADOS
        </span>
        <div className="flex gap-[20px]">
          {legalFlags.map((item) => (
            <span
              key={item}
              className="font-mono-plex text-[10px] tracking-[0.6px] text-[var(--text-faint)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
