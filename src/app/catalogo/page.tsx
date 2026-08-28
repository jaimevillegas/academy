import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CatalogView } from "@/components/catalog/catalog-view";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Catálogo técnico · VILLEGAS_ACADEMIA",
  description:
    "Índice de unidades de formación en SOLIDWORKS, KiCad y Revit con filtros por disciplina, nivel y software.",
};

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <CatalogView courses={courses} />
      </main>
      <Footer />
    </>
  );
}
