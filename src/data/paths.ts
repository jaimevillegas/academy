import type { LearningPath, Metric } from "@/lib/types";

export const learningPaths: LearningPath[] = [
  {
    id: "1",
    code: "R-01",
    title: "Prototipado Físico",
    description:
      "De la pieza modelada en SOLIDWORKS a la PCB ruteada en KiCad y el ensamble impreso.",
    courseCodes: ["SWK-101", "SWK-204", "KIC-302", "MFG-110"],
    totalHours: 78,
    accent: "phosphor",
  },
  {
    id: "2",
    code: "R-02",
    title: "Diseño Mecánico Avanzado",
    description:
      "Superficies complejas, chapa metálica, tolerancias y validación por simulación estructural.",
    courseCodes: ["SWK-204", "SWK-310", "SIM-220"],
    totalHours: 54,
    accent: "cyan",
  },
  {
    id: "3",
    code: "R-03",
    title: "Coordinación BIM",
    description:
      "Modelado paramétrico en Revit, familias propias y detección de interferencias MEP.",
    courseCodes: ["REV-101", "REV-215", "BIM-330"],
    totalHours: 46,
    accent: "amber",
  },
];

export const authorityMetrics: Metric[] = [
  {
    value: "1 240",
    label: "HORAS DE INSTRUCCIÓN TÉCNICA",
    detail: "registro acumulado",
  },
  { value: "8 460", label: "ESTUDIANTES ACTIVOS", detail: "42 países" },
  { value: "37", label: "CURSOS PUBLICADOS", detail: "CAD · EDA · BIM" },
  { value: "4.8", label: "VALORACIÓN MEDIA", detail: "sobre 5.0" },
];
