import type { SyllabusModule } from "@/lib/types";

// Índice técnico por curso, indexado por course_code.
export const syllabus: Record<string, SyllabusModule[]> = {
  "SWK-101": [
    {
      code: "M01",
      title: "Entorno y croquis",
      hours: 3.5,
      lessons: [
        { title: "Interfaz, unidades y plantillas de trabajo", duration: "00:14:20" },
        { title: "Relaciones geométricas y cotas", duration: "00:22:10" },
        { title: "Croquis totalmente definido", duration: "00:19:40" },
      ],
    },
    {
      code: "M02",
      title: "Operaciones base",
      hours: 4.0,
      lessons: [
        { title: "Extrusión y revolución", duration: "00:24:00" },
        { title: "Barrido y recubrimiento", duration: "00:28:30" },
        { title: "Redondeos, chaflanes y vaciados", duration: "00:21:15" },
      ],
    },
    {
      code: "M03",
      title: "Intención de diseño",
      hours: 3.5,
      lessons: [
        { title: "Árbol de operaciones y reordenado", duration: "00:20:05" },
        { title: "Ecuaciones y configuraciones", duration: "00:26:40" },
        { title: "Diagnóstico de errores de reconstrucción", duration: "00:18:50" },
      ],
    },
    {
      code: "M04",
      title: "Documentación básica",
      hours: 3.5,
      lessons: [
        { title: "Vistas, cortes y detalles", duration: "00:23:10" },
        { title: "Acotado normalizado", duration: "00:25:35" },
        { title: "Exportación e impresión a escala", duration: "00:16:45" },
      ],
    },
  ],
  "SWK-204": [
    {
      code: "M01",
      title: "Relaciones de posición",
      hours: 5.0,
      lessons: [
        { title: "Grados de libertad en el ensamble", duration: "00:21:00" },
        { title: "Relaciones estándar y avanzadas", duration: "00:27:20" },
        { title: "Subensambles rígidos y flexibles", duration: "00:24:10" },
      ],
    },
    {
      code: "M02",
      title: "Ensambles grandes",
      hours: 4.5,
      lessons: [
        { title: "Modos de resolución y rendimiento", duration: "00:19:30" },
        { title: "Configuraciones y estados de visualización", duration: "00:25:00" },
        { title: "Detección de interferencias", duration: "00:22:40" },
      ],
    },
    {
      code: "M03",
      title: "Dibujo normalizado",
      hours: 5.0,
      lessons: [
        { title: "Formatos y bloques de título", duration: "00:18:20" },
        { title: "Vistas de sección y detalle", duration: "00:26:15" },
        { title: "Lista de materiales y globos", duration: "00:23:45" },
      ],
    },
    {
      code: "M04",
      title: "Tolerancias funcionales",
      hours: 4.5,
      lessons: [
        { title: "Ajustes y encajes ISO 286", duration: "00:24:50" },
        { title: "Introducción a GD&T", duration: "00:29:10" },
        { title: "Verificación dimensional", duration: "00:20:35" },
      ],
    },
  ],
  "SWK-310": [
    {
      code: "M01",
      title: "Fundamentos de superficie",
      hours: 3.5,
      lessons: [
        { title: "Continuidad G0 / G1 / G2", duration: "00:18:40" },
        { title: "Curvas guía y trayectorias", duration: "00:26:10" },
        { title: "Superficie por secciones", duration: "00:31:05" },
        { title: "Recorte, coser y análisis de cebra", duration: "00:22:50" },
      ],
    },
    {
      code: "M02",
      title: "Superficies complejas y transiciones",
      hours: 5.0,
      lessons: [
        { title: "Superficie límite y control de tangencia", duration: "00:29:40" },
        { title: "Rellenos con restricción de curvatura", duration: "00:27:15" },
        { title: "Parches de esquina y transiciones", duration: "00:24:30" },
        { title: "Análisis de curvatura y desviación", duration: "00:21:05" },
      ],
    },
    {
      code: "M03",
      title: "Chapa metálica: bridas y pestañas",
      hours: 5.5,
      lessons: [
        { title: "Brida base y control de espesor", duration: "00:22:20" },
        { title: "Bridas de arista y pestañas", duration: "00:26:50" },
        { title: "Cortes en estado desdoblado", duration: "00:23:35" },
        { title: "Alivios de esquina y pliegues", duration: "00:19:15" },
      ],
    },
    {
      code: "M04",
      title: "Desarrollo plano y despiece",
      hours: 4.0,
      lessons: [
        { title: "Tabla de calibres y factor K", duration: "00:25:10" },
        { title: "Vista de desarrollo", duration: "00:21:40" },
        { title: "Plano de despiece acotado", duration: "00:28:05" },
      ],
    },
    {
      code: "M05",
      title: "Preparación para manufactura",
      hours: 4.0,
      lessons: [
        { title: "Exportación DXF para corte láser", duration: "00:20:30" },
        { title: "Verificación de radios mínimos", duration: "00:22:45" },
        { title: "Checklist de entrega al taller", duration: "00:17:50" },
      ],
    },
  ],
  "KIC-201": [
    {
      code: "M01",
      title: "Entorno KiCad",
      hours: 3.0,
      lessons: [
        { title: "Estructura de proyecto y control de versiones", duration: "00:15:40" },
        { title: "Librerías de símbolos", duration: "00:21:20" },
        { title: "Convenciones de nomenclatura", duration: "00:18:10" },
      ],
    },
    {
      code: "M02",
      title: "Captura del esquema",
      hours: 3.5,
      lessons: [
        { title: "Jerarquías y buses", duration: "00:26:30" },
        { title: "Etiquetas globales y locales", duration: "00:22:15" },
        { title: "Anotación y referencias", duration: "00:19:50" },
      ],
    },
    {
      code: "M03",
      title: "Verificación eléctrica",
      hours: 3.0,
      lessons: [
        { title: "Reglas eléctricas ERC", duration: "00:24:05" },
        { title: "Corrección de errores comunes", duration: "00:20:35" },
      ],
    },
    {
      code: "M04",
      title: "Salida a PCB",
      hours: 3.0,
      lessons: [
        { title: "Asignación de huellas", duration: "00:23:40" },
        { title: "Netlist y sincronización", duration: "00:21:10" },
      ],
    },
  ],
  "KIC-302": [
    {
      code: "M01",
      title: "Apilado y reglas de diseño",
      hours: 4.5,
      lessons: [
        { title: "Definición de stackup", duration: "00:24:20" },
        { title: "Reglas de diseño y clases de red", duration: "00:27:40" },
        { title: "Zonas de cobre y planos", duration: "00:22:05" },
      ],
    },
    {
      code: "M02",
      title: "Colocación de componentes",
      hours: 4.5,
      lessons: [
        { title: "Estrategia de posicionamiento", duration: "00:25:15" },
        { title: "Desacoplo y retorno de corriente", duration: "00:28:50" },
        { title: "Restricciones mecánicas", duration: "00:20:30" },
      ],
    },
    {
      code: "M03",
      title: "Ruteo",
      hours: 5.0,
      lessons: [
        { title: "Impedancia controlada", duration: "00:30:10" },
        { title: "Pares diferenciales", duration: "00:27:25" },
        { title: "Vías y costura de planos", duration: "00:23:45" },
      ],
    },
    {
      code: "M04",
      title: "Salida a fabricación",
      hours: 4.5,
      lessons: [
        { title: "Gerber y archivos de taladro", duration: "00:22:50" },
        { title: "Verificación DRC final", duration: "00:25:35" },
        { title: "Documentación de ensamblaje", duration: "00:21:15" },
      ],
    },
  ],
  "REV-101": [
    {
      code: "M01",
      title: "Entorno, niveles y rejillas",
      hours: 3.5,
      lessons: [
        { title: "Plantillas y unidades", duration: "00:17:30" },
        { title: "Niveles y rejillas", duration: "00:23:10" },
        { title: "Vistas y control de visibilidad", duration: "00:20:45" },
      ],
    },
    {
      code: "M02",
      title: "Elementos constructivos",
      hours: 4.0,
      lessons: [
        { title: "Muros compuestos", duration: "00:26:20" },
        { title: "Suelos y cubiertas", duration: "00:24:40" },
        { title: "Puertas y ventanas", duration: "00:19:55" },
      ],
    },
    {
      code: "M03",
      title: "Circulación y espacios",
      hours: 3.5,
      lessons: [
        { title: "Escaleras y barandillas", duration: "00:28:15" },
        { title: "Habitaciones y áreas", duration: "00:21:30" },
      ],
    },
    {
      code: "M04",
      title: "Documentación y publicación",
      hours: 4.0,
      lessons: [
        { title: "Cotas y etiquetas", duration: "00:22:10" },
        { title: "Tablas de planificación", duration: "00:26:05" },
        { title: "Láminas y publicación", duration: "00:23:20" },
      ],
    },
  ],
  "REV-215": [
    {
      code: "M01",
      title: "Anatomía de una familia",
      hours: 4.0,
      lessons: [
        { title: "Plantillas de familia", duration: "00:20:10" },
        { title: "Planos de referencia y restricciones", duration: "00:27:35" },
        { title: "Parámetros de tipo e instancia", duration: "00:24:50" },
      ],
    },
    {
      code: "M02",
      title: "Geometría paramétrica",
      hours: 4.5,
      lessons: [
        { title: "Sólidos y vacíos", duration: "00:23:15" },
        { title: "Fórmulas y tablas de consulta", duration: "00:29:20" },
        { title: "Matrices y flexado del modelo", duration: "00:25:40" },
      ],
    },
    {
      code: "M03",
      title: "Familias anidadas",
      hours: 4.0,
      lessons: [
        { title: "Anidamiento y parámetros compartidos", duration: "00:28:30" },
        { title: "Familias de detalle", duration: "00:22:45" },
      ],
    },
    {
      code: "M04",
      title: "Publicación en biblioteca",
      hours: 3.5,
      lessons: [
        { title: "Categorías y subcategorías", duration: "00:21:05" },
        { title: "Control de calidad de biblioteca", duration: "00:24:15" },
      ],
    },
  ],
  "SIM-220": [
    {
      code: "M01",
      title: "Fundamentos del método",
      hours: 3.5,
      lessons: [
        { title: "Hipótesis y limitaciones del FEA", duration: "00:22:40" },
        { title: "Tipos de estudio", duration: "00:19:20" },
        { title: "Preparación y simplificación de geometría", duration: "00:24:10" },
      ],
    },
    {
      code: "M02",
      title: "Malla y contactos",
      hours: 3.5,
      lessons: [
        { title: "Control de malla y refinado local", duration: "00:26:15" },
        { title: "Contactos y conectores", duration: "00:23:50" },
      ],
    },
    {
      code: "M03",
      title: "Cargas y restricciones",
      hours: 3.0,
      lessons: [
        { title: "Sujeciones realistas", duration: "00:25:30" },
        { title: "Cargas y coeficientes de seguridad", duration: "00:21:45" },
      ],
    },
    {
      code: "M04",
      title: "Interpretación de resultados",
      hours: 3.0,
      lessons: [
        { title: "Tensión de von Mises y desplazamientos", duration: "00:27:20" },
        { title: "Convergencia y validación analítica", duration: "00:23:05" },
      ],
    },
  ],
  "MFG-110": [
    {
      code: "M01",
      title: "Tecnologías y materiales",
      hours: 2.5,
      lessons: [
        { title: "FDM, SLA y SLS", duration: "00:19:40" },
        { title: "Materiales y propiedades mecánicas", duration: "00:22:15" },
      ],
    },
    {
      code: "M02",
      title: "Diseño para aditiva",
      hours: 2.5,
      lessons: [
        { title: "Voladizos, orientación y soportes", duration: "00:24:30" },
        { title: "Tolerancias y ajustes reales", duration: "00:21:50" },
      ],
    },
    {
      code: "M03",
      title: "Laminado",
      hours: 2.5,
      lessons: [
        { title: "Parámetros de impresión", duration: "00:26:10" },
        { title: "Perfiles, perímetros y relleno", duration: "00:20:25" },
      ],
    },
    {
      code: "M04",
      title: "Postproceso",
      hours: 2.0,
      lessons: [
        { title: "Retirada de soportes", duration: "00:18:35" },
        { title: "Acabado superficial y unión", duration: "00:21:10" },
      ],
    },
  ],
};

export function getSyllabus(courseCode: string): SyllabusModule[] {
  return syllabus[courseCode] ?? [];
}
