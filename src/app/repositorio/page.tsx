import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ResourceTable } from "@/components/repository/resource-table";
import { resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Repositorio · VILLEGAS_ACADEMIA",
  description:
    "Base de conocimiento: archivos CAD, guías en PDF, librerías de componentes y ejercicios resueltos vinculados a cada curso.",
};

export default function RepositoryPage() {
  const totalSize = resources
    .map((resource) => Number.parseFloat(resource.size))
    .filter((value) => !Number.isNaN(value))
    .reduce((sum, value) => sum + value, 0);

  const stats = [
    { key: "REGISTROS", value: String(resources.length).padStart(2, "0") },
    { key: "VOLUMEN", value: totalSize.toFixed(1) + " MB" },
    {
      key: "TIPOS",
      value: String(
        new Set(resources.map((resource) => resource.resourceType)).size,
      ).padStart(2, "0"),
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex w-full flex-col">
        <header className="flex items-end justify-between border-b border-[var(--grid)] px-[48px] py-[40px]">
          <div className="flex w-[720px] flex-col gap-[12px]">
            <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--cyan)]">
              BASE DE CONOCIMIENTO
            </span>
            <h1 className="text-[44px] font-semibold leading-[1.1] tracking-[-1.2px] text-[var(--text)]">
              Repositorio
            </h1>
            <p className="text-[15px] leading-[1.6] text-[var(--text-dim)]">
              Archivos CAD, guías en PDF, librerías de componentes y ejercicios
              resueltos. Cada recurso está enlazado a los cursos donde se
              utiliza.
            </p>
          </div>

          <dl className="flex border border-[var(--grid)]">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className={
                  "flex flex-col gap-[5px] px-[20px] py-[14px] " +
                  (index < stats.length - 1
                    ? "border-r border-[var(--grid)]"
                    : "")
                }
              >
                <dt className="font-mono-plex text-[9.5px] tracking-[0.9px] text-[var(--text-faint)]">
                  {stat.key}
                </dt>
                <dd className="whitespace-nowrap font-mono-plex text-[20px] text-[var(--text)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <ResourceTable resources={resources} />
      </main>

      <Footer />
    </>
  );
}
