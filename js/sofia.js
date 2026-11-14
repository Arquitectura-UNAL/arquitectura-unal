/* ==============================================================================
   PORTAL WEB OFICIAL · PREGRADO EN ARQUITECTURA · UNAL SEDE MEDELLÍN
   Arquitectura de software, maquetación y desarrollo integral por:
   Santiago Escobar Arias · Representante Estudiantil de Sistemas e Informática
   Adaptado e impulsado con la Representación Estudiantil de Arquitectura:
   Juan Manuel Zapata Usma (Principal) – Samuel Trejos Betancurt (Suplente) · Representantes de Arquitectura
   Facultad de Arquitectura — Universidad Nacional de Colombia, Sede Medellín
   Contacto Repres: (+57) 302 326 8027 / (+57) 312 743 0226 | Canal WhatsApp: https://whatsapp.com/channel/0029VbBtoCFBvvscToG1Yn0u
   Todos los derechos reservados © 2026.
   ============================================================================== */

/* ---------- sofIA: Asistente Virtual Inteligente de Arquitectura UNAL ----------
   Avatar: Versión holográfica inspirada en la inteligencia de Cortana (IA institucional UNAL).
   Consultas integradas:
   - Malla curricular interactiva y explicación de los 10 semestres
   - Tipologías y componentes de materias (Fundamentación, Disciplinar, Libre Elección)
   - Prerrequisitos de las asignaturas del plan de Arquitectura (Acuerdo CF-0001 de 2024)
   - Por qué estudiar Arquitectura y fortalezas únicas (Talleres Proyectuales Bloque 24, CEHAP Bloque 26)
   - Cómo hacer cambio de carrera / traslado de programa curricular ante la Facultad de Arquitectura
   - Alianzas estratégicas para el bienestar (ICETEX, Sapiencia, Tarjeta Cívica Metro, Fundaciones)
   - Grupos de WhatsApp y solicitud de la Carpeta Oficial de Recursos de Arquitectura
   - Semilleros de investigación (Estudios Espaciales, Geo-Clima, CHAGRA, Formación en Arquitectura)
   - Calendario académico oficial (fechas de adición, cancelación, reporte de notas y fin de clases)
   - Trámites y solicitudes de la Secretaría de la Facultad de Arquitectura
   - Convenios de software (Autodesk Revit/AutoCAD, Microsoft 365, MATLAB, Coursera, Kiro AWS)
   - P.A.P.A., Citas SIA (4 Grupos DNINFOA), Bolsa de créditos y Horas de corresponsabilidad.
   Tono: Amiga de la juventud, empática, clara, rigurosa y sin rodeos. */

