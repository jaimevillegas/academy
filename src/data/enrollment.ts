// Estado del estudiante. Mock: pasará a las tablas Enrollments / Certificates de Supabase.

export interface Enrollment {
  courseCode: string;
  /** Progreso normalizado 0–1 */
  progress: number;
  lessonsDone: number;
  lastLesson: string;
  lastAccess: string;
}

export interface Certificate {
  id: string;
  code: string;
  courseCode: string;
  issuedAt: string;
  /** Hash de verificación pública */
  hash: string;
}

export const student = {
  name: "Jaime Andrés Villegas Buriticá",
  initials: "JV",
  email: "jaimevillegas296@gmail.com",
  memberSince: "2025.11.04",
};

export const enrollments: Enrollment[] = [
  {
    courseCode: "SWK-101",
    progress: 1,
    lessonsDone: 12,
    lastLesson: "Exportación e impresión a escala",
    lastAccess: "2026.06.12",
  },
  {
    courseCode: "MFG-110",
    progress: 1,
    lessonsDone: 8,
    lastLesson: "Acabado superficial y unión",
    lastAccess: "2026.07.03",
  },
  {
    courseCode: "SWK-204",
    progress: 0.62,
    lessonsDone: 7,
    lastLesson: "Vistas de sección y detalle",
    lastAccess: "2026.08.21",
  },
  {
    courseCode: "KIC-201",
    progress: 0.28,
    lessonsDone: 3,
    lastLesson: "Jerarquías y buses",
    lastAccess: "2026.08.26",
  },
  {
    courseCode: "SWK-310",
    progress: 0.06,
    lessonsDone: 1,
    lastLesson: "Continuidad G0 / G1 / G2",
    lastAccess: "2026.08.27",
  },
];

export const certificates: Certificate[] = [
  {
    id: "1",
    code: "CERT-SWK101-0472",
    courseCode: "SWK-101",
    issuedAt: "2026.06.12",
    hash: "9f2c7a41e8b0",
  },
  {
    id: "2",
    code: "CERT-MFG110-0518",
    courseCode: "MFG-110",
    issuedAt: "2026.07.03",
    hash: "3d81b604cf25",
  },
];
