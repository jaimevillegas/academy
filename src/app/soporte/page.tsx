import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SupportForm } from "@/components/support/support-form";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Soporte · VILLEGAS_ACADEMIA",
  description:
    "Canal de incidencias técnicas, estado de los servicios y contacto directo con el instructor.",
};

const services = [
  { name: "PLATAFORMA WEB", state: "OPERATIVO", color: "var(--phosphor)" },
  { name: "REPRODUCTOR DE VÍDEO", state: "OPERATIVO", color: "var(--phosphor)" },
  { name: "DESCARGA DE ARCHIVOS", state: "OPERATIVO", color: "var(--phosphor)" },
  { name: "AUTENTICACIÓN", state: "NO CONECTADO", color: "var(--amber)" },
  { name: "EMISIÓN DE CERTIFICADOS", state: "NO CONECTADO", color: "var(--amber)" },
];

const faq = [
  {
    question: "¿Puedo descargar los archivos CAD sin estar matriculado?",
    answer:
      "El repositorio es abierto. Los archivos vinculados a un curso concreto requieren matrícula activa en esa unidad.",
  },
  {
    question: "¿Qué versión del software necesito?",
    answer:
      "Cada ficha técnica indica la versión mínima en el campo SOFTWARE. Los archivos se publican en la versión indicada y una anterior.",
  },
  {
    question: "¿Los certificados tienen validación externa?",
    answer:
      "Llevan un hash de verificación pública asociado a la unidad y a la fecha de emisión.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar path="~/ SOPORTE" />

      <main className="flex w-full flex-col">
        <header className="flex flex-col gap-[16px] border-b border-[var(--grid)] px-page py-[32px] lg:flex-row lg:items-end lg:justify-between xl:py-[40px]">
          <div className="flex flex-col gap-[12px] lg:max-w-[720px]">
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--cyan)]">
              CANAL DE SOPORTE TÉCNICO
            </span>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.8px] text-[var(--text)] md:text-[38px] xl:text-[44px] xl:tracking-[-1.2px]">
              Soporte
            </h1>
            <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
              Incidencias de acceso, contenido, archivos o facturación. Las
              consultas técnicas sobre ejercicios se responden dentro de la
              propia unidad.
            </p>
          </div>
        </header>

        <div className="flex flex-col border-b border-[var(--grid)] lg:flex-row">
          <SupportForm
            courseCodes={courses.map((course) => course.courseCode)}
          />

          <aside className="flex w-full flex-col gap-[28px] bg-[var(--panel)] px-page py-[32px] lg:w-[380px] lg:px-[24px] xl:w-[440px] xl:px-[32px] xl:py-[40px]">
            <section className="flex flex-col gap-[12px]">
              <span className="font-mono-plex text-[10px] tracking-[1.2px] text-[var(--text-faint)]">
                ESTADO DE SERVICIOS
              </span>
              <dl className="flex flex-col border-t border-[var(--grid-soft)]">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex min-h-[34px] items-center justify-between gap-[16px] border-b border-[var(--grid-soft)] py-[6px] md:py-0"
                  >
                    <dt className="font-mono-plex text-[11px] text-[var(--text-dim)]">
                      {service.name}
                    </dt>
                    <dd className="flex items-center gap-[8px]">
                      <span
                        className="h-[5px] w-[5px] rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span
                        className="font-mono-plex text-[10px] tracking-[0.6px]"
                        style={{ color: service.color }}
                      >
                        {service.state}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="flex flex-col gap-[12px]">
              <span className="font-mono-plex text-[10px] tracking-[1.2px] text-[var(--text-faint)]">
                CONTACTO DIRECTO
              </span>
              <a
                href="mailto:contacto@villegas.academy"
                className="group flex items-center gap-[12px] border border-[var(--grid)] px-[16px] py-[14px] transition-instrument hover:border-[var(--text)]"
              >
                <Mail
                  size={15}
                  strokeWidth={1.5}
                  className="text-[var(--text-faint)] transition-instrument group-hover:text-[var(--text)]"
                />
                <span className="flex flex-col gap-[3px]">
                  <span className="font-mono-plex text-[12px] text-[var(--text)]">
                    contacto@villegas.academy
                  </span>
                  <span className="font-mono-plex text-[9.5px] tracking-[0.6px] text-[var(--text-faint)]">
                    INCIDENCIAS Y FACTURACIÓN
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-[12px] border border-[var(--grid)] px-[16px] py-[14px]">
                <MessageSquare
                  size={15}
                  strokeWidth={1.5}
                  className="text-[var(--text-faint)]"
                />
                <span className="flex flex-col gap-[3px]">
                  <span className="font-mono-plex text-[12px] text-[var(--text)]">
                    Foro por unidad
                  </span>
                  <span className="font-mono-plex text-[9.5px] tracking-[0.6px] text-[var(--text-faint)]">
                    DISPONIBLE DENTRO DE CADA CURSO
                  </span>
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-[12px]">
              <span className="font-mono-plex text-[10px] tracking-[1.2px] text-[var(--text-faint)]">
                PREGUNTAS FRECUENTES
              </span>
              <div className="flex flex-col gap-[16px] border-t border-[var(--grid-soft)] pt-[16px]">
                {faq.map((item) => (
                  <div key={item.question} className="flex flex-col gap-[6px]">
                    <h3 className="text-[14px] font-medium leading-[1.4] text-[var(--text)]">
                      {item.question}
                    </h3>
                    <p className="text-[13px] leading-[1.55] text-[var(--text-dim)]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
