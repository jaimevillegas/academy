// Taxonomia del catalogo. Refleja el esquema relacional de docs/especificaciones_tecnicas_academia.md

export type Discipline =
  | "MECÁNICA_CAD"
  | "ELECTRÓNICA_EDA"
  | "ARQUITECTURA_BIM"
  | "MANUFACTURA";

export type DifficultyLevel = "FUNDAMENTOS" | "INTERMEDIO" | "AVANZADO";

export type CourseStatus = "DISPONIBLE" | "EN DESARROLLO";

export type SoftwareTag =
  | "SOLIDWORKS"
  | "KICAD"
  | "REVIT"
  | "CURA"
  | "ANSYS";

export type ResourceType = "PDF" | "CAD" | "STL" | "ZIP" | "LINK" | "VIDEO";

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  slug: string;
  summary: string;
  deliverable: string;
  durationHours: number;
  difficultyLevel: DifficultyLevel;
  discipline: Discipline;
  software: SoftwareTag[];
  prerequisiteCode: string | null;
  status: CourseStatus;
  updatedAt: string;
  renderUrl: string;
  canvasUrl?: string;
  trailerUrl?: string;
  model3dUrl?: string;
  udemyLink?: string;
}

export interface Resource {
  id: string;
  title: string;
  resourceType: ResourceType;
  urlOrPath: string;
  size: string;
  courseCodes: string[];
}

export interface LearningPath {
  id: string;
  code: string;
  title: string;
  description: string;
  courseCodes: string[];
  totalHours: number;
  accent: "phosphor" | "cyan" | "amber";
}

export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface Lesson {
  title: string;
  duration: string;
}

export interface SyllabusModule {
  code: string;
  title: string;
  hours: number;
  lessons: Lesson[];
}

export function formatHours(hours: number): string {
  return hours.toFixed(1) + " h";
}

export function countLessons(modules: SyllabusModule[]): number {
  return modules.reduce((total, module) => total + module.lessons.length, 0);
}

// Los recursos se agrupan en el arbol de dependencias por tipo de archivo
export const resourceGroup: Record<ResourceType, string> = {
  CAD: "ARCHIVOS CAD",
  STL: "ARCHIVOS CAD",
  ZIP: "ARCHIVOS CAD",
  PDF: "DOCUMENTACIÓN",
  VIDEO: "DOCUMENTACIÓN",
  LINK: "DOCUMENTACIÓN",
};
