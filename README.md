# Arquitectura · Facultad de Arquitectura · UNAL Medellín

Sitio web oficial interactivo para estudiantes y aspirantes del programa de **Arquitectura** (Título otorgado: *Arquitecto(a)*) de la Facultad de Arquitectura, Universidad Nacional de Colombia - Sede Medellín.

El proyecto implementa la identidad visual oficial con la nueva paleta arquitectónica:
- **Amarillo claro:** `#F1ECD6`
- **Naranja:** `#F09A23`
- **Rojo:** `#E1432A`
- **Celeste vívido:** `#015E97`
- **Azul oscuro:** `#132A49`

La malla curricular oficial completa de **190 créditos** reglamentada por el **Acuerdo CF-0001 de 2024** del Consejo de Facultad de Arquitectura, rutas curriculares de profundización, representación estudiantil de carrera y de facultad, semilleros y grupos de investigación, convenios, sistema intercampus, asistente virtual sofIA y guía de trámites ante la Secretaría de Facultad.

## Módulos y Páginas

| Página | Contenido |
| --- | --- |
| `index.html` | Información del programa (190 créditos, 10 semestres, SNIES 99, título Arquitecto(a), acreditación de alta calidad), perfil profesional del egresado, las 5 rutas curriculares, representación estudiantil y grupos/semilleros de investigación |
| `malla.html` | Malla curricular interactiva oficial de 190 créditos: trazado interactivo de prerrequisitos, semáforo de colores por componente (Fundamentación, Disciplinar, Optativas y Libre Elección), desglose por semestre y catálogo completo de asignaturas con filtros por agrupación y paginación |
| `avance.html` | Mi Avance en la carrera: panel gamificado de progreso, bitácora de materias y proyección de graduación a partir de la historia académica del SIA |
| `intercampus.html` | Rutas intercampus (Robledo ➔ El Volador, El Volador ➔ Robledo, Río ➔ El Volador), cálculo de próxima salida en tiempo real, guía explicativa y láminas oficiales |
| `convenios.html` | Convenios institucionales UNAL (Coursera, MATLAB, Microsoft 365) y beneficios estudiantiles (Autodesk AutoCAD/Revit para arquitectura, GitHub Student Developer Pack, JetBrains, Spotify): lista interactiva y guías de activación |
| `info.html` | Guía estudiantil oficial y simulador SIA: cálculo y permanencia de P.A.P.A. (mínimo 3.00), bolsa de 190 créditos + 95 adicionales (285 totales), horas de corresponsabilidad (16-40h), nuevo modelo DNINFOA de 4 grupos de citaciones, trámites y solicitudes ante la Secretaría de la Facultad de Arquitectura y preguntas frecuentes |

## Arquitectura de Datos

Los datos viven en `data/` estructurados en formato JSON, desacoplados de la capa de presentación:

```
data/
  programa.json          Ficha del programa (190 créditos, SNIES 99, 5 rutas curriculares)
  perfil.json            Perfil profesional y ocupacional del Arquitecto(a)
  grupos.json            Representación Estudiantil y grupos/semilleros (Estudios Espaciales, Geo-Clima, CHAGRA, etc.)
  intercampus.json       Rutas, franjas horarias y conexiones de movilidad universitaria
  convenios/
    indice.json          Catálogo resumido de convenios y licencias de software
    <id>.json            Guía paso a paso de activación por plataforma
  info.json              Guía del estudiante, P.A.P.A., bolsa SIA, corresponsabilidad, citas y trámites de Arquitectura
  malla/
    componentes.json     Componentes de formación oficial y agrupaciones (créditos exigidos)
    plan.json            Plan de estudios semestralizado (Semestres I al X, 190 créditos)
    asignaturas.json     Catálogo maestro de asignaturas con créditos, códigos, agrupaciones y prerrequisitos
```

**Fuente de la malla curricular:** *Acuerdo CF-0001 de 2024 del Consejo de Facultad de Arquitectura*, Universidad Nacional de Colombia - Sede Medellín.

## Visualización en Servidor Local

Dado que la información se consulta de manera asíncrona mediante `fetch()`, se requiere ejecutar el sitio a través de un servidor HTTP local:

```bash
# Con Node.js
npx serve .

# O con Python
python -m http.server 8000
# Abrir en el navegador: http://localhost:8000
```
