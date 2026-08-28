"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCatalogFilters } from "@/store/catalog-filters";
import type { Discipline } from "@/lib/types";

// Enlaces profundos por disciplina: /catalogo?disciplina=mecanica-cad
const disciplineBySlug: Record<string, Discipline> = {
  "mecanica-cad": "MECÁNICA_CAD",
  "electronica-eda": "ELECTRÓNICA_EDA",
  "arquitectura-bim": "ARQUITECTURA_BIM",
  manufactura: "MANUFACTURA",
};

export function CatalogQuerySync() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("disciplina");
  const applyDiscipline = useCatalogFilters((state) => state.applyDiscipline);

  useEffect(() => {
    const discipline = slug ? disciplineBySlug[slug] : undefined;
    if (discipline) applyDiscipline(discipline);
  }, [slug, applyDiscipline]);

  return null;
}