(function moduloSofia() {
  'use strict';

  if (typeof document === 'undefined') return;
  const esPaginaDescanso = document.body?.dataset?.pagina === 'descanso' || (window.location?.pathname || '').endsWith('descanso.html');
  if (esPaginaDescanso) return;

  /* ==========================================================================
     1. CONSTANTES Y ENLACES OFICIALES
     ========================================================================== */

  const ENLACES_OFICIALES = {
    driveRecursos: 'https://drive.google.com/drive/folders/1VGnbVtYyd9x-ul9btdpgqwR2juEgQ9sO?usp=sharing',
    canalWhatsapp: 'https://whatsapp.com/channel/0029VbBtoCFBvvscToG1Yn0u',
    gruposWhatsapp: 'https://chat.whatsapp.com/LPBgvaI49rU6ep6v5ycufZ',
    webPrograma: 'https://arquitectura.medellin.unal.edu.co/pregrado-de-arquitectura',
    sia: 'https://sia.unal.edu.co/',
    tramitesArquitectura: 'https://arquitectura.medellin.unal.edu.co/secretaria-de-facultad/tramites-estudiantiles',
    bienestarUnal: 'https://bienestaruniversitario.medellin.unal.edu.co/secciones/gestion-y-fomento',
    // Representantes de Carrera (Arquitectura)
    reprePrincipalNombre: 'Juan Manuel Zapata Usma',
    reprePrincipalWpp: 'https://wa.me/573023268027',
    reprePrincipalTel: '(+57) 302 326 8027',
    reprePrincipalCorreo: 'jzapataus@unal.edu.co',
    reprePrincipalIg: 'https://www.instagram.com/aguacate._sideral/',
    repreSuplenteNombre: 'Samuel Trejos Betancurt',
    repreSuplenteWpp: 'https://wa.me/573127430226',
    repreSuplenteTel: '(+57) 312 743 0226',
    repreSuplenteCorreo: 'strejos@unal.edu.co',
    repreSuplenteIg: 'https://www.instagram.com/sambetancurt/',
    // Representantes de Facultad de Arquitectura
    repreFacultadPrincipal: 'Angélica Díaz López',
    repreFacultadPrincipalWpp: 'https://wa.me/573193867283',
    repreFacultadPrincipalIg: 'https://www.instagram.com/dl_ang/',
    repreFacultadSuplente: 'Juan Pablo Marín Calderón',
    repreFacultadSuplenteWpp: 'https://wa.me/573045680511',
    repreFacultadSuplenteIg: 'https://www.instagram.com/troublep1/',
    // Dependencias
    correoSecretariaFacultad: 'secfacarq_med@unal.edu.co',
    correoAreaCurricular: 'areacurrarq_med@unal.edu.co',
    correoEscuelaArquitectura: 'escuelaarq_med@unal.edu.co',
    escuelaHabitat: 'https://arquitectura.medellin.unal.edu.co/escuelas/escuelas',
    // Aliases para compatibilidad
    telefonoRepre: '(+57) 302 326 8027',
    wppRepre: 'https://wa.me/573023268027',
    igConstruccion: 'https://www.instagram.com/aguacate._sideral/'
  };

  /* ==========================================================================
     2. ESTADO Y CACHÉ LOCAL
     ========================================================================== */

  const estadoSofia = {
    cargado: false,
    cargando: false,
    abierto: false,
    mensajes: [],
    datos: {
      asignaturas: [],
      plan: [],
      componentes: null,
      info: null,
      convenios: [],
      grupos: [],
      intercampus: null,
      programa: null,
      perfil: null,
      fortalezas: null,
    },
    indices: {
      materiasPorCodigo: new Map(),
      materiasPorNombre: new Map(),
      aliasMaterias: new Map(),
      fechasCalendario: [],
      conveniosPorId: new Map(),
      gruposPorNombre: new Map(),
    },
  };

  /* ==========================================================================
     3. UTILIDADES DE TEXTO Y NORMALIZACIÓN ROBUSTA
     ========================================================================== */

  function normalizar(texto) {
    if (!texto) return '';
    return texto
      .toString()
      .toLowerCase()
      .replace(/p\.a\.p\.a\.?/gi, 'papa')
      .replace(/p\.a\.p\.p\.i\.?/gi, 'pappi')
      .replace(/i\.p\.a\.?/gi, 'ipa')
      .replace(/p\s+a\s+p\s+a\b/gi, 'papa')
      .replace(/p\s+a\s+p\s+p\s+i\b/gi, 'pappi')
      .replace(/i\s+p\s+a\b/gi, 'ipa')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const PALABRAS_VACIAS = new Set([
    'de', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'e', 'o', 'u',
    'en', 'a', 'para', 'por', 'con', 'sin', 'sobre', 'que', 'como', 'cual', 'cuales',
    'donde', 'cuando', 'quien', 'quienes', 'es', 'son', 'me', 'mi', 'te', 'se', 'su',
    'sus', 'al', 'del', 'dime', 'saber', 'quiero', 'favor', 'cuentame', 'explica'
  ]);

  function extraerTerminos(texto) {
    return normalizar(texto)
      .split(' ')
      .filter((palabra) => palabra.length > 1 && !PALABRAS_VACIAS.has(palabra));
  }

  function distanciaLevenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;

    const matriz = [];
    for (let i = 0; i <= b.length; i++) matriz[i] = [i];
    for (let j = 0; j <= a.length; j++) matriz[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matriz[i][j] = matriz[i - 1][j - 1];
        } else {
          matriz[i][j] = Math.min(
            matriz[i - 1][j - 1] + 1,
            matriz[i][j - 1] + 1,
            matriz[i - 1][j] + 1
          );
        }
      }
    }
    return matriz[b.length][a.length];
  }

  function similitudCadenas(a, b) {
    const na = normalizar(a);
    const nb = normalizar(b);
    if (na === nb) return 1;
    if (na.includes(nb) || nb.includes(na)) return 0.85;

    const maxLen = Math.max(na.length, nb.length);
    if (maxLen === 0) return 1;
    const dist = distanciaLevenshtein(na, nb);
    return Math.max(0, 1 - dist / maxLen);
  }

  /* ==========================================================================
     4. CARGA E INDEXACIÓN
     ========================================================================== */

  async function cargarJsonLocal(ruta) {
    if (typeof window.cargarDatos === 'function') {
      try {
        return await window.cargarDatos(ruta);
      } catch (_) {}
    }
    const respuesta = await fetch(`data/${ruta}.json`);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    return await respuesta.json();
  }

  async function inicializarBaseConocimiento() {
    if (estadoSofia.cargado || estadoSofia.cargando) return;
    estadoSofia.cargando = true;

    try {
      const [asignaturas, plan, componentes, info, conveniosIndice, grupos, intercampus, perfil, programa, fortalezas] =
        await Promise.allSettled([
          cargarJsonLocal('malla/asignaturas'),
          cargarJsonLocal('malla/plan'),
          cargarJsonLocal('malla/componentes'),
          cargarJsonLocal('info'),
          cargarJsonLocal('convenios/indice'),
          cargarJsonLocal('grupos'),
          cargarJsonLocal('intercampus'),
          cargarJsonLocal('perfil'),
          cargarJsonLocal('programa'),
          cargarJsonLocal('fortalezas'),
        ]);

      if (asignaturas.status === 'fulfilled') estadoSofia.datos.asignaturas = asignaturas.value || [];
      if (plan.status === 'fulfilled') estadoSofia.datos.plan = plan.value || [];
      if (componentes.status === 'fulfilled') estadoSofia.datos.componentes = componentes.value || null;
      if (info.status === 'fulfilled') estadoSofia.datos.info = info.value || null;
      if (conveniosIndice.status === 'fulfilled') estadoSofia.datos.convenios = conveniosIndice.value?.convenios || [];
      if (grupos.status === 'fulfilled') estadoSofia.datos.grupos = grupos.value || [];
      if (intercampus.status === 'fulfilled') estadoSofia.datos.intercampus = intercampus.value || null;
      if (perfil.status === 'fulfilled') estadoSofia.datos.perfil = perfil.value || null;
      if (programa.status === 'fulfilled') estadoSofia.datos.programa = programa.value || null;
      if (fortalezas.status === 'fulfilled') estadoSofia.datos.fortalezas = fortalezas.value || null;

      indexarConocimiento();
      estadoSofia.cargado = true;
    } catch (error) {
      console.warn('sofIA: no se pudo cargar la base local', error);
    } finally {
      estadoSofia.cargando = false;
    }
  }

  function indexarConocimiento() {
    const { indices, datos } = estadoSofia;

    datos.asignaturas.forEach((asig) => {
      indices.materiasPorCodigo.set(asig.codigo, asig);
      const normNombre = normalizar(asig.nombre);
      indices.materiasPorNombre.set(normNombre, asig);
    });

    const ALIAS_MATERIAS = [
      [['proyectos 1', 'proyecto 1', 'taller 1', 'taller de proyectos 1'], 'Proyectos 1'],
      [['proyectos 2', 'proyecto 2', 'taller 2', 'taller de proyectos 2'], 'Proyectos 2'],
      [['proyectos 3', 'proyecto 3', 'taller 3', 'taller de proyectos 3'], 'Proyectos 3'],
      [['proyectos 4', 'proyecto 4', 'taller 4', 'taller de proyectos 4'], 'Proyectos 4'],
      [['proyectos 5', 'proyecto 5', 'taller 5', 'taller de proyectos 5'], 'Proyectos 5'],
      [['proyectos 6', 'proyecto 6', 'taller 6', 'taller de proyectos 6'], 'Proyectos 6'],
      [['proyectos 7', 'proyecto 7', 'taller 7', 'taller de proyectos 7'], 'Proyectos 7'],
      [['proyectos 8', 'proyecto 8', 'taller 8', 'taller de proyectos 8'], 'Proyectos 8'],
      [['proyectos 9', 'proyecto 9', 'taller 9', 'taller de proyectos 9'], 'Proyectos 9'],
      [['introduccion historia y teoria', 'intro historia', 'historia intro'], 'Introducción Historia y Teoría'],
      [['historia y teoria 1', 'historia 1'], 'Historia y Teoría 1'],
      [['historia y teoria 2', 'historia 2'], 'Historia y Teoría 2'],
      [['historia y teoria 3', 'historia 3'], 'Historia y Teoría 3'],
      [['historia y teoria 4', 'historia 4'], 'Historia y Teoría 4'],
      [['seminario de investigacion', 'seminario'], 'Seminario de Investigación'],
      [['urbanistica 1', 'urbanistica i'], 'Urbanística 1'],
      [['urbanistica 2', 'urbanistica ii'], 'Urbanística 2'],
      [['urbanistica 3', 'urbanistica iii'], 'Urbanística 3'],
      [['urbanistica 4', 'urbanistica iv'], 'Urbanística 4'],
      [['urbanistica 5', 'urbanistica v'], 'Urbanística 5'],
      [['tecnologia del proyecto 1', 'tecnologia 1'], 'Tecnología del Proyecto 1'],
      [['tecnologia del proyecto 2', 'tecnologia 2'], 'Tecnología del Proyecto 2'],
      [['tecnologia del proyecto 3', 'tecnologia 3'], 'Tecnología del Proyecto 3'],
      [['tecnologia del proyecto 4', 'tecnologia 4'], 'Tecnología del Proyecto 4'],
      [['tecnologia del proyecto 5', 'tecnologia 5'], 'Tecnología del Proyecto 5'],
      [['tecnologia del proyecto 6', 'tecnologia 6'], 'Tecnología del Proyecto 6'],
      [['representacion 1', 'dibujo 1'], 'Representación 1'],
      [['representacion 2', 'dibujo 2'], 'Representación 2'],
      [['representacion 3', 'dibujo 3'], 'Representación 3'],
      [['representacion 4', 'dibujo 4'], 'Representación 4'],
      [['representacion 5', 'dibujo 5'], 'Representación 5'],
      [['representacion 6', 'dibujo 6'], 'Representación 6'],
      [['trabajo de grado', 'tesis', 'grado', 'pasantia'], 'Trabajo de Grado'],
      [['idioma 1', 'ingles 1', 'idioma i'], 'Idioma I (Inglés)'],
      [['idioma 2', 'ingles 2', 'idioma ii'], 'Idioma II (Inglés)'],
      [['idioma 3', 'ingles 3', 'idioma iii'], 'Idioma III (Inglés)'],
      [['idioma 4', 'ingles 4', 'idioma iv'], 'Idioma IV (Inglés)'],
      [['enfasis 1 arquitectura bioclimatica', 'bioclimatica 1', 'arquitectura bioclimatica 1'], 'Énfasis 1. Arquitectura Bioclimática'],
      [['enfasis 2 arquitectura bioclimatica', 'bioclimatica 2'], 'Énfasis 2. Arquitectura Bioclimática'],
      [['enfasis 3 arquitectura bioclimatica', 'bioclimatica 3'], 'Énfasis 3. Arquitectura Bioclimática'],
      [['enfasis 4 arquitectura bioclimatica', 'bioclimatica 4'], 'Énfasis 4. Arquitectura Bioclimática'],
      [['enfasis uno arquitectura digital', 'arquitectura digital 1', 'arquitectura digital'], 'Énfasis Uno Arquitectura Digital'],
      [['enfasis dos arquitectura digital', 'arquitectura digital 2'], 'Énfasis Dos Arquitectura Digital'],
      [['enfasis 1 del proyecto a la obra', 'del proyecto a la obra'], 'Énfasis 1: Del Proyecto a la Obra'],
      [['enfasis 1 desarrollo e innovacion en la arquitectura', 'innovacion en la arquitectura'], 'Énfasis 1 Desarrollo e Innovación en la Arquitectura'],
      [['enfasis 1 proyectacion urbanistica', 'proyectacion urbanistica 1', 'proyectacion urbanistica'], 'Énfasis 1 en Proyectación Urbanística'],
      [['enfasis 2 proyectacion urbanistica', 'proyectacion urbanistica 2'], 'Énfasis 2 en Proyectación Urbanística'],
      [['enfasis 3 proyectacion urbanistica', 'proyectacion urbanistica 3'], 'Énfasis 3 en Proyectación Urbanística'],
      [['enfasis 4 proyectacion urbanistica', 'proyectacion urbanistica 4'], 'Énfasis 4 en Proyectación Urbanística'],
      [['enfasis 1 arquitectura de la vivienda', 'vivienda 1', 'arquitectura de la vivienda'], 'Énfasis 1. Arquitectura de la Vivienda'],
      [['enfasis 2 arquitectura de la vivienda', 'vivienda 2'], 'Énfasis 2. Arquitectura de la Vivienda'],
      [['enfasis 3 arquitectura de la vivienda', 'vivienda 3'], 'Énfasis 3. Arquitectura de la Vivienda'],
      [['enfasis 4 arquitectura de la vivienda', 'vivienda 4'], 'Énfasis 4. Arquitectura de la Vivienda'],
      [['enfasis 1 el proyecto en la arquitectura moderna', 'arquitectura moderna 1'], 'Énfasis 1. El Proyecto en la Arquitectura Moderna'],
      [['enfasis 2 el proyecto en la arquitectura moderna', 'arquitectura moderna 2'], 'Énfasis 2. El Proyecto en la Arquitectura Moderna'],
      [['enfasis 3 el proyecto en la arquitectura moderna', 'arquitectura moderna 3'], 'Énfasis 3. El Proyecto en la Arquitectura Moderna'],
      [['enfasis 4 el proyecto en la arquitectura moderna', 'arquitectura moderna 4'], 'Énfasis 4. El Proyecto en la Arquitectura Moderna'],
      [['enfasis 1 en historia y teoria', 'historia y teoria enfasis 1'], 'Énfasis 1 en Historia y Teoría'],
      [['patrimonio memoria y cultura', 'patrimonio'], 'Patrimonio, Memoria y Cultura'],
      [['paisaje y espacios verdes urbanos', 'paisaje'], 'Énfasis II: Paisaje y Espacios Verdes Urbanos'],
      [['planeacion municipal'], 'Énfasis III: Planeación Municipal'],
      [['planeacion urbana'], 'Énfasis IV: Planeación Urbana'],
      [['construccion 1', 'construccion i'], 'Construcción I'],
      [['construccion 2', 'construccion ii'], 'Construcción II'],
      [['patologia 1', 'patologia i'], 'Patología I'],
      [['patologia 2', 'patologia ii'], 'Patología II'],
      [['costos y presupuestos 1', 'costos 1', 'presupuestos 1'], 'Costos y Presupuestos I'],
      [['costos y presupuestos 2', 'costos 2', 'presupuestos 2'], 'Costos y Presupuestos II'],
      [['programacion de obras 1', 'programacion 1'], 'Programación de Obras I'],
      [['programacion de obras 2', 'programacion 2'], 'Programación de Obras II'],
    ];

    ALIAS_MATERIAS.forEach(([aliases, nombreReal]) => {
      const match = datos.asignaturas.find((a) => normalizar(a.nombre) === normalizar(nombreReal));
      if (match) {
        aliases.forEach((alias) => indices.aliasMaterias.set(normalizar(alias), match));
      }
    });

    // Indexar todas las filas del calendario académico oficial
    if (datos.info?.guias) {
      const guiaCal = datos.info.guias.find((g) => g.id === 'calendario-academico');
      if (guiaCal?.calendario?.grupos) {
        guiaCal.calendario.grupos.forEach((grupo) => {
          if (Array.isArray(grupo.filas)) {
            grupo.filas.forEach((fila) => {
              indices.fechasCalendario.push({
                actividad: fila.actividad,
                actividadNorm: normalizar(fila.actividad),
                aplica: fila.aplica,
                inicio: fila.inicio,
                fin: fila.fin,
                nota: fila.nota || '',
              });
            });
          }
        });
      }
    }

    datos.convenios.forEach((c) => indices.conveniosPorId.set(normalizar(c.id || c.nombre), c));
    datos.grupos.forEach((g) => indices.gruposPorNombre.set(normalizar(g.nombre), g));
  }

  /* ==========================================================================
     5. MOTOR DE INTENCIONES
     ========================================================================== */

  function buscarAsignaturaPorTexto(preguntaNorm) {
    const { indices, datos } = estadoSofia;

    for (const [alias, asig] of indices.aliasMaterias.entries()) {
      if (new RegExp(`\\b${alias}\\b`).test(preguntaNorm)) {
        return asig;
      }
    }

    for (const [codigo, asig] of indices.materiasPorCodigo.entries()) {
      const codLimpio = normalizar(codigo);
      if (preguntaNorm.includes(codLimpio) || codLimpio.includes(preguntaNorm)) {
        return asig;
      }
    }

    for (const asig of datos.asignaturas) {
      const nombreNorm = normalizar(asig.nombre);
      if (preguntaNorm.includes(nombreNorm)) {
        return asig;
      }
    }

    let mejorMateria = null;
    let mejorScore = 0;
    const terminosPregunta = extraerTerminos(preguntaNorm);

    datos.asignaturas.forEach((asig) => {
      const terminosMateria = extraerTerminos(asig.nombre);
      let matches = 0;
      terminosMateria.forEach((tm) => {
        if (terminosPregunta.some((tp) => tp === tm || similitudCadenas(tp, tm) > 0.82)) {
          matches++;
        }
      });
      const score = matches / Math.max(terminosMateria.length, 1);
      if (score > 0.55 && score > mejorScore) {
        mejorScore = score;
        mejorMateria = asig;
      }
    });

    return mejorMateria;
  }

  function responderPregunta(preguntaUsuario) {
    const preguntaNorm = normalizar(preguntaUsuario);
    const { indices, datos } = estadoSofia;

    // ------------------------------------------------------------------------
    // 1. Saludos y Presentación
    // ------------------------------------------------------------------------
    if (/^(hola|buenos dias|buenas tardes|buenas noches|hey|que tal|buenas|holi|hola sofia)\b/.test(preguntaNorm) && preguntaNorm.split(' ').length <= 4) {
      return {
        texto: `¡Hola! Qué gusto saludarte. Soy sofIA, tu compañera virtual del pregrado en **Arquitectura** de la Facultad de Arquitectura de la Universidad Nacional de Colombia (Sede Medellín).

Pregúntame con confianza lo que necesites sobre la malla curricular, materias, prerrequisitos, cómo hacer cambio de carrera, por qué estudiar Arquitectura, alianzas de bienestar, fechas del calendario o trámites ante la Secretaría de Facultad. ¿En qué te doy una mano hoy?`,
        chips: ['¿Qué es la malla curricular?', '¿Por qué estudiar Arquitectura?', '¿Cuáles son las alianzas?', 'Pedir la Unidad Compartida'],
      };
    }

    if (/quien eres|quien te creo|que eres|como te llamas|presentate/.test(preguntaNorm)) {
      return {
        texto: `Soy sofIA, tu asistente virtual estudiantil de **Arquitectura** de la UNAL Medellín (Facultad de Arquitectura).

Mi avatar es una versión holográfica inspirada en la inteligencia de Cortana, diseñada para darte respuestas precisas al instante. Articulada con el apoyo de la Representación Estudiantil de Arquitectura (Juan Manuel Zapata y Samuel Trejos) para ayudarte a consultar mallas, prerrequisitos, fechas, alianzas, cambio de carrera y normativas académicas sin rodeos.`,
        chips: ['Ver Malla Curricular', '¿Por qué estudiar Arquitectura?', 'Pedir la Unidad Compartida'],
      };
    }

    if (/gracias|muchas gracias|genial|excelente|bacano|super|te quiero|vale gracias/.test(preguntaNorm) && preguntaNorm.split(' ').length <= 4) {
      return {
        texto: `¡Con mucho gusto! Recuerda que aquí estoy siempre que tengas dudas durante el semestre. ¡Muchos éxitos en la obra académica!`,
        chips: ['Prerrequisitos de materias', 'Calendario académico', 'Pedir la Unidad Compartida'],
      };
    }

    // ------------------------------------------------------------------------
    // 2. ¿Qué es la Malla Curricular? / Malla en general
    // ------------------------------------------------------------------------
    if (/que es la malla|explicar la malla|explica la malla|malla curricular|ver malla curricular|ver en la malla interactiva|otras asignaturas/.test(preguntaNorm)) {
      return {
        texto: `La **Malla Curricular de Arquitectura** (Plan vigente Acuerdo CF-0001 de 2024) estructura los **10 semestres** y los **190 créditos** de la carrera:

- **Eje Proyectual Central:** 9 semestres continuos de Proyectos Arquitectónicos integrales (Proyectos 1 al 9, 6 créditos c/u = 54 créditos) que culminan en el Trabajo de Grado (6 créditos).
- **Estructura oficial por componentes:**
  1. **Componente de Fundamentación (22 créditos):** Representación del Proyecto (8 cr), Tecnología (6 cr), Historia y Teoría (6 cr) y Urbanística (2 cr).
  2. **Componente Disciplinar Profesional (119 créditos):** Proyectos (54 cr), Tecnología del Proyecto (13 cr), Historia, Teoría y Seminario de Investigación (8 cr), Urbanística y Territorio (8 cr), Representación (10 cr), Trabajo de Grado (6 cr) y Optativas Disciplinares / Rutas de Énfasis (20 cr).
  3. **Componente de Libre Elección e Idiomas (49 créditos):** 37 créditos de libre configuración para cursos electivos o posgrado + 12 créditos de idioma extranjero (Inglés I a IV).

👉 Puedes explorar la malla interactiva completa con prerrequisitos iluminados en colores en: [Ver Malla Curricular](malla.html).`,
        chips: ['¿Qué tipo de materias hay?', 'Prerrequisitos de Proyectos 2', 'Abrir Drive de Recursos'],
      };
    }

    // ------------------------------------------------------------------------
    // 3. ¿Qué tipo de materias hay? (Componentes y Tipologías)
    // ------------------------------------------------------------------------
    if (/que tipo de materias|tipos de materias|tipologia|componentes de la carrera|agrupaciones de materias|materias de arquitectura|materias de construccion/.test(preguntaNorm)) {
      return {
        texto: `En el plan curricular de **Arquitectura** (190 créditos totales) existen 3 componentes oficiales:

1. **Componente de Fundamentación (22 créditos):**
   - **Representación del Proyecto (8 cr):** Representación 1 (4 cr) y Representación 2 (4 cr).
   - **Tecnología (6 cr):** Tecnología del Proyecto 1 (3 cr) y Tecnología del Proyecto 2 (3 cr).
   - **Historia y Teoría (6 cr):** Introducción a la Historia y Teoría (4 cr) e Historia y Teoría 1 (2 cr).
   - **Urbanística (2 cr):** Urbanística 1 (2 cr).

2. **Componente Disciplinar Profesional (119 créditos):**
   - **Proyectos (54 cr):** Proyectos 1 al 9 (6 créditos cada uno).
   - **Tecnología del Proyecto (13 cr):** Tecnología 3, 4, 5 (3 cr c/u) y Tecnología 6 (4 cr).
   - **Historia, Teoría e Investigación (8 cr):** Historia 2, 3, 4 (2 cr c/u) y Seminario de Investigación (2 cr).
   - **Urbanística / Ciudad y Territorio (8 cr):** Urbanística 2, 3, 4 y 5 (2 cr cada una).
   - **Representación (10 cr):** Representación 3 (4 cr), Representación 4, 5 y 6 (2 cr c/u).
   - **Trabajo de Grado (6 cr):** Culminación proyectual en el 10° semestre.
   - **Optativas Disciplinares / Rutas de Énfasis (20 cr):** Arquitectura Bioclimática, Arquitectura Digital, Proyectación Urbanística, Vivienda, Patrimonio, Arquitectura Moderna, Obra y Escenografía.

3. **Componente de Libre Elección e Idiomas (49 créditos):**
   - **Libre Elección (37 créditos):** Para asignaturas electivas, dobles programas o materias de posgrado.
   - **Idioma Extranjero (12 créditos):** Inglés I, II, III y IV (3 créditos cada uno).`,
        chips: ['Ver Malla Curricular', 'Prerrequisitos de Proyectos 2', 'Abrir Drive de Recursos'],
      };
    }

    // ------------------------------------------------------------------------
    // 4. ¿Por qué estudiar Arquitectura? / Fortalezas únicas
    // ------------------------------------------------------------------------
    if (/por que estudiar arquitectura|porque estudiar arquitectura|por que estudiar construccion|ventajas de arquitectura|fortalezas|por que la nacional|por que unal|bloque 24|cehap|escuela del habitat|pedro nel gomez/.test(preguntaNorm)) {
      return {
        texto: `**¿Por qué estudiar Arquitectura en la UNAL Medellín?**

Nuestro pregrado es pionero y referente de la arquitectura en Colombia:

1. **Tradición y Vanguardia:** Fundada bajo el impulso del maestro Pedro Nel Gómez, cuna de los más destacados arquitectos y urbanistas de la modernidad en Colombia.
2. **Talleres de Proyectos Continuos (Bloque 24):** 9 niveles proyectuales obligatorios con mesas de trabajo continuo, salas de crítica abierta y laboratorios de fabricación digital, modelado BIM y corte láser.
3. **Escuela del Hábitat (CEHAP) y Unidad de Documentación Única:** Centro de pensamiento interdisciplinario referente en Colombia y América Latina en vivienda digna, ordenamiento territorial y hábitat comunitario.
4. **Formación Integral e Interdisciplinaria:** Combina rigor técnico (estructuras, bioclimática, patología y costos) con sensibilidad artística, espacial y paisajística.
5. **Título de Arquitecto(a):** Máxima acreditación de alta calidad otorgada por la Universidad Nacional de Colombia.`,
        chips: ['¿Qué es la malla curricular?', 'Semilleros de investigación', 'Contacto de Representantes'],
      };
    }

    // ------------------------------------------------------------------------
    // 5. ¿Cómo hacer cambio de carrera / Traslado de programa?
    // ------------------------------------------------------------------------
    if (/cambio de carrera|cambiarme de carrera|traslado|traslado de carrera|traslado de programa|como me paso a construccion|pasar a arquitectura|cambiarme a arquitectura|pasar a arquitectura|cambiarme a arquitectura/.test(preguntaNorm)) {
      return {
        texto: `**¿Cómo solicitar Traslado de Programa Curricular (Cambio de carrera)?**

El trámite formal se gestiona ante el Consejo de la **Facultad de Arquitectura** conforme al Estatuto Estudiantil:

**Requisitos indispensables:**
1. **Permanencia activa:** Haber cursado y aprobado al menos un periodo académico completo en la UNAL.
2. **P.A.P.A. competitivo:** Contar con un promedio acumulado sólido (generalmente mayor a 3.5 para tener alta opción en la selección por cupos).
3. **Cupos disponibles:** Que el programa curricular al que aspiras oferte cupos de traslado para ese semestre.
4. **Fechas oficiales:** Radicar dentro de la convocatoria semestral fijada en el calendario académico.

**Paso a paso para radicar:**
- Ingresa al [Portal Oficial de Trámites de la Facultad de Arquitectura](${ENLACES_OFICIALES.tramitesArquitectura}).
- Diligencia el formulario de solicitud de traslado adjuntando tu carta de motivación y tu historia académica del SIA.
- Si requieres orientación previa o revisar tu caso, asesórate con los Representantes Estudiantiles de Arquitectura: Juan Manuel Zapata ([${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp})) o Samuel Trejos ([${ENLACES_OFICIALES.repreSuplenteTel}](${ENLACES_OFICIALES.repreSuplenteWpp})) o escribe a la Secretaría de Facultad (\`${ENLACES_OFICIALES.correoSecretariaFacultad}\`).`,
        chips: ['Portal Trámites Arquitectura', 'Contacto del Representante', 'Calendario académico'],
      };
    }

    // ------------------------------------------------------------------------
    // 6. Alianzas Estratégicas para el Bienestar
    // ------------------------------------------------------------------------
    if (/alianza|alianzas|alianzas estrategicas|icetex|sapiencia|presupuesto participativo|tarjeta civica|civica metro|fondo epm|becas medellin/.test(preguntaNorm)) {
      return {
        texto: `**Alianzas Estratégicas para el Bienestar (UNAL Sede Medellín):**

Bienestar Universitario articula acuerdos con entidades públicas y privadas para apoyar tu permanencia y sostenimiento:

1. **Fondo Sapiencia (Alcaldía de Medellín):**
   - Becas y créditos condonables (Presupuesto Participativo, Fondo EPM y Becas Medellín) con condonación por promedio o servicio social.
2. **Metro de Medellín (Tarjeta Cívica Perfil Estudiante):**
   - Tarifa preferencial para estudiantes y convocatorias de viajes subsidiados en el sistema integrado (SITVA).
3. **ICETEX:**
   - Líneas de financiación reembolsables y créditos de sostenimiento (Línea Tú Eliges).
4. **Fundaciones y Donaciones Privadas para el Hábitat:**
   - Auxilios semestrales de manutención y matrícula gestionados por la Sección de Gestión y Fomento Socioeconómico.

💡 **¿Dónde recibir orientación?**
Acude presencialmente al **Bloque 11A** (Edificio de Bienestar, Campus El Volador) o escribe al correo institucional \`agestionfse_med@unal.edu.co\`.`,
        chips: ['Auxilios de Bienestar', 'Convenios de software', 'Ver sección Convenios'],
      };
    }

    // ------------------------------------------------------------------------
    // 7. Unidad Compartida / Google Drive de Recursos
    // ------------------------------------------------------------------------
    const esReporteONotas = /reporte|calificaciones|notas parciales|30\s*%|60\s*%|100\s*%/.test(preguntaNorm);
    if (!esReporteONotas && (/drive|unidad compartida|carpeta|recursos|material de estudio|materiales|planchas|planos|detalles|talleres|apuntes|banco de recursos/.test(preguntaNorm) || preguntaNorm === 'parciales')) {
      return {
        texto: `El material de estudio, planchas, planos, detalles arquitectónicos, guías de historia, bioclimática, talleres proyectuales y recursos académicos de **Arquitectura** están disponibles en nuestra carpeta oficial de Google Drive:

👉 **[Abrir Carpeta de Recursos de Arquitectura en Google Drive](` + ENLACES_OFICIALES.driveRecursos + `)**

Además, puedes unirte a nuestro **[Canal Oficial de WhatsApp de Arquitectura](` + ENLACES_OFICIALES.canalWhatsapp + `)** y al grupo de **[Grupos y Capítulos Estudiantiles](` + ENLACES_OFICIALES.gruposWhatsapp + `)** para estar enterado de eventos, asesorías y compartir material con la comunidad.`,
        chips: ['Ver Malla Curricular', 'Contacto de Representantes', 'Canal Oficial WhatsApp'],
      };
    }

    // ------------------------------------------------------------------------
        // ------------------------------------------------------------------------
    // 8. Contacto del Representante Estudiantil (Arquitectura y Facultad)
    // ------------------------------------------------------------------------
    if (/contacto del representante|contacto del repre|representante estudiantil|hablar con el repre|contacto repre|quien es el representante|\brepre\b|\brepresentantes\b/.test(preguntaNorm)) {
      return {
        texto: `**Representación Estudiantil de Arquitectura y de Facultad (UNAL Medellín):**

🏛️ **Representación de Carrera (Arquitectura):**
- **Juan Manuel Zapata Usma (Principal):**
  • WhatsApp: [${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp})
  • Instagram: [@aguacate._sideral](${ENLACES_OFICIALES.reprePrincipalIg})
  • Correo: ${ENLACES_OFICIALES.reprePrincipalCorreo}
- **Samuel Trejos Betancurt (Suplente):**
  • WhatsApp: [${ENLACES_OFICIALES.repreSuplenteTel}](${ENLACES_OFICIALES.repreSuplenteWpp})
  • Instagram: [@sambetancurt](${ENLACES_OFICIALES.repreSuplenteIg})
  • Correo: ${ENLACES_OFICIALES.repreSuplenteCorreo}
- **Canal Oficial de WhatsApp:** [Unirse al Canal de Arquitectura](${ENLACES_OFICIALES.canalWhatsapp})
- **Grupos y Capítulos:** [Unirse al Grupo de WhatsApp](${ENLACES_OFICIALES.gruposWhatsapp})

🏢 **Representación de Facultad de Arquitectura:**
- **Angélica Díaz López (Principal):** WhatsApp [${ENLACES_OFICIALES.repreFacultadPrincipalWpp}](${ENLACES_OFICIALES.repreFacultadPrincipalWpp}) · Instagram [@dl_ang](${ENLACES_OFICIALES.repreFacultadPrincipalIg}) · Correo: andiazlo@unal.edu.co
- **Juan Pablo Marín Calderón (Suplente):** WhatsApp [${ENLACES_OFICIALES.repreFacultadSuplenteWpp}](${ENLACES_OFICIALES.repreFacultadSuplenteWpp}) · Instagram [@troublep1](${ENLACES_OFICIALES.repreFacultadSuplenteIg}) · Correo: juamarinca@unal.edu.co

Cuentas con nuestro total acompañamiento ante el Comité Asesor, Secretaría de Facultad (Bloque 24) y Consejo de Facultad.`,
        chips: ['Abrir Drive de Recursos', 'Canal Oficial WhatsApp', 'Portal Trámites Arquitectura'],
      };
    }

    // 9. Grupos de WhatsApp de estudio
    // ------------------------------------------------------------------------
    const esConsultaWpp = /whatsapp|wpp|chat|chats|grupo de estudio|comunidad de estudio/.test(preguntaNorm);
    const esConsultaSemillero = /semillero|semilleros|sigcon|grinco|sicc|construccion y ciencia/.test(preguntaNorm);

    if (esConsultaWpp && !esConsultaSemillero) {
      const materiaWpp = buscarAsignaturaPorTexto(preguntaNorm);

      if (materiaWpp) {
        if (materiaWpp.whatsapp) {
          return {
            texto: `Aquí tienes el grupo de estudio de WhatsApp para **${materiaWpp.nombre}** (\`${materiaWpp.codigo}\`):

👉 [Entrar al grupo de WhatsApp de ${materiaWpp.nombre}](${materiaWpp.whatsapp})`,
            chips: [`Prerrequisitos de ${materiaWpp.nombre}`, 'Ver Malla Curricular', 'Pedir la Unidad Compartida'],
          };
        } else {
          return {
            texto: `Actualmente **${materiaWpp.nombre}** (\`${materiaWpp.codigo}\`) no tiene un enlace de WhatsApp registrado en la web.

Únete al canal y grupos de WhatsApp oficiales de la carrera:
- Canal de Arquitectura: [` + ENLACES_OFICIALES.canalWhatsapp + `](` + ENLACES_OFICIALES.canalWhatsapp + `)
- Grupos y Capítulos: [` + ENLACES_OFICIALES.gruposWhatsapp + `](` + ENLACES_OFICIALES.gruposWhatsapp + `)`,
            chips: [`Prerrequisitos de ${materiaWpp.nombre}`, 'Ver Malla Curricular', 'Pedir la Unidad Compartida'],
          };
        }
      }

      return {
        texto: `Los grupos de WhatsApp de estudio se van articulando cada semestre por iniciativa estudiantil.

Si necesitas armar grupo de estudio o conseguir el enlace de una materia o taller proyectual específico, puedes escribirle a los representantes estudiantiles:
👉 [Escribir a Juan Manuel (Principal): ${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp})
👉 [Escribir a Samuel (Suplente): ${ENLACES_OFICIALES.repreSuplenteTel}](${ENLACES_OFICIALES.repreSuplenteWpp})

También puedes consultar en la [Malla Curricular](malla.html) las asignaturas del semestre.`,
        chips: ['Contacto del Representante', 'Ver Malla Curricular', 'Pedir la Unidad Compartida'],
      };
    }

    // ------------------------------------------------------------------------
    // 10. Cancelación de materias o cancelación de semestre
    // ------------------------------------------------------------------------
    const esCancelacionSemestre = /cancelar semestre|cancelacion de semestre|cancelar el periodo|cancelacion de periodo|retirar semestre/.test(preguntaNorm);
    const esCancelacionMaterias = /cancelar materia|cancelar materias|cancelacion de asignatura|cancelacion de asignaturas|hasta cuando puedo cancelar|fechas? de cancelaci(on|ones)|cancelar una materia|como cancelo/.test(preguntaNorm) || (preguntaNorm.includes('cancelar') && !esCancelacionSemestre);

    if (esCancelacionSemestre || esCancelacionMaterias) {
      const fechas = indices.fechasCalendario;
      const cancelSin = fechas.find((f) => /sin descuento/.test(f.actividadNorm));
      const cancelCon = fechas.find((f) => /con descuento/.test(f.actividadNorm));
      const finClases = fechas.find((f) => /finalizacion de clases/.test(f.actividadNorm));

      let fechasTxt = '';
      if (esCancelacionSemestre) {
        fechasTxt = `**Cancelación de Periodo Académico (Semestre completo en Arquitectura):**
- Se solicita ante el Consejo de Facultad mediante el [Portal de Trámites de la Facultad de Arquitectura](${ENLACES_OFICIALES.tramitesArquitectura}).
- La fecha límite oficial del calendario (2026-2S) es el **${finClases?.fin || '17 de diciembre de 2026'}** (último día de clases).
- No requiere haber aprobado un porcentaje mínimo y te permite solicitar reserva o reingreso.`;
      } else {
        fechasTxt = `**Plazos para Cancelar Asignaturas en Pregrado (2026-2S):**
- **Semana 3 (sin pérdida de créditos):** Del ${cancelSin?.inicio || '27 de agosto'} al **${cancelSin?.fin || '10 de septiembre'}**. Los créditos vuelven completos a tu bolsa.
- **Semana 8 (con pérdida de créditos):** Del ${cancelCon?.inicio || '15 de septiembre'} al **${cancelCon?.fin || '22 de octubre'}**. No afecta tu P.A.P.A., pero los créditos se descuentan de tu bolsa disponible.
- **Cancelación extemporánea (después de semana 8):** Requiere causa justificada de fuerza mayor ante la Secretaría de Facultad de Arquitectura (\`${ENLACES_OFICIALES.correoSecretariaFacultad}\`).`;
      }

      return {
        texto: `${fechasTxt}

---

🧡 **Un mensaje importante de compañera a compañero:**
Si estás pensando en cancelar porque estás pasando por un momento personal difícil, problemas de salud o la carga de obra te está superando, **no estás solo ni tienes que resolverlo en silencio**. 

Juan Manuel Zapata y Samuel Trejos (Representantes Estudiantiles de Arquitectura) te pueden orientar de forma confidencial para evaluar alternativas antes de radicar. Escríbeles directo:
👉 [Escribirle a Juan Manuel: ${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp})
👉 [Escribirle a Samuel: ${ENLACES_OFICIALES.repreSuplenteTel}](${ENLACES_OFICIALES.repreSuplenteWpp})`,
        chips: ['Bolsa de créditos', 'Portal Trámites Arquitectura', 'Calendario académico'],
      };
    }

    // ------------------------------------------------------------------------
    // 11. Consultas del Calendario Académico (fechas específicas o generales)
    // ------------------------------------------------------------------------
    const esFinDeClases = /finalizan las clases|finalizacion de clases|terminan las clases|fin de clases|acaban las clases|termina el semestre|acaba el semestre|fin del semestre|ultimo dia de clases|hasta cuando hay clases|cuando terminan|cuando finalizan|fecha de finalizacion/.test(preguntaNorm);
    const esInicioDeClases = /inicio de clases|inician las clases|empiezan las clases|arranque de clases|comienzo de clases|primer dia de clases|cuando empiezan|cuando inician/.test(preguntaNorm);
    const esReporteNotas = /reporte.*notas|notas parciales|cierre de notas|calificaciones|30\s*%|60\s*%|100\s*%/.test(preguntaNorm);
    const esSemanaUniversitaria = /semana universitaria/.test(preguntaNorm);
    const esConsolidacion = /consolidaci(on|ones).*matr(i|i)cula/.test(preguntaNorm);
    const esGeneralCalendario = /calendario|calendario academico|fechas del calendario|fechas clave|\bfechas\b/.test(preguntaNorm);

    const resolverFilaCalendario = () => {
      for (const f of indices.fechasCalendario) {
        if (f.actividadNorm && (preguntaNorm.includes(f.actividadNorm) || (preguntaNorm.length >= 6 && f.actividadNorm.includes(preguntaNorm)))) {
          return f;
        }
      }
      const tramitesMap = [
        { regex: /cambio de tutor/, norm: 'cambio de tutor' },
        { regex: /cancelaci(on|onar).*50|posterior al 50/, norm: 'cancelacion de asignatura(s) posterior al 50 % de avance del periodo' },
        { regex: /cancelaci(on|onar).*periodo|cancelar semestre/, norm: 'cancelacion de periodo academico' },
        { regex: /carga (inferior|minima)|carga academica minima/, norm: 'carga inferior a la minima' },
        { regex: /devoluci(on|onar).*dinero/, norm: 'devolucion de dinero' },
        { regex: /doble titulaci(on|onar)/, norm: 'doble titulacion' },
        { regex: /no oportuna.*tdg|extemporanea.*tdg/, norm: 'autorizacion de inscripcion/adicion no oportuna de tdg o actividades academicas' },
        { regex: /no oportuna|extemporanea/, norm: 'autorizacion de inscripcion/adicion no oportuna de asignatura(s)' },
        { regex: /modificaci(on|onar).*tdg|modificaci(on|onar).*trabajo de grado/, norm: 'modificacion de trabajo de grado (tdg)' },
        { regex: /movilidad.*(sede|interna)|intercampus entre sedes/, norm: 'movilidad interna entre sedes' },
        { regex: /reconocimiento.*asignatura|homologaci(on|onar)/, norm: 'reconocimiento de asignatura(s)' },
        { regex: /reposici(on|onar)|apelaci(on|onar)/, norm: 'recurso de reposicion y/o apelacion' },
        { regex: /\breingreso\b/, norm: 'reingreso' },
        { regex: /reserva.*cupo/, norm: 'reserva de cupo adicional' },
        { regex: /retiro.*universidad|retiro definitivo/, norm: 'retiro de la universidad' },
        { regex: /trabajo de grado.*modalidad|inscripcion.*tdg/, norm: 'trabajo de grado (tdg), en cualquiera de sus modalidades' },
        { regex: /\btraslado\b/, norm: 'traslado' },
      ];
      for (const t of tramitesMap) {
        if (t.regex.test(preguntaNorm)) {
          const match = indices.fechasCalendario.find((f) => f.actividadNorm.includes(t.norm));
          if (match) return match;
        }
      }
      return null;
    };

    const filaCal = resolverFilaCalendario();

    if (esFinDeClases) {
      const filaFin = indices.fechasCalendario.find((f) => /finalizacion de clases/.test(f.actividadNorm));
      return {
        texto: `Las clases del periodo académico 2026-2S finalizan oficialmente el **${filaFin?.fin || '17 de diciembre de 2026'}**.

Posterior a esta fecha:
- El reporte del 100 % de calificaciones tiene como límite el **19 de diciembre de 2026**.`,
        chips: ['Reporte de notas parciales', 'Fechas de cancelación', 'Calendario académico'],
      };
    }

    if (esInicioDeClases) {
      const cancelSin = indices.fechasCalendario.find((f) => /sin descuento/.test(f.actividadNorm));
      return {
        texto: `Las clases del periodo académico 2026-2S iniciaron el **${cancelSin?.inicio || '27 de agosto de 2026'}**.

Puedes consultar los plazos restantes del semestre en la sección [Info y Guías](info.html#calendario).`,
        chips: ['Cuándo finalizan las clases', 'Fechas de cancelación', 'Reporte de notas parciales'],
      };
    }

    if (esReporteNotas) {
      const r30 = indices.fechasCalendario.find((f) => /30\s*%/.test(f.actividadNorm));
      const r60 = indices.fechasCalendario.find((f) => /60\s*%/.test(f.actividadNorm));
      const r100 = indices.fechasCalendario.find((f) => /100\s*%/.test(f.actividadNorm));

      return {
        texto: `**Fechas límite para el reporte de calificaciones (2026-2S):**

- **Reporte de notas parciales (30 %):** Límite **${r30?.fin || '1 de octubre de 2026'}**
- **Reporte de notas parciales (60 %):** Límite **${r60?.fin || '5 de noviembre de 2026'}**
- **Reporte final de notas (100 %):** Límite **${r100?.fin || '19 de diciembre de 2026'}**

Recuerda que antes del reporte del 60 % de notas tienes derecho a conocer oportunamente tus evaluaciones previas.`,
        chips: ['Cuándo finalizan las clases', 'Fechas de cancelación', 'Bolsa de créditos'],
      };
    }

    if (esSemanaUniversitaria) {
      return {
        texto: `La **Semana Universitaria** en la UNAL Sede Medellín es un espacio institucional de receso de actividades evaluativas con jornadas culturales, deportivas y académicas en los campus Volador, Robledo y Río.`,
        chips: ['Calendario académico', 'Ver sección Intercampus', 'Contacto del Representante'],
      };
    }

    if (esConsolidacion) {
      const filaCons = indices.fechasCalendario.find((f) => /consolidacion/.test(f.actividadNorm));
      return {
        texto: `La **Consolidación de matrícula** para el periodo 2026-2S tuvo como fecha límite el **${filaCons?.fin || '14 de septiembre de 2026'}**. A partir de este hito tu matrícula queda en firme y se consolidan tus asignaturas en el SIA.`,
        chips: ['Calendario académico', 'Bolsa de créditos', 'Portal Trámites Arquitectura'],
      };
    }

    if (filaCal) {
      const rangoTxt = filaCal.inicio ? `desde el **${filaCal.inicio}** hasta el **${filaCal.fin}**` : `límite el **${filaCal.fin}**`;
      const notaTxt = filaCal.nota ? `\n_Nota: ${filaCal.nota}_` : '';
      return {
        texto: `**${filaCal.actividad} (Periodo ${filaCal.aplica || '2026-2S'}):**
El plazo oficial según el calendario académico es ${rangoTxt}.${notaTxt}

Este trámite se gestiona ante la Secretaría de la Facultad de Arquitectura a través del [Portal de Trámites](${ENLACES_OFICIALES.tramitesArquitectura}).`,
        chips: ['Portal Trámites Arquitectura', 'Calendario académico', 'Contacto del Representante'],
      };
    }

    if (esGeneralCalendario) {
      const cancelSin = indices.fechasCalendario.find((f) => /sin descuento/.test(f.actividadNorm));
      const cancelCon = indices.fechasCalendario.find((f) => /con descuento/.test(f.actividadNorm));
      const r60 = indices.fechasCalendario.find((f) => /60\s*%/.test(f.actividadNorm));
      const finClases = indices.fechasCalendario.find((f) => /finalizacion de clases/.test(f.actividadNorm));
      const r100 = indices.fechasCalendario.find((f) => /100\s*%/.test(f.actividadNorm));

      return {
        texto: `**Calendario Académico Oficial de Pregrado (2026-2S):**

- **Adición y cancelación sin descuento de créditos:** ${cancelSin?.inicio || '27-ago'} al **${cancelSin?.fin || '10 de septiembre'}**
- **Cancelación con descuento de créditos:** ${cancelCon?.inicio || '15-sep'} al **${cancelCon?.fin || '22 de octubre'}**
- **Reporte de notas parciales (60 %):** Límite **${r60?.fin || '5 de noviembre'}**
- **Finalización oficial de clases:** **${finClases?.fin || '17 de diciembre'}**
- **Reporte final de notas (100 %):** Límite **${r100?.fin || '19 de diciembre'}**

Puedes ver el calendario interactivo completo en la sección [Info y Guías](info.html#calendario).`,
        chips: ['Fechas de cancelación', 'Cuándo finalizan las clases', 'Reporte de notas parciales'],
      };
    }

    // ------------------------------------------------------------------------
    // 12. Materias de último semestre / Décimo semestre en Construcción
    // ------------------------------------------------------------------------
    if (/ultimo semestre|ultimos semestres|decimo semestre|semestre 10|10 semestre|materias para graduarme|terminar la carrera/.test(preguntaNorm)) {
      return {
        texto: `En el **10° y último semestre** de Arquitectura cursarás:

1. **Trabajo de Grado (código 3006794 - 6 créditos):**
   Es la culminación proyectual de la carrera. Requiere haber aprobado **Proyectos 9** (código 3011127). Modalidades:
   - **Proyecto de Grado en Taller Proyectual:** Desarrollo integral y exhaustivo de un proyecto arquitectónico, urbano o territorial.
   - **Práctica Profesional o de Extensión:** Vinculación a estudios de diseño, entidades territoriales o consultorías de hábitat.
   - **Proyecto de Investigación:** Vinculado a semilleros como Estudios Espaciales, Geo-Clima o Escuela del Hábitat.
   - **Materias de Posgrado:** Cursar asignaturas de maestría en la Facultad de Arquitectura.

2. **Optativa 4 de Énfasis (4 créditos):**
   Completar los 20 créditos exigidos en tus rutas de profundización disciplinar (Bioclimática, Arquitectura Digital, Vivienda, etc.).

3. **Créditos de Libre Elección (10 créditos en el último semestre):**
   Completar los 37 créditos exigidos en tu bolsa de libre configuración.

4. **Requisitos Finales de Grado:**
   - Haber aprobado los **190 créditos** exigidos del plan (Acuerdo CF-0001 de 2024).
   - Acreditar los 12 créditos de idioma extranjero (Inglés I a IV o prueba de suficiencia B1/B2).

Consulta tu proyección estimada en la sección [Mi Avance](avance.html).`,
        chips: ['Prerrequisitos de Trabajo de Grado', 'Ir a Mi Avance', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 13. Prerrequisitos de materias específicas
    // ------------------------------------------------------------------------
    const esConsultaPrereq = /prerrequisit|prerequisit|requisito|que pide|que necesito para ver|para matricular|correquisit|abrir|correr/.test(preguntaNorm);
    const materiaEncontrada = buscarAsignaturaPorTexto(preguntaNorm);

    if (materiaEncontrada && (esConsultaPrereq || preguntaNorm.includes(normalizar(materiaEncontrada.nombre)))) {
      const preCodigos = materiaEncontrada.prerrequisitos || [];
      const correqCodigos = materiaEncontrada.correquisitos || [];

      let detallePrereq = '';
      if (preCodigos.length === 0) {
        detallePrereq = `No tiene prerrequisitos. La puedes matricular desde tu primer semestre (según tu cupo de créditos y cita del SIA).`;
      } else {
        const nombresPre = preCodigos.map((cod) => {
          const preMat = indices.materiasPorCodigo.get(cod);
          return preMat ? `• **${preMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detallePrereq = `**Prerrequisito(s) necesario(s):**\n${nombresPre}`;
      }

      let detalleCorreq = '';
      if (correqCodigos.length > 0) {
        const nombresCorreq = correqCodigos.map((cod) => {
          const cMat = indices.materiasPorCodigo.get(cod);
          return cMat ? `• **${cMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detalleCorreq = `\n\n**Correquisito(s) (simultáneos):**\n${nombresCorreq}`;
      }

      const semestreTxt = materiaEncontrada.semestre ? `Semestre sugerido: **${materiaEncontrada.semestre}°**` : 'Asignatura Optativa / Elegible';
      const obligatoriaTxt = materiaEncontrada.obligatoria ? 'Obligatoria' : 'Optativa';

      const chipsPre = preCodigos
        .map((cod) => indices.materiasPorCodigo.get(cod))
        .filter(Boolean)
        .map((m) => `Prerrequisitos de ${m.nombre}`);

      return {
        texto: `### ${materiaEncontrada.nombre} (\`${materiaEncontrada.codigo}\`)

${detallePrereq}${detalleCorreq}

- **Créditos:** ${materiaEncontrada.creditos}
- **Tipología:** ${obligatoriaTxt} (${materiaEncontrada.agrupacion || 'Plan de estudios'})
- **Nivel:** ${semestreTxt}

_Para solicitar material de estudio o parciales anteriores, usa el botón de la Unidad Compartida._`,
        chips: chipsPre.length > 0 ? chipsPre : ['Ver Malla Curricular', 'Pedir la Unidad Compartida'],
      };
    }

    // ------------------------------------------------------------------------
    // 14. Materias por semestre
    // ------------------------------------------------------------------------
    const matchSemestre = preguntaNorm.match(/semestre\s*([1-9]|10)|primer\s*semestre|segundo\s*semestre|tercer\s*semestre|cuarto\s*semestre|quinto\s*semestre|sexto\s*semestre|septimo\s*semestre|octavo\s*semestre|noveno\s*semestre|decimo\s*semestre/);
    if (matchSemestre && (preguntaNorm.includes('materia') || preguntaNorm.includes('asignatura') || preguntaNorm.includes('veo') || preguntaNorm.includes('curso') || preguntaNorm.includes('plan'))) {
      const mapaOrdinales = {
        'primer semestre': 1, 'segundo semestre': 2, 'tercer semestre': 3, 'cuarto semestre': 4,
        'quinto semestre': 5, 'sexto semestre': 6, 'septimo semestre': 7, 'octavo semestre': 8,
        'noveno semestre': 9, 'decimo semestre': 10
      };
      let numSemestre = matchSemestre[1] ? parseInt(matchSemestre[1], 10) : mapaOrdinales[matchSemestre[0]];

      if (numSemestre && numSemestre >= 1 && numSemestre <= 10) {
        const bloquePlan = datos.plan.find((p) => p.semestre === numSemestre);
        const materiasSemestre = datos.asignaturas.filter((a) => a.semestre === numSemestre);

        let listaTxt = '';
        if (bloquePlan?.items) {
          listaTxt = bloquePlan.items.map((item) => {
            if (item.tipo === 'asignatura') {
              const asig = indices.materiasPorCodigo.get(item.codigo);
              if (asig) {
                const preCount = asig.prerrequisitos?.length || 0;
                const preInfo = preCount > 0 ? ` _(pide ${preCount} prerreq.)_` : ' _(sin prerreq.)_';
                return `• **${asig.nombre}** (${asig.creditos} créditos)${preInfo}`;
              }
              return `• Asignatura código \`${item.codigo}\``;
            } else if (item.tipo === 'bolsa') {
              return `• **${item.nombre || 'Asignatura Optativa'}** (${item.creditos} créditos)`;
            }
            return '';
          }).filter(Boolean).join('\n');
        } else {
          listaTxt = materiasSemestre.map((m) => {
            const preCount = m.prerrequisitos?.length || 0;
            const preInfo = preCount > 0 ? ` _(pide ${preCount} prerreq.)_` : ' _(sin prerreq.)_';
            return `• **${m.nombre}** (${m.creditos} créditos)${preInfo}`;
          }).join('\n');
        }

        const creditosTotales = bloquePlan?.creditos || materiasSemestre.reduce((acc, m) => acc + (m.creditos || 0), 0);

        return {
          texto: `### Plan de estudios para Semestre ${numSemestre} (${creditosTotales} créditos sugeridos)

${listaTxt}

Puedes explorar sus prerrequisitos en la [Malla Curricular](malla.html).`,
          chips: materiasSemestre.slice(0, 4).map((m) => `Prerrequisitos de ${m.nombre}`),
        };
      }
    }

    // ------------------------------------------------------------------------
    // 15. Semilleros y Grupos de Investigación en Construcción
    // ------------------------------------------------------------------------
    if (esConsultaSemillero || /grupos estudiantiles|investigacion en arquitectura|semilleros|estudios espaciales|geo clima|chagra/.test(preguntaNorm)) {
      return {
        texto: `En el pregrado de **Arquitectura** contamos con semilleros y grupos de investigación muy destacados en la Facultad de Arquitectura:

1. **Grupos y Capítulos Estudiantiles de Arquitectura:**
   - Comunidad estudiantil, eventos, colectivos y talleres proyectuales.
   - [Unirse al Grupo de WhatsApp](` + ENLACES_OFICIALES.gruposWhatsapp + `)

2. **Estudios Espaciales (Escuela de Arquitectura):**
   - Morfología espacial, fenomenología, teoría del proyecto, arte y paisaje contemporáneo.

3. **Arquitectura: Geo-Clima y Vida Cotidiana:**
   - Diseño bioclimático adaptado a los valles andinos y trópico, confort térmico y vida cotidiana.

4. **Semillero CHAGRA (Escuela del Hábitat - CEHAP):**
   - Agroecología, producción social del hábitat, tecnologías comunitarias y educación ambiental.

5. **Formación en Arquitectura:**
   - Epistemología proyectual, pedagogía del taller de diseño y metodologías de enseñanza.

Conoce más detalles en la sección [Grupos y Semilleros](index.html#grupos).`,
        chips: ['Canal Oficial WhatsApp', 'Grupos y Capítulos WhatsApp', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 16. Auxilios de Bienestar Universitario
    // ------------------------------------------------------------------------
    if (/auxilio|auxilios|bienestar|apoyo alimentario|apoyo economico|bono de transporte|alojamiento|residencias|almuerzo|almuerzos|subsidio|comida|pbm/.test(preguntaNorm)) {
      return {
        texto: `El Área de Gestión y Fomento Socioeconómico de Bienestar Universitario ofrece varios apoyos para estudiantes de pregrado:

1. **Apoyo Alimentario:** Almuerzo diario en los restaurantes universitarios del Campus El Volador y Robledo.
2. **Apoyo Económico Estudiantil:** Subsidio monetario semestral para gastos de sostenimiento.
3. **Auxilio o Tarifa Estudiantil de Transporte:** Tarifa preferencial en la Tarjeta Cívica del Metro de Medellín.
4. **Alojamiento y Residencias:** Subsidio de vivienda para estudiantes de fuera del Área Metropolitana.

**Requisitos:**
- Estar matriculado en el semestre lectivo.
- Tener evaluado el Puntaje Básico de Matrícula (PBM).
- Postularte dentro de las fechas fijadas en la convocatoria oficial.
- Cumplir el compromiso de **Horas de Corresponsabilidad** (mínimo 16 horas semestrales).

👉 Convocatorias oficiales: [Bienestar UNAL Medellín](${ENLACES_OFICIALES.bienestarUnal})`,
        chips: ['Horas de corresponsabilidad', '¿Cuáles son las alianzas?', 'Calendario académico'],
      };
    }

    // ------------------------------------------------------------------------
    // 17. Convenios de Software y Tecnología
    // ------------------------------------------------------------------------
    const esConvenio = /convenio|convenios|beneficio|beneficios/.test(preguntaNorm);

    if (esConvenio || /autodesk|revit|autocad|civil 3d|bim|navisworks|office|microsoft|matlab|coursera|github|jetbrains|spotify/.test(preguntaNorm)) {
      if (preguntaNorm.includes('autodesk') || preguntaNorm.includes('revit') || preguntaNorm.includes('autocad') || preguntaNorm.includes('civil 3d') || preguntaNorm.includes('bim') || preguntaNorm.includes('navisworks')) {
        return {
          texto: `**Autodesk Education (Herramienta fundamental para Arquitectura):**
- **Beneficio:** Licencias educativas profesionales gratuitas de 1 año renovables para Revit, AutoCAD, Civil 3D, Navisworks Manage y 3ds Max.
- **¿Cómo activarlo?** Entra a [autodesk.com/education](https://www.autodesk.com/education/) y valida tu condición de estudiante con tu correo \`@unal.edu.co\` o carnet oficial.`,
          chips: ['Microsoft 365', 'Coursera UNAL', 'Ver todos los convenios'],
        };
      }

      if (preguntaNorm.includes('office') || preguntaNorm.includes('microsoft') || preguntaNorm.includes('excel') || preguntaNorm.includes('onedrive')) {
        return {
          texto: `**Microsoft 365 Educación:**
- **Beneficio:** Suite completa de Office (Excel, Word, PowerPoint, Teams) para descargar en hasta 5 dispositivos y **1 TB de almacenamiento** en la nube en OneDrive.
- **¿Cómo activarlo?** Inicia sesión en [portal.office.com](https://portal.office.com) con tu usuario y contraseña institucional de la UNAL.`,
          chips: ['Autodesk Education', 'Coursera UNAL', 'Ver todos los convenios'],
        };
      }

      if (preguntaNorm.includes('coursera')) {
        return {
          texto: `**Coursera for Campus UNAL:**
- **Beneficio:** Cursos y certificaciones profesionales gratis con universidades internacionales.
- **¿Cómo activarlo?** Inicia sesión en [coursera.org](https://www.coursera.org/) con "Iniciar sesión con la organización" usando tu correo \`@unal.edu.co\`.`,
          chips: ['Autodesk Education', 'Ver todos los convenios'],
        };
      }

      if (preguntaNorm.includes('matlab')) {
        return {
          texto: `**MATLAB y Simulink (Campus-Wide License):**
- **Beneficio:** Acceso ilimitado a toolboxes de cálculo numérico, modelamiento y cursos de MATLAB Academy con correo UNAL.`,
          chips: ['Autodesk Education', 'Ver todos los convenios'],
        };
      }

      return {
        texto: `En la sección de [Convenios](convenios.html) tenemos recopilados los principales beneficios a los que tienes derecho:

- **Modelado y Proyectos:** Autodesk Education (Revit, AutoCAD, Navisworks, Civil 3D).
- **Productividad:** Microsoft 365 con 1 TB de OneDrive y Excel para presupuestos.
- **Formación continua:** Coursera for Campus con certificaciones sin costo.
- **Herramientas de cálculo:** MATLAB y Simulink Campus-Wide.
- **Bienestar y alianzas:** Apoyos de sostenimiento, Sapiencia, ICETEX y Spotify al 50 %.`,
        chips: ['Autodesk Education', 'Microsoft 365', '¿Cuáles son las alianzas?', 'Auxilios de Bienestar'],
      };
    }

    // ------------------------------------------------------------------------
    // 18. P.A.P.A., Citas SIA y Bolsa de Créditos
    // ------------------------------------------------------------------------
    if (/citas|cita sia|prelacion|dninfoa|ipa|pappi/.test(preguntaNorm)) {
      return {
        texto: `**¿Cómo se asignan las Citas de Inscripción del SIA?**

La DNINFOA asigna las citas mediante los **4 Grupos de Prelación**:

1. **Grupo 1:** Estudiantes con reconocimientos y distinciones académicas.
2. **Grupo 2:** Estudiantes en permanencia regular ordenados por el **Índice IPA** (combina tu P.A.P.A. histórico con tu ritmo de avance de créditos).
3. **Grupo 3:** Estudiantes con bajo avance o periodos suspendidos.
4. **Grupo 4:** Casos especiales y reservas de cupo.

💡 Para consultar tu cita o inscribir materias, ingresa al [Portal SIA](${ENLACES_OFICIALES.sia}).`,
        chips: ['¿Qué es el P.A.P.A.?', 'Bolsa de créditos', 'Calendario académico'],
      };
    }

    if (/papa|promedio acumulado|permanencia/.test(preguntaNorm)) {
      return {
        texto: `El **P.A.P.A. (Promedio Académico Ponderado Acumulado)** es el promedio ponderado de todas las asignaturas cursadas en la universidad (aprobadas y reprobadas), ponderadas por el número de créditos.

- Rige tu permanencia (debes mantenerlo en 3.0 o más para no perder el cupo).
- Es clave para solicitudes de traslado, matrículas de honor, posgrados y doble titulación.
- Puedes calcularlo y simularlo en nuestra herramienta [Mi Avance](avance.html).`,
        chips: ['Ir a Mi Avance', 'Citas de inscripción SIA', 'Bolsa de créditos'],
      };
    }

    if (/bolsa|cupo de creditos|creditos disponibles/.test(preguntaNorm)) {
      return {
        texto: `**La Bolsa de Créditos en la UNAL:**

Al ingresar recibes un cupo de créditos para completar tu plan:
- Si apruebas una materia: se consumen sus créditos correspondientes.
- Si cancelas en **Semana 3** (sin pérdida): se te reintegran de inmediato a tu bolsa.
- Si cancelas en **Semana 8** o repruebas: se descuentan de tu bolsa disponible.
- Si se te acaban los créditos antes de graduarte, debes solicitar créditos adicionales ante el Consejo de la Facultad de Arquitectura en el [Portal de Trámites](${ENLACES_OFICIALES.tramitesArquitectura}).`,
        chips: ['Fechas de cancelación', 'Ir a Mi Avance', 'Portal Trámites Arquitectura'],
      };
    }

    // ------------------------------------------------------------------------
    // 19. Horas de corresponsabilidad
    // ------------------------------------------------------------------------
    if (/corresponsabilidad|horas de corresponsabilidad|horas bienestar/.test(preguntaNorm)) {
      return {
        texto: `Las **Horas de Corresponsabilidad** son un compromiso formativo solidario obligatorio para estudiantes beneficiarios de apoyos socioeconómicos de Bienestar (alimentario, económico, residencias):

- Son mínimo **16 horas semestrales**.
- Se pueden pagar apoyando en Bibliotecas (Bloque 24 de Arquitectura o Efe Gómez), salas de cómputo, laboratorios de materiales de construcción (Bloque 25) o eventos institucionales.
- Las plazas se publican al inicio del periodo en Bienestar Universitario (Bloque 11A).`,
        chips: ['Auxilios de Bienestar', 'Calendario académico'],
      };
    }

    // ------------------------------------------------------------------------
    // 20. Trámites ante la Secretaría de la Facultad de Arquitectura
    // ------------------------------------------------------------------------
    if (/tramite|tramites|solicitud|solicitudes|secretaria de facultad|consejo de facultad|reserva de cupo|reingreso|doble titulacion/.test(preguntaNorm)) {
      return {
        texto: `Las solicitudes académicas en Arquitectura se gestionan ante la **Secretaría de la Facultad de Arquitectura** (Bloque 24, Campus El Volador) y el Consejo de Facultad:

Para consultar formularios oficiales y normativas:
👉 [Portal de Trámites · Facultad de Arquitectura](${ENLACES_OFICIALES.tramitesArquitectura})
📧 Correo oficial: \`${ENLACES_OFICIALES.correoSecretariaFacultad}\`

Si tienes dudas sobre qué soporte presentar, Juan Manuel Zapata (Representante Estudiantil de Arquitectura) te puede guiar con toda confianza:
- WhatsApp: [${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp})`,
        chips: ['Portal Trámites Arquitectura', 'Calendario académico', 'Contacto del Representante'],
      };
    }

    // ------------------------------------------------------------------------
    // 21. Rutas de Bus Intercampus
    // ------------------------------------------------------------------------
    if (/\b(bus|buses|intercampus|transporte|horario bus|robledo|volador)\b|campus del rio|sede del rio|\bel rio\b/.test(preguntaNorm)) {
      return {
        texto: `**Transporte Intercampus UNAL Medellín (100 % Gratuito):**

1. **Ruta Robledo ⇄ Volador:**
   - Conecta la Facultad de Minas (Bloque M3) con el Campus El Volador (Bloque 41 / Portería Coca-Cola, muy cerca al Bloque 24 de Arquitectura).
   - Opera de lunes a viernes de 6:00 a. m. a 9:00 p. m.
2. **Ruta Río ⇄ Volador:** Conecta la Sede del Río con Campus El Volador.
3. **Conexiones Metro:** Paradas en estaciones Floresta y Suramericana.

💡 Para abordar solo debes mostrar tu **carnet estudiantil físico o digital**. Consulta horarios en [Intercampus](intercampus.html).`,
        chips: ['Ver sección Intercampus', 'Calendario académico'],
      };
    }

    // ------------------------------------------------------------------------
    // 22. Tour del sitio
    // ------------------------------------------------------------------------
    if (/donde esta|donde veo|donde encuentro|como funciona la pagina|como funciona la web|tour|secciones|ir a mi avance/.test(preguntaNorm)) {
      return {
        texto: `Te enseño qué encuentras en cada rincón del portal de Arquitectura:

- **[Inicio](index.html):** Información general del programa, Escuela de Arquitectura, fortalezas únicas (Talleres Proyectuales Bloque 24, CEHAP) y semilleros de investigación.
- **[Malla Curricular](malla.html):** Malla interactiva de 10 semestres con semáforo de prerrequisitos, detalle de asignaturas y botón para solicitar la Unidad Compartida.
- **[Mi Avance](avance.html):** Carga tu historia académica del SIA. Te calcula tu P.A.P.A. real, créditos pendientes por componente y genera tu carnet digital oficial.
- **[Info y Guías](info.html):** Calendario oficial, citas SIA, bolsa de créditos, alianzas de bienestar y trámites de la Facultad de Arquitectura.
- **[Convenios](convenios.html):** Guías para activar Autodesk (Revit/AutoCAD), Microsoft 365, MATLAB, Coursera y apoyos de Bienestar.
- **[Intercampus](intercampus.html):** Rutas y horarios de buses universitarios gratuitos.`,
        chips: ['Ver Malla Curricular', 'Ir a Mi Avance', '¿Por qué estudiar Arquitectura?', '¿Cuáles son las alianzas?'],
      };
    }

    // ------------------------------------------------------------------------
    // 23. Búsqueda en FAQs
    // ------------------------------------------------------------------------
    const terminosBusqueda = extraerTerminos(preguntaNorm);
    if (terminosBusqueda.length > 0 && datos.info?.faq) {
      let mejorFaq = null;
      let mejorPuntajeFaq = 0;

      datos.info.faq.forEach((f) => {
        const pregNorm = normalizar(f.pregunta);
        const respNorm = normalizar(f.respuesta);
        let matches = 0;

        terminosBusqueda.forEach((t) => {
          if (pregNorm.includes(t)) matches += 2.5;
          else if (respNorm.includes(t)) matches += 1;
          else {
            const sim = similitudCadenas(t, pregNorm);
            if (sim > 0.8) matches += 1.5;
          }
        });

        if (matches > mejorPuntajeFaq) {
          mejorPuntajeFaq = matches;
          mejorFaq = f;
        }
      });

      if (mejorFaq && mejorPuntajeFaq >= 2.5) {
        return {
          texto: `**${mejorFaq.pregunta}**

${mejorFaq.respuesta}`,
          chips: ['Citas de inscripción SIA', 'Bolsa de créditos', 'Calendario académico'],
        };
      }
    }

    // ------------------------------------------------------------------------
    // 24. Fallback final
    // ------------------------------------------------------------------------
    return {
      texto: `No tengo el dato exacto de esa consulta en la base del portal, pero no te quedes con la duda:

- Si es sobre trámites de la Facultad de Arquitectura, revísalo en el [Portal de Trámites](${ENLACES_OFICIALES.tramitesArquitectura}).
- Si es sobre cupos o profesores, consúltalo en el [Buscador del SIA](${ENLACES_OFICIALES.sia}).
- Para cualquier duda académica o de proyecto, escríbele con toda confianza a Juan Manuel Zapata (Representante de Arquitectura):
  👉 WhatsApp: [${ENLACES_OFICIALES.reprePrincipalTel}](${ENLACES_OFICIALES.reprePrincipalWpp}) · Instagram: [@aguacate._sideral](${ENLACES_OFICIALES.reprePrincipalIg})`,
      chips: ['¿Qué es la malla curricular?', '¿Por qué estudiar Arquitectura?', '¿Cuáles son las alianzas?', 'Pedir la Unidad Compartida'],
    };
  }

  /* ==========================================================================
     6. AVATAR HOLOGRÁFICO DE CORTANA (HALO REIMAGINADO)
     ========================================================================== */

  function renderizarAvatarCortana() {
    return `<svg class="sofia-cortana-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <!-- Gradiente holográfico: Arcilla terracota a Cobre dorado arquitectónico -->
        <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#d4a373" />
          <stop offset="50%" stop-color="#a06e5b" />
          <stop offset="100%" stop-color="#795446" />
        </linearGradient>
        <linearGradient id="holoFace" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#faedd9" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#e9d8a6" stop-opacity="0.65" />
        </linearGradient>
        <radialGradient id="holoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#d4a373" stop-opacity="0.4" />
          <stop offset="70%" stop-color="#795446" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Aura holográfica de fondo -->
      <circle cx="50" cy="50" r="48" fill="url(#holoGlow)" />

      <!-- Anillo exterior con segmentos de interfaz digital -->
      <circle cx="50" cy="50" r="46" stroke="url(#holoGradient)" stroke-width="1.8" stroke-dasharray="8 4 14 3 6 4" opacity="0.85" />
      <circle cx="50" cy="50" r="41" stroke="#d4a373" stroke-width="0.8" stroke-dasharray="2 6" opacity="0.6" />

      <!-- Líneas de datos / Escaneo holográfico -->
      <path d="M15 50 H24 M76 50 H85 M50 15 V24 M50 76 V85" stroke="#d4a373" stroke-width="1.2" opacity="0.6" />
      <circle cx="50" cy="12" r="1.5" fill="#d4a373" />
      <circle cx="88" cy="50" r="1.5" fill="#a06e5b" />

      <!-- Silueta holográfica estilizada de Cortana (cabello y perfil digital) -->
      <path d="M30 46 C28 32 38 23 50 23 C62 23 72 32 70 46 C69 49 68 53 66 56 C64 47 62 39 52 38 C42 39 36 47 34 56 C32 53 31 49 30 46 Z" fill="url(#holoGradient)" opacity="0.95" />
      
      <!-- Rostro elegante holográfico -->
      <path d="M36 46 C36 40 42 36 50 36 C58 36 64 40 64 46 C64 55 58 65 50 69 C42 65 36 55 36 46 Z" fill="url(#holoFace)" />
      
      <!-- Cuello y hombros digitales -->
      <path d="M44 67 L42 77 L31 82 C43 85 57 85 69 82 L58 77 L56 67 Z" fill="url(#holoGradient)" opacity="0.8" />

      <!-- Ojos / Visor de IA brillante -->
      <ellipse cx="44" cy="48" rx="2.5" ry="1.2" fill="#2d1e18" />
      <ellipse cx="56" cy="48" rx="2.5" ry="1.2" fill="#2d1e18" />
      <circle cx="44.8" cy="47.6" r="0.8" fill="#d4a373" />
      <circle cx="56.8" cy="47.6" r="0.8" fill="#d4a373" />

      <!-- Líneas de circuito en el rostro de Cortana -->
      <path d="M50 38 V44 M47 54 H53 M50 58 V62" stroke="#a06e5b" stroke-width="1" stroke-linecap="round" opacity="0.75" />
      <path d="M38 52 L42 55 M62 52 L58 55" stroke="#795446" stroke-width="0.9" opacity="0.7" />

      <!-- Nodo de activación en la frente (chispa de IA) -->
      <circle cx="50" cy="33" r="1.6" fill="#ffffff" />
      <circle cx="50" cy="33" r="3.2" stroke="#d4a373" stroke-width="0.8" opacity="0.9" />
    </svg>`;
  }

  /* ==========================================================================
     7. INTERFAZ GRÁFICA
     ========================================================================== */

  function crearElementosDOM() {
    if (document.getElementById('sofia-contenedor-global')) return;

    if (!document.getElementById('css-sofia')) {
      const linkCss = document.createElement('link');
      linkCss.id = 'css-sofia';
      linkCss.rel = 'stylesheet';
      linkCss.href = 'css/sofia.css';
      (document.head || document.getElementsByTagName('head')[0] || document.body)?.appendChild(linkCss);
    }

    const wrapGlobal = document.createElement('div');
    wrapGlobal.id = 'sofia-contenedor-global';
    wrapGlobal.innerHTML = `
      <div class="sofia-flotante-wrap" id="sofia-flotante-wrap">
        <div class="sofia-globo-bienvenida" id="sofia-globo" role="tooltip" aria-label="Aviso de sofIA">
          <span class="sofia-globo-texto">👋 ¿Dudas con materias o trámites? <strong>Pregúntale a sofIA</strong></span>
          <button class="sofia-globo-cerrar" id="sofia-globo-cerrar" type="button" aria-label="Cerrar sugerencia">✕</button>
        </div>

        <button class="sofia-boton" id="sofia-btn-toggle" type="button" aria-label="Abrir asistente virtual sofIA" aria-haspopup="dialog" aria-expanded="false">
          <span class="sofia-boton__icono">
            ${renderizarAvatarCortana()}
          </span>
          <span class="sofia-boton__badge" title="sofIA en línea"></span>
        </button>
      </div>

      <aside class="sofia-ventana" id="sofia-ventana" role="dialog" aria-label="Ventana de conversación con sofIA" aria-modal="true" hidden>
        <header class="sofia-cabecera">
          <div class="sofia-cabecera__info">
            <div class="sofia-cabecera__avatar" aria-hidden="true">
              ${renderizarAvatarCortana()}
            </div>
            <div class="sofia-cabecera__titulos">
              <div class="sofia-cabecera__nombre-wrap">
                <span class="sofia-cabecera__nombre">sofIA</span>
                <span class="sofia-tag-ia">UNAL</span>
              </div>
              <span class="sofia-cabecera__subtitulo">
                <span class="sofia-punto-verde" aria-hidden="true"></span>
                En línea · Asistente de Arquitectura
              </span>
            </div>
          </div>
          <div class="sofia-cabecera__acciones">
            <button class="sofia-btn-accion" id="sofia-btn-limpiar" type="button" title="Reiniciar conversación" aria-label="Reiniciar conversación">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
            <button class="sofia-btn-accion" id="sofia-btn-cerrar" type="button" title="Cerrar chat" aria-label="Cerrar ventana de sofIA">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </header>

        <div class="sofia-mensajes" id="sofia-mensajes" tabindex="0" aria-live="polite"></div>

        <footer class="sofia-pie">
          <form class="sofia-formulario" id="sofia-form">
            <input
              type="text"
              class="sofia-input"
              id="sofia-input"
              placeholder="Pregúntale a sofIA sobre la malla, materias, alianzas..."
              autocomplete="off"
              required
              aria-label="Mensaje para sofIA"
            >
            <button class="sofia-btn-enviar" id="sofia-btn-enviar" type="submit" aria-label="Enviar mensaje">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
          <p class="sofia-aviso-privacidad">sofIA consulta la base oficial del portal de Arquitectura UNAL.</p>
        </footer>
      </aside>
    `;

    document.body.appendChild(wrapGlobal);
    vincularEventos();
    cargarHistorialGuardado();
  }

  function formatearMarkdown(texto) {
    if (!texto) return '';
    return texto
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="sofia-code">$1</code>')
      .replace(/^### (.*$)/gim, '<div class="sofia-tarjeta-dato__titulo">$1</div>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\s*• (.*$)/gim, '<li>$1</li>')
      .replace(/^\s*- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  function agregarMensajeAlDOM(emisor, textoMarkdown, chips = [], animar = true) {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const fila = document.createElement('div');
    fila.className = `sofia-fila sofia-fila--${emisor}`;

    const htmlContenido = formatearMarkdown(textoMarkdown);

    let htmlChips = '';
    if (chips && chips.length > 0) {
      htmlChips = `
        <div class="sofia-chips-contenedor">
          <div class="sofia-chips-titulo">Sugerencias:</div>
          <div class="sofia-chips-rejilla">
            ${chips.map((chip) => `<button type="button" class="sofia-chip" data-consulta="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`).join('')}
          </div>
        </div>`;
    }

    if (emisor === 'bot') {
      fila.innerHTML = `
        <div class="sofia-fila__avatar" aria-hidden="true">
          ${renderizarAvatarCortana()}
        </div>
        <div class="sofia-burbuja">
          <div class="sofia-burbuja__cuerpo">${htmlContenido}</div>
          ${htmlChips}
          <span class="sofia-burbuja__hora">${horaFormateada}</span>
        </div>`;
    } else {
      fila.innerHTML = `
        <div class="sofia-burbuja">
          <div class="sofia-burbuja__cuerpo">${htmlContenido}</div>
          <span class="sofia-burbuja__hora">${horaFormateada}</span>
        </div>`;
    }

    contenedor.appendChild(fila);
    contenedor.scrollTop = contenedor.scrollHeight;

    estadoSofia.mensajes.push({ emisor, texto: textoMarkdown, chips });
    guardarHistorial();
  }

  function mostrarIndicadorEscribiendo() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor || document.getElementById('sofia-escribiendo-indicador')) return;

    const indicador = document.createElement('div');
    indicador.id = 'sofia-escribiendo-indicador';
    indicador.className = 'sofia-fila sofia-fila--bot';
    indicador.innerHTML = `
      <div class="sofia-fila__avatar" aria-hidden="true">${renderizarAvatarCortana()}</div>
      <div class="sofia-escribiendo">
        <span class="sofia-escribiendo__punto"></span>
        <span class="sofia-escribiendo__punto"></span>
        <span class="sofia-escribiendo__punto"></span>
      </div>`;
    contenedor.appendChild(indicador);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  function removerIndicadorEscribiendo() {
    const el = document.getElementById('sofia-escribiendo-indicador');
    if (el) el.remove();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     8. HISTORIAL Y SESIÓN
     ========================================================================== */

  function guardarHistorial() {
    try {
      sessionStorage.setItem('arquitectura.sofia.historial', JSON.stringify(estadoSofia.mensajes.slice(-20)));
    } catch (_) {}
  }

  function cargarHistorialGuardado() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    try {
      const guardado = sessionStorage.getItem('arquitectura.sofia.historial') || sessionStorage.getItem('construccion.sofia.historial');
      if (guardado) {
        const lista = JSON.parse(guardado);
        if (Array.isArray(lista) && lista.length > 0) {
          estadoSofia.mensajes = lista;
          contenedor.innerHTML = '';
          lista.forEach((item) => {
            agregarMensajeAlDOM(item.emisor, item.texto, item.chips, false);
          });
          return;
        }
      }
    } catch (_) {}

    const chipsIniciales = [
      '¿Qué es la malla curricular?',
      '¿Qué tipo de materias hay?',
      '¿Por qué estudiar Arquitectura?',
      '¿Cómo hacer cambio de carrera?',
      '¿Cuáles son las alianzas?',
      'Pedir la Unidad Compartida',
      'Fechas de cancelación',
    ];
    agregarMensajeAlDOM(
      'bot',
      `¡Hola! Soy **sofIA**, tu asistente holográfica de **Arquitectura** de la Facultad de Arquitectura (UNAL Medellín).

Estoy conectada a toda la información oficial: malla curricular, tipos de materias, prerrequisitos, semilleros, alianzas de bienestar, cambio de carrera, fechas del calendario y la Unidad Compartida de estudio. ¿En qué te puedo colaborar hoy?`,
      chipsIniciales,
      false
    );
  }

  /* ==========================================================================
     9. CONTROL Y EVENTOS
     ========================================================================== */

  function abrirSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    const globo = document.getElementById('sofia-globo');
    if (!ventana || !btn) return;

    inicializarBaseConocimiento();

    ventana.hidden = false;
    void ventana.offsetWidth;
    ventana.classList.add('is-abierta');
    btn.setAttribute('aria-expanded', 'true');
    estadoSofia.abierto = true;

    if (globo) globo.style.display = 'none';

    setTimeout(() => {
      document.getElementById('sofia-input')?.focus();
      const contenedor = document.getElementById('sofia-mensajes');
      if (contenedor) contenedor.scrollTop = contenedor.scrollHeight;
    }, 200);
  }

  function cerrarSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    if (!ventana || !btn) return;

    ventana.classList.remove('is-abierta');
    btn.setAttribute('aria-expanded', 'false');
    estadoSofia.abierto = false;

    setTimeout(() => {
      if (!estadoSofia.abierto) {
        ventana.hidden = true;
      }
    }, 280);
  }

  function procesarConsultaUsuario(texto) {
    const consultaLimpia = (texto || '').trim();
    if (!consultaLimpia) return;

    agregarMensajeAlDOM('usuario', consultaLimpia);

    const input = document.getElementById('sofia-input');
    if (input) input.value = '';

    mostrarIndicadorEscribiendo();

    setTimeout(() => {
      removerIndicadorEscribiendo();
      const respuesta = responderPregunta(consultaLimpia);
      agregarMensajeAlDOM('bot', respuesta.texto, respuesta.chips);
    }, 320);
  }

  function vincularEventos() {
    const btnToggle = document.getElementById('sofia-btn-toggle');
    const btnCerrar = document.getElementById('sofia-btn-cerrar');
    const btnLimpiar = document.getElementById('sofia-btn-limpiar');
    const globoCerrar = document.getElementById('sofia-globo-cerrar');
    const globo = document.getElementById('sofia-globo');
    const formulario = document.getElementById('sofia-form');
    const contenedorMensajes = document.getElementById('sofia-mensajes');

    btnToggle?.addEventListener('click', () => {
      if (estadoSofia.abierto) cerrarSofia();
      else abrirSofia();
    });

    btnCerrar?.addEventListener('click', cerrarSofia);

    globo?.addEventListener('click', (e) => {
      if (e.target.closest('#sofia-globo-cerrar')) return;
      abrirSofia();
    });

    globoCerrar?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (globo) globo.remove();
      sessionStorage.setItem('arquitectura.sofia.globo_oculto', '1');
    });

    if ((sessionStorage.getItem('arquitectura.sofia.globo_oculto') === '1' || sessionStorage.getItem('construccion.sofia.globo_oculto') === '1') && globo) {
      globo.remove();
    }

    btnLimpiar?.addEventListener('click', () => {
      sessionStorage.removeItem('arquitectura.sofia.historial'); sessionStorage.removeItem('construccion.sofia.historial');
      estadoSofia.mensajes = [];
      cargarHistorialGuardado();
    });

    formulario?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('sofia-input');
      if (input) procesarConsultaUsuario(input.value);
    });

    contenedorMensajes?.addEventListener('click', (e) => {
      const chip = e.target.closest('.sofia-chip');
      if (chip) {
        const consulta = chip.getAttribute('data-consulta');
        if (consulta) procesarConsultaUsuario(consulta);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && estadoSofia.abierto) {
        cerrarSofia();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearElementosDOM);
  } else {
    crearElementosDOM();
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => inicializarBaseConocimiento(), { timeout: 3000 });
  } else {
    setTimeout(inicializarBaseConocimiento, 1500);
  }

  window.sofIA = {
    abrir: abrirSofia,
    cerrar: cerrarSofia,
    preguntar: procesarConsultaUsuario,
    responder: responderPregunta,
    inicializar: inicializarBaseConocimiento,
  };
})();
