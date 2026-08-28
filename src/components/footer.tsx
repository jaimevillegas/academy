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
      { label: "Mecánica / CAD", href: "/catalogo?disciplina=MECANICA_CAD" },
      {
        label: "Electrónica / EDA",
        href: "/catalogo?disciplina=ELECTRONICA_EDA",
      },
      {
        label: "Arquitectura / BIM",
        href: "/catalogo?disciplina=ARQUITECTURA_BIM",
      },
      { label: "Manufactura", href: "/catalogo?disciplina=MANUFACTURA" },
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
      <div className="flex gap-[64px] border-b border-[var(--grid)] px-[48px] py-[48px]">
        <div className="flex w-[380px] flex-col gap-[16px]">
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

      <div className="flex h-[44px] items-center justify-between px-[48px]">
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
