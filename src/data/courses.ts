import type { Course } from "@/lib/types";

// Datos mock. Sustituir por la consulta a Supabase (tabla Courses) cuando exista el backend.
export const courses: Course[] = [
  {
    id: "1",
    courseCode: "SWK-101",
    title: "Fundamentos de Modelado Paramétrico",
    slug: "fundamentos-modelado-parametrico",
    summary:
      "Construcción de sólidos con intención de diseño: croquis totalmente definidos, árbol de operaciones legible y modelos que resisten cambios sin romperse.",
    deliverable: "Pieza mecanizada con plano acotado",
    durationHours: 14.5,
    difficultyLevel: "FUNDAMENTOS",
    discipline: "MECÁNICA_CAD",
    software: ["SOLIDWORKS"],
    prerequisiteCode: null,
    status: "DISPONIBLE",
    updatedAt: "2026.05.02",
    renderUrl: "/renders/swk-101.png",
  },
  {
    id: "2",
    courseCode: "SWK-204",
    title: "Ensambles y Dibujo Técnico Normalizado",
    slug: "ensambles-dibujo-tecnico",
    summary:
      "Relaciones de posición, gestión de ensambles grandes y documentación normalizada con lista de materiales y tolerancias funcionales.",
    deliverable: "Ensamble documentado con LDM y tolerancias",
    durationHours: 19,
    difficultyLevel: "INTERMEDIO",
    discipline: "MECÁNICA_CAD",
    software: ["SOLIDWORKS"],
    prerequisiteCode: "SWK-101",
    status: "DISPONIBLE",
    updatedAt: "2026.06.18",
    renderUrl: "/renders/swk-204.png",
  },
  {
    id: "3",
    courseCode: "SWK-310",
    title: "Superficies Complejas y Chapa Metálica",
    slug: "superficies-complejas-chapa-metalica",
    summary:
      "Construcción de geometría de superficie continua en curvatura, desarrollo de chapa metálica y preparación del modelo para manufactura.",
    deliverable: "Carcasa de instrumento con plano de despiece",
    durationHours: 22,
    difficultyLevel: "AVANZADO",
    discipline: "MECÁNICA_CAD",
    software: ["SOLIDWORKS"],
    prerequisiteCode: "SWK-204",
    status: "DISPONIBLE",
    updatedAt: "2026.07.14",
    renderUrl: "/renders/swk-310.png",
    canvasUrl: "/renders/swk-310-canvas.png",
    trailerUrl: "/renders/swk-310-trailer.png",
    model3dUrl: "/models/carcasa_instrumento.glb",
  },
  {
    id: "4",
    courseCode: "KIC-201",
    title: "Captura de Esquemáticos en KiCad",
    slug: "captura-esquematicos-kicad",
    summary:
      "Del diagrama de bloques al esquema verificado: jerarquías, nomenclatura consistente y comprobación eléctrica antes de tocar la PCB.",
    deliverable: "Esquema jerárquico con ERC limpio",
    durationHours: 12.5,
    difficultyLevel: "INTERMEDIO",
    discipline: "ELECTRÓNICA_EDA",
    software: ["KICAD"],
    prerequisiteCode: null,
    status: "DISPONIBLE",
    updatedAt: "2026.04.09",
    renderUrl: "/renders/kic-201.png",
  },
  {
    id: "5",
    courseCode: "KIC-302",
    title: "Ruteo de PCB Multicapa en KiCad",
    slug: "ruteo-pcb-multicapa-kicad",
    summary:
      "Apilado, integridad de señal y ruteo con impedancia controlada hasta la salida de fabricación verificada.",
    deliverable: "PCB de 4 capas con Gerbers verificados",
    durationHours: 18.5,
    difficultyLevel: "AVANZADO",
    discipline: "ELECTRÓNICA_EDA",
    software: ["KICAD"],
    prerequisiteCode: "KIC-201",
    status: "DISPONIBLE",
    updatedAt: "2026.07.30",
    renderUrl: "/renders/kic-302.png",
  },
  {
    id: "6",
    courseCode: "REV-101",
    title: "Modelado Arquitectónico en Revit",
    slug: "modelado-arquitectonico-revit",
    summary:
      "Modelo constructivo coordinado desde niveles y rejillas hasta la publicación de láminas con tablas de planificación.",
    deliverable: "Modelo BIM con juego de planos publicado",
    durationHours: 15,
    difficultyLevel: "FUNDAMENTOS",
    discipline: "ARQUITECTURA_BIM",
    software: ["REVIT"],
    prerequisiteCode: null,
    status: "DISPONIBLE",
    updatedAt: "2026.03.21",
    renderUrl: "/renders/rev-101.png",
  },
  {
    id: "7",
    courseCode: "REV-215",
    title: "Familias Paramétricas en Revit",
    slug: "familias-parametricas-revit",
    summary:
      "Construcción de familias propias que flexan sin romperse: planos de referencia, parámetros compartidos y control de calidad de biblioteca.",
    deliverable: "Biblioteca de familias parametrizadas",
    durationHours: 16,
    difficultyLevel: "INTERMEDIO",
    discipline: "ARQUITECTURA_BIM",
    software: ["REVIT"],
    prerequisiteCode: "REV-101",
    status: "EN DESARROLLO",
    updatedAt: "2026.08.11",
    renderUrl: "/renders/rev-215.png",
  },
  {
    id: "8",
    courseCode: "SIM-220",
    title: "Simulación Estructural por Elementos Finitos",
    slug: "simulacion-estructural-fea",
    summary:
      "Estudios estáticos con hipótesis explícitas: malla controlada, sujeciones realistas y validación de resultados frente al cálculo analítico.",
    deliverable: "Informe de validación estructural",
    durationHours: 13,
    difficultyLevel: "AVANZADO",
    discipline: "MECÁNICA_CAD",
    software: ["SOLIDWORKS", "ANSYS"],
    prerequisiteCode: "SWK-204",
    status: "DISPONIBLE",
    updatedAt: "2026.06.05",
    renderUrl: "/renders/sim-220.png",
  },
  {
    id: "9",
    courseCode: "MFG-110",
    title: "Impresión 3D y Manufactura Aditiva",
    slug: "impresion-3d-manufactura-aditiva",
    summary:
      "Diseño para aditiva y laminado con criterio: orientación, soportes, tolerancias reales y postproceso de piezas funcionales.",
    deliverable: "Lote de piezas funcionales impresas",
    durationHours: 9.5,
    difficultyLevel: "INTERMEDIO",
    discipline: "MANUFACTURA",
    software: ["CURA", "SOLIDWORKS"],
    prerequisiteCode: "SWK-101",
    status: "DISPONIBLE",
    updatedAt: "2026.05.27",
    renderUrl: "/renders/mfg-110.png",
  },
];

export function getCourseByCode(code: string): Course | undefined {
  return courses.find((course) => course.courseCode === code);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

// Siguiente curso en la cadena de dependencias
export function getNextCourse(code: string): Course | undefined {
  return courses.find((course) => course.prerequisiteCode === code);
}
