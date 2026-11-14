const fs = require('fs');

const asignaturas = [
  // SEMESTRE 1
  {
    codigo: "3011119",
    nombre: "Proyectos 1",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006605",
    nombre: "Introducción Historia y Teoría",
    creditos: 4,
    obligatoria: true,
    agrupacion: "historia-teoria-fundamentacion",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 5,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3006600",
    nombre: "Urbanística 1",
    creditos: 2,
    obligatoria: true,
    agrupacion: "urbanistica-fundamentacion",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Ciudad y Territorio"
  },
  {
    codigo: "3007211",
    nombre: "Tecnología del Proyecto 1",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-fundamentacion",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 5,
    linea: "Tecnología"
  },
  {
    codigo: "3006615",
    nombre: "Representación 1",
    creditos: 4,
    obligatoria: true,
    agrupacion: "representacion-fundamentacion",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 6,
    horasExternas: 6,
    linea: "Representación"
  },
  {
    codigo: "IDIOMA-1",
    nombre: "Idioma I (Inglés)",
    creditos: 3,
    obligatoria: true,
    agrupacion: "idiomas",
    semestre: 1,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 3,
    linea: "Idioma"
  },

  // SEMESTRE 2
  {
    codigo: "3011120",
    nombre: "Proyectos 2",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 2,
    prerrequisitos: ["3011119"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006601",
    nombre: "Historia y Teoría 1",
    creditos: 2,
    obligatoria: true,
    agrupacion: "historia-teoria-fundamentacion",
    semestre: 2,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 2,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3006627",
    nombre: "Urbanística 2",
    creditos: 2,
    obligatoria: true,
    agrupacion: "urbanistica-disciplinar",
    semestre: 2,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Ciudad y Territorio"
  },
  {
    codigo: "3006622",
    nombre: "Tecnología del Proyecto 2",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-fundamentacion",
    semestre: 2,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 5,
    linea: "Tecnología"
  },
  {
    codigo: "3006616",
    nombre: "Representación 2",
    creditos: 4,
    obligatoria: true,
    agrupacion: "representacion-fundamentacion",
    semestre: 2,
    prerrequisitos: [],
    horasPresenciales: 6,
    horasExternas: 3,
    linea: "Representación"
  },
  {
    codigo: "IDIOMA-2",
    nombre: "Idioma II (Inglés)",
    creditos: 3,
    obligatoria: true,
    agrupacion: "idiomas",
    semestre: 2,
    prerrequisitos: ["IDIOMA-1"],
    horasPresenciales: 2,
    horasExternas: 3,
    linea: "Idioma"
  },

  // SEMESTRE 3
  {
    codigo: "3011121",
    nombre: "Proyectos 3",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 3,
    prerrequisitos: ["3011120"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006602",
    nombre: "Historia y Teoría 2",
    creditos: 2,
    obligatoria: true,
    agrupacion: "historia-teoria-disciplinar",
    semestre: 3,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 2,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3006793",
    nombre: "Urbanística 3",
    creditos: 2,
    obligatoria: true,
    agrupacion: "urbanistica-disciplinar",
    semestre: 3,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Ciudad y Territorio"
  },
  {
    codigo: "3006623",
    nombre: "Tecnología del Proyecto 3",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-disciplinar",
    semestre: 3,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 5,
    linea: "Tecnología"
  },
  {
    codigo: "3006617",
    nombre: "Representación 3",
    creditos: 4,
    obligatoria: true,
    agrupacion: "representacion-disciplinar",
    semestre: 3,
    prerrequisitos: [],
    horasPresenciales: 6,
    horasExternas: 6,
    linea: "Representación"
  },
  {
    codigo: "IDIOMA-3",
    nombre: "Idioma III (Inglés)",
    creditos: 3,
    obligatoria: true,
    agrupacion: "idiomas",
    semestre: 3,
    prerrequisitos: ["IDIOMA-2"],
    horasPresenciales: 2,
    horasExternas: 3,
    linea: "Idioma"
  },

  // SEMESTRE 4
  {
    codigo: "3011122",
    nombre: "Proyectos 4",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 4,
    prerrequisitos: ["3011121"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006603",
    nombre: "Historia y Teoría 3",
    creditos: 2,
    obligatoria: true,
    agrupacion: "historia-teoria-disciplinar",
    semestre: 4,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 2,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3006628",
    nombre: "Urbanística 4",
    creditos: 2,
    obligatoria: true,
    agrupacion: "urbanistica-disciplinar",
    semestre: 4,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Ciudad y Territorio"
  },
  {
    codigo: "3006624",
    nombre: "Tecnología del Proyecto 4",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-disciplinar",
    semestre: 4,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 5,
    linea: "Tecnología"
  },
  {
    codigo: "3006618",
    nombre: "Representación 4",
    creditos: 2,
    obligatoria: true,
    agrupacion: "representacion-disciplinar",
    semestre: 4,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Representación"
  },
  {
    codigo: "IDIOMA-4",
    nombre: "Idioma IV (Inglés)",
    creditos: 3,
    obligatoria: true,
    agrupacion: "idiomas",
    semestre: 4,
    prerrequisitos: ["IDIOMA-3"],
    horasPresenciales: 2,
    horasExternas: 3,
    linea: "Idioma"
  },

  // SEMESTRE 5
  {
    codigo: "3011123",
    nombre: "Proyectos 5",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 5,
    prerrequisitos: ["3011122"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006604",
    nombre: "Historia y Teoría 4",
    creditos: 2,
    obligatoria: true,
    agrupacion: "historia-teoria-disciplinar",
    semestre: 5,
    prerrequisitos: [],
    horasPresenciales: 4,
    horasExternas: 2,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3006629",
    nombre: "Urbanística 5",
    creditos: 2,
    obligatoria: true,
    agrupacion: "urbanistica-disciplinar",
    semestre: 5,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Ciudad y Territorio"
  },
  {
    codigo: "3006625",
    nombre: "Tecnología del Proyecto 5",
    creditos: 3,
    obligatoria: true,
    agrupacion: "tecnologia-disciplinar",
    semestre: 5,
    prerrequisitos: [],
    horasPresenciales: 6,
    horasExternas: 3,
    linea: "Tecnología"
  },
  {
    codigo: "3006619",
    nombre: "Representación 5",
    creditos: 2,
    obligatoria: true,
    agrupacion: "representacion-disciplinar",
    semestre: 5,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Representación"
  },

  // SEMESTRE 6
  {
    codigo: "3011124",
    nombre: "Proyectos 6",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 6,
    prerrequisitos: ["3011123"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },
  {
    codigo: "3006792",
    nombre: "Seminario de Investigación",
    creditos: 2,
    obligatoria: true,
    agrupacion: "historia-teoria-disciplinar",
    semestre: 6,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Historia y Teoría"
  },
  {
    codigo: "3007372",
    nombre: "Tecnología del Proyecto 6",
    creditos: 4,
    obligatoria: true,
    agrupacion: "tecnologia-disciplinar",
    semestre: 6,
    prerrequisitos: [],
    horasPresenciales: 6,
    horasExternas: 6,
    linea: "Tecnología"
  },
  {
    codigo: "3006620",
    nombre: "Representación 6",
    creditos: 2,
    obligatoria: true,
    agrupacion: "representacion-disciplinar",
    semestre: 6,
    prerrequisitos: [],
    horasPresenciales: 2,
    horasExternas: 4,
    linea: "Representación"
  },

  // SEMESTRE 7
  {
    codigo: "3011125",
    nombre: "Proyectos 7",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 7,
    prerrequisitos: ["3011124"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },

  // SEMESTRE 8
  {
    codigo: "3011126",
    nombre: "Proyectos 8",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 8,
    prerrequisitos: ["3011125"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },

  // SEMESTRE 9
  {
    codigo: "3011127",
    nombre: "Proyectos 9",
    creditos: 6,
    obligatoria: true,
    agrupacion: "proyectos",
    semestre: 9,
    prerrequisitos: ["3011126"],
    horasPresenciales: 8,
    horasExternas: 10,
    linea: "Proyectos"
  },

  // SEMESTRE 10
  {
    codigo: "3006794",
    nombre: "Trabajo de Grado",
    creditos: 6,
    obligatoria: true,
    agrupacion: "trabajo-de-grado",
    semestre: 10,
    prerrequisitos: ["3011127"],
    horasPresenciales: 2,
    horasExternas: 16,
    linea: "Trabajo de Grado"
  },

  // OPTATIVAS DISCIPLINARES (RUTAS DE ÉNFASIS)
  {
    codigo: "3007828",
    nombre: "Énfasis 1 en Historia y Teoría",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006792"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3007832",
    nombre: "Énfasis 2 en Historia y Teoría",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3007836",
    nombre: "Énfasis 3 en Historia y Teoría",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: [],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3007840",
    nombre: "Énfasis 4 en Historia y Teoría",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: ["3007836"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3007829",
    nombre: "Énfasis 1 en Representación del Proyecto: gestión informática del modelo constructivo",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006619"],
    linea: "Representación"
  },
  {
    codigo: "3007833",
    nombre: "Énfasis 2 en Representación del Proyecto: modelamiento urbano con SIG",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Representación"
  },
  {
    codigo: "3007837",
    nombre: "Énfasis 3 en Representación del Proyecto: gestión informática del modelo constructivo",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: [],
    linea: "Representación"
  },
  {
    codigo: "3007841",
    nombre: "Énfasis 4 en Representación del Proyecto: modelamiento urbano con SIG",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: ["3007833"],
    linea: "Representación"
  },
  {
    codigo: "3007831",
    nombre: "Énfasis 1 en Proyectación Urbanística",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006628"],
    linea: "Urbanística"
  },
  {
    codigo: "3007835",
    nombre: "Énfasis 2 en Proyectación Urbanística",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Urbanística"
  },
  {
    codigo: "3007839",
    nombre: "Énfasis 3 en Proyectación Urbanística",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: [],
    linea: "Urbanística"
  },
  {
    codigo: "3007843",
    nombre: "Énfasis 4 en Proyectación Urbanística",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: ["3007839"],
    linea: "Urbanística"
  },
  {
    codigo: "3006667",
    nombre: "Espacio Escenográfico 1",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: [],
    linea: "Artes y Espacio"
  },
  {
    codigo: "3006666",
    nombre: "Espacio Escenográfico 2",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Artes y Espacio"
  },
  {
    codigo: "3007535",
    nombre: "Laboratorio de Procesos Escultóricos I",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006792"],
    linea: "Artes y Espacio"
  },
  {
    codigo: "3007536",
    nombre: "Laboratorio de Procesos Escultóricos II",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Artes y Espacio"
  },
  {
    codigo: "3007116",
    nombre: "Énfasis II: Paisaje y Espacios Verdes Urbanos",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Paisaje y Territorio"
  },
  {
    codigo: "3008523",
    nombre: "Énfasis III: Planeación Municipal",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: ["3006792"],
    linea: "Urbanística"
  },
  {
    codigo: "3008524",
    nombre: "Énfasis IV: Planeación Urbana",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: [],
    linea: "Urbanística"
  },
  {
    codigo: "3007263",
    nombre: "Patrimonio, Memoria y Cultura",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006792"],
    linea: "Patrimonio"
  },
  {
    codigo: "3007568",
    nombre: "Investigar, Intervenir, Gestionar el Patrimonio",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Patrimonio"
  },
  {
    codigo: "3008774",
    nombre: "Énfasis 1. Arquitectura Bioclimática",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006792"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008778",
    nombre: "Énfasis 2. Arquitectura Bioclimática",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3008774"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008780",
    nombre: "Énfasis. Arquitectura Bioclimática - Instrumentación Ambiental 1",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3008774"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008782",
    nombre: "Énfasis. Arquitectura Bioclimática - Instrumentación Ambiental 2",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3008778"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008786",
    nombre: "Énfasis 3. Arquitectura Bioclimática",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: ["3008778"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008787",
    nombre: "Énfasis 4. Arquitectura Bioclimática",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: ["3008778"],
    linea: "Bioclimática"
  },
  {
    codigo: "3008776",
    nombre: "Énfasis 1. El Proyecto en la Arquitectura Moderna",
    creditos: 5,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006792"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3008832",
    nombre: "Énfasis 2. El Proyecto en la Arquitectura Moderna",
    creditos: 5,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3008776"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3008833",
    nombre: "Énfasis 3. El Proyecto en la Arquitectura Moderna",
    creditos: 5,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: ["3008832"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3008834",
    nombre: "Énfasis 4. El Proyecto en la Arquitectura Moderna",
    creditos: 5,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: ["3008833"],
    linea: "Historia y Teoría"
  },
  {
    codigo: "3008775",
    nombre: "Énfasis 1. Arquitectura de la Vivienda",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: [],
    linea: "Vivienda y Hábitat"
  },
  {
    codigo: "3008829",
    nombre: "Énfasis 2. Arquitectura de la Vivienda",
    creditos: 6,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3008775"],
    linea: "Vivienda y Hábitat"
  },
  {
    codigo: "3008830",
    nombre: "Énfasis 3. Arquitectura de la Vivienda",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: ["3008829"],
    linea: "Vivienda y Hábitat"
  },
  {
    codigo: "3008831",
    nombre: "Énfasis 4. Arquitectura de la Vivienda",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: [],
    linea: "Vivienda y Hábitat"
  },
  {
    codigo: "3010319",
    nombre: "Construcción I",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3007372"],
    linea: "Construcción"
  },
  {
    codigo: "3010283",
    nombre: "Construcción II",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Construcción"
  },
  {
    codigo: "3006719",
    nombre: "Construcción III",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 9,
    prerrequisitos: [],
    linea: "Construcción"
  },
  {
    codigo: "3006720",
    nombre: "Construcción IV",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 10,
    prerrequisitos: [],
    linea: "Construcción"
  },
  {
    codigo: "3010220",
    nombre: "Patología I",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3007372"],
    linea: "Tecnología"
  },
  {
    codigo: "3006787",
    nombre: "Patología II",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3010220"],
    linea: "Tecnología"
  },
  {
    codigo: "3006732",
    nombre: "Costos y Presupuestos I",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: [],
    linea: "Gestión"
  },
  {
    codigo: "3009042",
    nombre: "Costos y Presupuestos II",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: [],
    linea: "Gestión"
  },
  {
    codigo: "3006762",
    nombre: "Programación de Obras I",
    creditos: 2,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3007372"],
    linea: "Gestión"
  },
  {
    codigo: "3009054",
    nombre: "Programación de Obras II",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3006762"],
    linea: "Gestión"
  },
  {
    codigo: "3011371",
    nombre: "Énfasis Uno Arquitectura Digital",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3006618", "3011124"],
    linea: "Arquitectura Digital"
  },
  {
    codigo: "3011370",
    nombre: "Énfasis Dos Arquitectura Digital",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 8,
    prerrequisitos: ["3011371"],
    linea: "Arquitectura Digital"
  },
  {
    codigo: "3011369",
    nombre: "Énfasis 1 Desarrollo e Innovación en la Arquitectura",
    creditos: 4,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3011124"],
    linea: "Innovación"
  },
  {
    codigo: "3011471",
    nombre: "Énfasis 1: Del Proyecto a la Obra",
    creditos: 3,
    obligatoria: false,
    agrupacion: "optativas-disciplinares",
    semestre: 7,
    prerrequisitos: ["3011124", "3006792"],
    linea: "Tecnología y Obra"
  }
];

// Generar data/malla/asignaturas.json
fs.writeFileSync('data/malla/asignaturas.json', JSON.stringify(asignaturas, null, 2), 'utf8');
console.log('Asignaturas guardadas: ' + asignaturas.length);

// Generar data/malla/plan.json
const plan = [
  {
    semestre: 1,
    creditos: 22,
    items: [
      { tipo: "asignatura", codigo: "3011119" },
      { tipo: "asignatura", codigo: "3006605" },
      { tipo: "asignatura", codigo: "3006600" },
      { tipo: "asignatura", codigo: "3007211" },
      { tipo: "asignatura", codigo: "3006615" },
      { tipo: "asignatura", codigo: "IDIOMA-1" }
    ]
  },
  {
    semestre: 2,
    creditos: 20,
    items: [
      { tipo: "asignatura", codigo: "3011120" },
      { tipo: "asignatura", codigo: "3006601" },
      { tipo: "asignatura", codigo: "3006627" },
      { tipo: "asignatura", codigo: "3006622" },
      { tipo: "asignatura", codigo: "3006616" },
      { tipo: "asignatura", codigo: "IDIOMA-2" }
    ]
  },
  {
    semestre: 3,
    creditos: 20,
    items: [
      { tipo: "asignatura", codigo: "3011121" },
      { tipo: "asignatura", codigo: "3006602" },
      { tipo: "asignatura", codigo: "3006793" },
      { tipo: "asignatura", codigo: "3006623" },
      { tipo: "asignatura", codigo: "3006617" },
      { tipo: "asignatura", codigo: "IDIOMA-3" }
    ]
  },
  {
    semestre: 4,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3011122" },
      { tipo: "asignatura", codigo: "3006603" },
      { tipo: "asignatura", codigo: "3006628" },
      { tipo: "asignatura", codigo: "3006624" },
      { tipo: "asignatura", codigo: "3006618" },
      { tipo: "asignatura", codigo: "IDIOMA-4" }
    ]
  },
  {
    semestre: 5,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3011123" },
      { tipo: "asignatura", codigo: "3006604" },
      { tipo: "asignatura", codigo: "3006629" },
      { tipo: "asignatura", codigo: "3006625" },
      { tipo: "asignatura", codigo: "3006619" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 1" }
    ]
  },
  {
    semestre: 6,
    creditos: 17,
    items: [
      { tipo: "asignatura", codigo: "3011124" },
      { tipo: "asignatura", codigo: "3006792" },
      { tipo: "asignatura", codigo: "3007372" },
      { tipo: "asignatura", codigo: "3006620" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 2" }
    ]
  },
  {
    semestre: 7,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3011125" },
      { tipo: "bolsa", agrupacion: "optativas-disciplinares", creditos: 6, nombre: "Optativa 1" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 3" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 4" }
    ]
  },
  {
    semestre: 8,
    creditos: 18,
    items: [
      { tipo: "asignatura", codigo: "3011126" },
      { tipo: "bolsa", agrupacion: "optativas-disciplinares", creditos: 6, nombre: "Optativa 2" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 5" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 6" }
    ]
  },
  {
    semestre: 9,
    creditos: 19,
    items: [
      { tipo: "asignatura", codigo: "3011127" },
      { tipo: "bolsa", agrupacion: "optativas-disciplinares", creditos: 4, nombre: "Optativa 3" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 7" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 8" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 9" }
    ]
  },
  {
    semestre: 10,
    creditos: 20,
    items: [
      { tipo: "asignatura", codigo: "3006794" },
      { tipo: "bolsa", agrupacion: "optativas-disciplinares", creditos: 4, nombre: "Optativa 4" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 10" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 3, nombre: "Libre Elección 11" },
      { tipo: "bolsa", agrupacion: "libre-eleccion-materias", creditos: 4, nombre: "Libre Elección 12" }
    ]
  }
];

fs.writeFileSync('data/malla/plan.json', JSON.stringify(plan, null, 2), 'utf8');
console.log('Plan guardado: 10 semestres, total creditos calculado');
