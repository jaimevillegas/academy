# ESPECIFICACIONES TÉCNICAS Y DE DISEÑO
**Proyecto:** Plataforma de Formación Técnica y Academia (SOLIDWORKS, KiCad, Revit)
**Líder Técnico e Instructor:** Ing. Jaime Andrés Villegas Buriticá
**Revisión:** 1.0.0
**Fecha:** 28 de Agosto de 2026
**Filosofía de Diseño:** Brutalismo Funcional / Interfaz de Precisión (Osciloscopio/Panel de Control)

## 1. TOKENS DE DISEÑO E IDENTIDAD VISUAL

**Concepto Central:** El sitio es un instrumento de trabajo. Información densa pero perfectamente compartimentada. Sin decoración superflua. Referencias: Instrumentación de laboratorio, manuales industriales, software de telemetría y CAD.

**1.1. Tipografía**
*   **Fuente Principal (UI y Cuerpo):** `IBM Plex Sans` o `Inter`.
*   **Fuente Secundaria (Metadatos, Etiquetas, Datos Duros):** `JetBrains Mono` o `IBM Plex Mono`.
*   **Escala Modular:** Aplicación estricta de jerarquías (factor 1.2 o 1.25).

**1.2. Paleta de Color (Modo Oscuro Nativo)**
*   **Chasis (Fondo Global):** `#0A0A0A` (Negro instrumental) o `#111827`.
*   **Paneles (Superficies de Tarjetas/Secciones):** `#1C1C1C` o `#1F2937`.
*   **Retícula y Bordes:** `#333333` (Líneas divisorias estrictas de 1px).
*   **Fósforo Primario (Acción/Estado Activo):** Verde `#00FF41` o Cian `#00E5FF`.
*   **Fósforo Secundario (Advertencia/Destacado):** Ámbar `#FFB000`.
*   **Texto Principal:** Blanco roto `#F3F4F6`.
*   **Texto Secundario (Metadatos):** Gris `#9CA3AF`.

**1.3. UI y Geometría**
*   **Border Radius:** Estricto a `0px` (preferido) o máximo `2px` (esquinas vivas, cero efecto "SaaS burbujeante").
*   **Sombras (Drop Shadows):** Ninguna. La profundidad se logra mediante líneas de borde sólido (1px) y contraste de grises.
*   **Iconografía:** Trazo fino (1px - 1.5px), geométrica, sin relleno (Ej. Phosphor Icons o Lucide en configuración recta).
*   **Botones:** Estados sólidos. Bloques de color o tipo *ghost* (borde 1px) que invierten su color instantáneamente al hacer *hover*.

**1.4. Movimiento y Transiciones**
*   **Duración:** 100ms - 150ms (Mecánicas, secas, de confirmación de estado).
*   **Easing:** Curvas lineales o ease-out abrupto (`cubic-bezier(0.16, 1, 0.3, 1)`). Sin rebotes.

---

## 2. MAPA DE NAVEGACIÓN (RUTAS GLOBALES)

El sistema de enrutamiento principal en el Navbar superior consta de:

*   `[INICIO]`: Panel principal con visualizador 3D y métricas de autoridad.
*   `[CATÁLOGO_TÉCNICO]`: Índice densamente poblado de todos los cursos.
*   `[RUTAS]`: *Learning paths* (Ej. Ruta de Prototipado Físico: De SOLIDWORKS a PCB).
*   `[REPOSITORIO]`: Base de conocimiento (PDFs, eBooks, ejercicios).
*   `[PORTAFOLIO]`: Enlace externo al dominio del portafolio profesional de ingeniería mecatrónica y desarrollo.
*   `[LOGIN / SOPORTE]`: Ubicados estratégicamente en la esquina superior derecha.

---

## 3. ARQUITECTURA DE VISTAS PRINCIPALES

**3.1. Hero Section (Página de Inicio)**
*   Se descarta el carrusel tradicional.
*   Implementación de un visualizador WebGL/3D interactivo en el navegador como gancho principal.
*   Panel lateral o inferior con métricas crudas ("Horas de instrucción técnica", "Estudiantes").

**3.2. Catálogo Técnico**
*   **Layout:** Cuadrícula (Grid) exclusiva para mantener rendimiento. Imágenes estáticas de alta resolución (renders técnicos) por tarjeta.
*   **Panel de Filtros (Estado Sólido):** Botones tipo "toggle" (sin menús desplegables) de respuesta en milisegundos.
*   **Nomenclatura:** Uso de códigos de inventario (Ej. `SWK-101`, `KIC-302`).
*   **Ficha del Catálogo (Tarjeta):** Muestra de datos duros en monoespaciado (Duración, Nivel, Prerrequisitos). Botón de acción: `[INSPECCIONAR_CURSO]`.

**3.3. Ficha Técnica del Curso (Detalle)**
*   **Lienzo de Inspección (Hero):** Modelo 3D interactivo a pantalla dividida/completa correspondiente al entregable final del curso.
*   **Panel de Telemetría (Briefing):** Trailer en contenedor estricto, tabla de metadatos (Código, Duración, Requisitos, Software) y botón de acción principal (`[ACCEDER_AL_CURSO]`).
*   **Árbol de Dependencias:** Lista de recursos filtrados y relacionados específicamente a ese curso (Archivos CAD, guías PDF).
*   **Índice Técnico (Syllabus):** Acordeón de respuesta instantánea con duración exacta por lección.

---

## 4. STACK TECNOLÓGICO Y MOTOR

*   **Core / Framework:** `Next.js` (App Router) + `TypeScript`.
*   **Estilos:** `Tailwind CSS` (Configurado estrictamente con los tokens de diseño).
*   **Motor 3D:** `React Three Fiber` / `Three.js` (Aislado para rendimiento, montado exclusivamente en páginas de detalle o Hero de inicio).
*   **Gestor de Estado (Frontend):** `Zustand` (Para el filtrado del catálogo de cursos sin recarga de página).
*   **Backend / Base de Datos:** `Supabase` (PostgreSQL + API).

---

## 5. MODELO DE DATOS (ESQUEMA RELACIONAL SUPABASE)

Estructura de la base de datos para soportar la taxonomía y el cruce de dependencias:

*   **Tabla `Courses`**
    *   `id` (UUID, Primary Key)
    *   `course_code` (String, Ej. SWK-101)
    *   `title` (String)
    *   `slug` (String)
    *   `duration_hours` (Numeric)
    *   `difficulty_level` (String: Fundamentos, Intermedio, Avanzado)
    *   `trailer_url` (String)
    *   `model_3d_url` (String: Ruta al archivo .glb/.gltf)
    *   `udemy_link` (String)
    *   `status` (String: Disponible, En Desarrollo)

*   **Tabla `Tags`**
    *   `id` (UUID, Primary Key)
    *   `name` (String, Ej. Impresión 3D, Superficies)
    *   `category` (String: Mecánica_CAD, Electrónica_EDA, Arquitectura_BIM)

*   **Tabla `Resources`**
    *   `id` (UUID, Primary Key)
    *   `title` (String)
    *   `resource_type` (String: PDF, STL, Link, Video)
    *   `url_or_path` (String)

*   **Tablas Intermedias (Relaciones Muchos a Muchos)**
    *   `Course_Tags`: (`course_id`, `tag_id`)
    *   `Course_Resources`: (`course_id`, `resource_id`)
