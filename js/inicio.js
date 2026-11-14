
/* ==============================================================================
   ICONOGRAFÍA Y UTILIDADES SVG OFICIALES DE ARQUITECTURA
   ============================================================================== */

const ICONO_SELLO = `
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
`;

const ICONOS_ARQ = {
  materiales: '<path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.91 8.35a2 2 0 0 0-.91 1.66v7.98a2 2 0 0 0 .91 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.99-6.07a2 2 0 0 0 .91-1.66V8.06a2 2 0 0 0-.91-1.66z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  comunidad: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  investigacion: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  ambiente: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  habitat: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  libro: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  laboratorio: '<path d="M10 2v7.31L4.54 18.2A2 2 0 0 0 6.27 21h11.46a2 2 0 0 0 1.73-2.8L14 9.31V2"/><line x1="8" y1="2" x2="16" y2="2"/><line x1="6.5" y1="15" x2="17.5" y2="15"/>',
  obra: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  ciudad: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/>',
  circular: '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>',
  interventoria: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
};

function svgIcono(tipo, size = 16) {
  const paths = {
    laboratorio: '<path d="M10 2v7.31L4.54 18.2A2 2 0 0 0 6.27 21h11.46a2 2 0 0 0 1.73-2.8L14 9.31V2"/><line x1="8" y1="2" x2="16" y2="2"/><line x1="6.5" y1="15" x2="17.5" y2="15"/>',
    materiales: '<path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.91 8.35a2 2 0 0 0-.91 1.66v7.98a2 2 0 0 0 .91 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.99-6.07a2 2 0 0 0 .91-1.66V8.06a2 2 0 0 0-.91-1.66z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    habitat: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    libro: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    estructura: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/>',
    bim: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    sostenible: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    usuario: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    comunidad: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    investigacion: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    interventoria: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    circular: '<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>',
    obra: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    patologia: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
    ciencia: '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/>',
    equipo: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    gestion: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    empresa: '<path d="M3 21h18M5 21V5l7-3 7 3v16M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1M9 21v-4h6v4"/>',
    ciudad: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/>',
    ambiente: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    proyectos: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9M15 21V9M3 15h18"/>'
  };

  const p = paths[tipo] || paths.materiales;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}

function setupHeroActions() {
  const btnSofia = document.getElementById('btn-hero-sofia');
  if (btnSofia) {
    btnSofia.addEventListener('click', () => {
      if (window.sofIA && window.sofIA.abrir) window.sofIA.abrir();
    });
  }
}

/* ---------- 1. Animación de Conteo de Cifras (Estación Total) ---------- */

function animarCifras() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elementos = $$('#portada-cifras li');
  elementos.forEach((li) => {
    const small = li.querySelector('small');
    if (!small) return;
    const textoCompleto = li.textContent.replace(small.textContent, '').trim();
    const numero = parseInt(textoCompleto.replace(/\D/g, ''), 10);
    if (isNaN(numero) || numero <= 0) return;

    const tieneSufijo = textoCompleto.includes('+') ? '+' : '';
    const duracion = 1200;
    const inicio = performance.now();

    function actualizar(ahora) {
      const transcurrido = ahora - inicio;
      const progreso = Math.min(transcurrido / duracion, 1);
      const facilidad = progreso === 1 ? 1 : 1 - Math.pow(2, -10 * progreso);
      const actual = Math.floor(facilidad * numero);

      const nodoTexto = Array.from(li.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if (nodoTexto) {
        nodoTexto.textContent = `${actual}${progreso === 1 ? tieneSufijo : ''} `;
      }

      if (progreso < 1) {
        requestAnimationFrame(actualizar);
      }
    }
    requestAnimationFrame(actualizar);
  });
}


/* ---------- 2. Observador de Plano y Construcción en Scroll ---------- */

let observadorPlano = null;

function observarPlanoConstruccion() {
  const elementos = $$('.plano-construir');
  if (elementos && elementos.forEach) {
    elementos.forEach(el => el.classList.add('plano-construido'));
  }
}


/* ---------- 3. Programa y Especificaciones ---------- */

function pintarPrograma(p) {
  // Cifras en la portada (modular architectural cards)
  const cifrasWrap = $('#portada-cifras');
  if (cifrasWrap) {
    cifrasWrap.innerHTML = p.cifras
      .map((c) => `<li class="cifra-plano">${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
      .join('');
    animarCifras();
  }

  const acreditacion = p.acreditacion;
  const contenido = $('#programa-contenido');
  if (!contenido) return;

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 01 · FUNDAMENTACIÓN -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">01</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +3.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE A</span>
    </div>

    <!-- ENCABEZADO DE LA SECCIÓN -->
    <div class="seccion-titulo plano-construir">
      <h2 id="programa-titulo">Definición y Enfoque del Pregrado</h2>
      <p class="seccion-titulo__intro">
        Formación integral en ciencias de la ingeniería, sensibilidad del diseño arquitectónico, gestión estratégica y tecnología de la edificación y el hábitat.
      </p>
    </div>

    

    <!-- TABLERO TÉCNICO: DESCRIPCIÓN Y ESPECIFICACIONES DE OBRA -->
    <div class="tablero-obra">
      <!-- COLUMNA IZQUIERDA: IDENTIDAD Y VISIÓN -->
      <div class="tablero-obra__col-identidad plano-construir">
        <div class="tablero-obra__tarjeta-vision plano-bloque">
          <div class="tablero-obra__badge-arquitectura">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Escuela de Arquitectura · Área Curricular de Arquitectura y Urbanismo</span>
          </div>

          <div class="tablero-obra__parrafos">
            ${p.descripcion.map((parrafo) => `<p>${esc(parrafo)}</p>`).join('')}
          </div>
        </div>
      </div>

      <!-- COLUMNA DERECHA: ESPECIFICACIONES CLAVE -->
      <div class="tablero-obra__col-ficha plano-construir">
        <div class="ficha-especificaciones plano-bloque">
          <div class="ficha-especificaciones__cabecera">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            <h3>Matriz Académica y Registro</h3>
          </div>
          <ul class="ficha-especificaciones__lista">
            ${p.ficha.filter((f) => !['Créditos del plan', 'Duración del plan', 'Modalidad', 'Jornada', 'Código SNIES'].includes(f.etiqueta)).map((f) => `
              <li class="ficha-especificaciones__item">
                <span class="ficha-especificaciones__clave">${esc(f.etiqueta)}</span>
                <span class="ficha-especificaciones__valor">${esc(f.valor)}</span>
              </li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- RUTAS CURRICULARES OFICIALES -->
    <div class="rutas-curriculares" id="rutas-curriculares">
      <!-- EJE ESTRUCTURAL 02 · TRAYECTORIAS -->
      <div class="cota-eje plano-construir">
        <span class="cota-eje__marca">02</span>
        <span class="cota-eje__linea"></span>
        <span class="cota-eje__nivel">▲ N.P.T. +7.00m</span>
        <span class="cota-eje__linea"></span>
        <span class="cota-eje__marca">EJE B</span>
      </div>

      <div class="seccion-titulo seccion-titulo--rutas plano-construir">
        <h3 class="rutas__titulo">Cinco Rutas Curriculares de Énfasis</h3>
        <p class="seccion-titulo__intro">
          Trayectorias optativas del plan de estudios (Acuerdo 002 de 2022 del Consejo de Facultad):
        </p>
      </div>

      <div class="rutas__bento">
        ${(p.rutas || []).map((ruta, idx) => {
          const iconosRuta = ['proyectos', 'sostenible', 'bim', 'libro', 'obra'];
          const iconoTipo = iconosRuta[idx] || 'estructura';
          const claseExtra = `ruta-bento--${idx + 1} ${idx === 0 ? 'ruta-bento--hero' : ''}`;
          const num = `0${idx + 1}`;

          return `
            <article class="ruta-bento ${claseExtra} plano-bloque plano-construir" id="ruta-${esc(ruta.id)}">
              <span class="ruta-bento__watermark" aria-hidden="true">${num}</span>
              
              <div class="ruta-bento__top">
                <span class="ruta-bento__badge">${esc(ruta.codigo || `TRAYECTORIA · ${num}`)}</span>
                <span class="ruta-bento__icono">${svgIcono(iconoTipo, 18)}</span>
              </div>

              <h4 class="ruta-bento__nombre">${esc(ruta.nombre)}</h4>
              <p class="ruta-bento__descripcion">${esc(ruta.descripcion)}</p>

              ${ruta.tags && ruta.tags.length ? `
              <div class="ruta-bento__tags" aria-label="Temáticas clave">
                ${ruta.tags.slice(0, 3).map(tag => `<span class="ruta-tag">${esc(tag)}</span>`).join('')}
              </div>` : ''}

              <div class="ruta-bento__pie">
                <a href="malla.html" class="ruta-bento__cta" title="Ver asignaturas de esta trayectoria en la malla">
                  <span>Ver asignaturas</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </article>`;
        }).join('')}
      </div>
    </div>

    <!-- CERTIFICACIÓN Y ACREDITACIÓN DE CALIDAD -->
    <div class="acreditacion plano-bloque plano-construir">
      <div class="acreditacion__cabecera">
        <span class="acreditacion__sello-icono">${ICONO_SELLO}</span>
        <div>
          <span class="acreditacion__antetitulo">Facultad de Arquitectura · Sede Medellín</span>
          <h3 class="acreditacion__estado">${esc(acreditacion.estado)}</h3>
        </div>
      </div>
      <div class="acreditacion__rejilla">
        ${acreditacion.hitos.map((h, i) => `
          <div class="acreditacion__tarjeta ${String(h.anio).toLowerCase().includes('acredit') ? 'acreditacion__tarjeta--renovacion' : ''}">
            <div class="acreditacion__tarjeta-encabezado">
              <span class="acreditacion__anio-badge">${esc(h.anio)}</span>
              <span class="acreditacion__hito-tipo">${i === 0 ? 'Pioneros en Colombia' : 'Acreditación de Alta Calidad'}</span>
            </div>
            <p class="acreditacion__texto">${esc(h.texto)}</p>
          </div>`).join('')}
      </div>
      <div class="acreditacion__pie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="acreditacion__info-icono" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <p class="acreditacion__nota">${esc(acreditacion.nota)}</p>
      </div>
    </div>

    <p class="fuentes plano-construir">Fuentes oficiales:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;

  observarPlanoConstruccion();
}


/* ---------- 4. Fortalezas Exclusivas del Pregrado ---------- */

function pintarFortalezas(fortalezas) {
  const contenido = $('#fortalezas-contenido');
  if (!contenido || !fortalezas) return;

  const lab = fortalezas.find(f => f.id === 'talleres-proyectos-bloque24') || fortalezas[0];
  const hab = fortalezas.find(f => f.id === 'escuela-habitat') || fortalezas[1];

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 03 · FORTALEZAS Y DIFERENCIALES EXCLUSIVOS -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">03</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +10.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE C</span>
    </div>

    <!-- ENCABEZADO DE LA SECCIÓN -->
    <div class="seccion-titulo plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>EXCLUSIVIDAD Y LIDERAZGO · FACULTAD DE ARQUITECTURA</span>
      </div>
      <h2 id="fortalezas-titulo">Grandes Fortalezas del Pregrado</h2>
      <p class="seccion-titulo__intro">
        El pregrado en Arquitectura de la UNAL Medellín es el referente histórico y vanguardista de la formación proyectual en el país. En el Campus El Volador contamos con talleres integrales de diseño y la prestigiosa Escuela del Hábitat.
      </p>
    </div>

    <!-- REJILLA DE LAS 2 GRANDES FORTALEZAS (CARDS DESPLEGABLES) -->
    <div class="fortalezas-grid">

      <!-- FORTALEZA 1: TALLERES PROYECTUALES Y MODELADO (BLOQUE 24) -->
      <article class="fortaleza-card fortaleza-card--laboratorio plano-bloque plano-construir" id="fortaleza-lab">
        <span class="mira-plano mira-plano--tl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--tr" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--bl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--br" aria-hidden="true"></span>

        <!-- VISTA RESUMIDA SIEMPRE VISIBLE -->
        <div class="fortaleza-card__resumen">
          <div class="fortaleza-card__cabeza">
            <div class="fortaleza-card__tags">
              <span class="fortaleza-badge fortaleza-badge--lab">${svgIcono('laboratorio', 16)} ${esc(lab.badge)}</span>
              <span class="fortaleza-sello">${esc(lab.sello)}</span>
            </div>
            <div class="fortaleza-card__icono-box">
              ${svgIcono('materiales', 28)}
            </div>
          </div>

          <div class="fortaleza-stat">
            <div class="fortaleza-stat__cifra">
              <span class="fortaleza-stat__num">9</span>
              <span class="fortaleza-stat__den">Talleres</span>
            </div>
            <div class="fortaleza-stat__info">
              <strong class="fortaleza-stat__resaltado">Tradición, vanguardia y formación proyectual integral</strong>
              <p class="fortaleza-stat__bajada">9 semestres de talleres integrales de proyectos con mesas de dibujo continuo, salas de crítica colectiva y laboratorios de vanguardia.</p>
            </div>
          </div>

          <div class="fortaleza-card__titulares">
            <h3 class="fortaleza-card__titulo">${esc(lab.titulo)}</h3>
            <p class="fortaleza-card__ubicacion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${esc(lab.ubicacion)}
            </p>
          </div>
        </div>

        <!-- BOTÓN DESPLEGABLE -->
        <button type="button" class="fortaleza-card__toggle" aria-expanded="false" aria-controls="fortaleza-detalles-lab" id="btn-toggle-lab">
          <span class="fortaleza-card__toggle-texto">Ver capacidades y equipamiento</span>
          <span class="fortaleza-card__toggle-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <!-- PANEL DESPLEGABLE CON ANIMACIÓN -->
        <div class="fortaleza-card__desplegable" id="fortaleza-detalles-lab" role="region" aria-labelledby="btn-toggle-lab">
          <div class="fortaleza-card__desplegable-interior">
            <p class="fortaleza-card__destacado">
              ${esc(lab.destacado)}
            </p>

            <p class="fortaleza-card__descripcion">
              ${esc(lab.descripcion)}
            </p>

            <div class="fortaleza-card__chips" aria-label="Capacidades del laboratorio">
              ${(lab.puntos || []).map(p => `
                <span class="fortaleza-chip">
                  ${svgIcono('check', 13)}
                  <span>${esc(p)}</span>
                </span>`).join('')}
            </div>

            <div class="fortaleza-card__pie">
              <a href="${esc(lab.enlace.url)}" target="_blank" rel="noopener noreferrer" class="boton-fortaleza">
                <span>Conocer el Pregrado de Arquitectura</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- FORTALEZA 2: ESCUELA DEL HÁBITAT Y UNIDAD DE DOCUMENTACIÓN -->
      <article class="fortaleza-card fortaleza-card--habitat plano-bloque plano-construir" id="fortaleza-hab">
        <span class="mira-plano mira-plano--tl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--tr" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--bl" aria-hidden="true"></span>
        <span class="mira-plano mira-plano--br" aria-hidden="true"></span>

        <!-- VISTA RESUMIDA SIEMPRE VISIBLE -->
        <div class="fortaleza-card__resumen">
          <div class="fortaleza-card__cabeza">
            <div class="fortaleza-card__tags">
              <span class="fortaleza-badge fortaleza-badge--hab">${svgIcono('habitat', 16)} ${esc(hab.badge)}</span>
              <span class="fortaleza-sello fortaleza-sello--verde">${esc(hab.sello)}</span>
            </div>
            <div class="fortaleza-card__icono-box fortaleza-card__icono-box--hab">
              ${svgIcono('libro', 28)}
            </div>
          </div>

          <div class="fortaleza-stat fortaleza-stat--hab">
            <div class="fortaleza-stat__cifra">
              <span class="fortaleza-stat__num">ÚNICA</span>
            </div>
            <div class="fortaleza-stat__info">
              <strong class="fortaleza-stat__resaltado">Unidad de Documentación única en la ciudad</strong>
              <p class="fortaleza-stat__bajada">Acervo bibliográfico e investigativo de vanguardia en vivienda, hábitat popular y territorio.</p>
            </div>
          </div>

          <div class="fortaleza-card__titulares">
            <h3 class="fortaleza-card__titulo">${esc(hab.titulo)}</h3>
            <p class="fortaleza-card__ubicacion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${esc(hab.ubicacion)}
            </p>
          </div>
        </div>

        <!-- BOTÓN DESPLEGABLE -->
        <button type="button" class="fortaleza-card__toggle fortaleza-card__toggle--hab" aria-expanded="false" aria-controls="fortaleza-detalles-hab" id="btn-toggle-hab">
          <span class="fortaleza-card__toggle-texto">Ver los 5 pilares e investigación</span>
          <span class="fortaleza-card__toggle-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>

        <!-- PANEL DESPLEGABLE CON ANIMACIÓN -->
        <div class="fortaleza-card__desplegable" id="fortaleza-detalles-hab" role="region" aria-labelledby="btn-toggle-hab">
          <div class="fortaleza-card__desplegable-interior">
            <p class="fortaleza-card__destacado">
              ${esc(hab.destacado)}
            </p>

            <div class="fortaleza-pilares">
              <h4 class="fortaleza-pilares__titulo">Por qué la Escuela del Hábitat es un referente destacado:</h4>
              <ul class="fortaleza-pilares__lista">
                ${(hab.pilares || []).map((pil, idx) => `
                  <li class="fortaleza-pilar-item">
                    <span class="fortaleza-pilar-num">0${idx + 1}</span>
                    <div class="fortaleza-pilar-contenido">
                      <strong class="fortaleza-pilar-nombre">${esc(pil.titulo)}:</strong>
                      <span class="fortaleza-pilar-detalle">${esc(pil.detalle)}</span>
                    </div>
                  </li>`).join('')}
              </ul>
            </div>

            <div class="fortaleza-card__pie">
              <a href="${esc(hab.enlace.url)}" target="_blank" rel="noopener noreferrer" class="boton-fortaleza boton-fortaleza--hab">
                <span>Conoce la Escuela del Hábitat</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </article>

    </div>
  `;

  // Interacción de desplegar / contraer cards
  contenido.querySelectorAll('.fortaleza-card__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.fortaleza-card');
      if (!card) return;
      const estaAbierta = card.classList.contains('is-abierta');
      card.classList.toggle('is-abierta', !estaAbierta);
      btn.setAttribute('aria-expanded', !estaAbierta);

      const textoSpan = btn.querySelector('.fortaleza-card__toggle-texto');
      if (textoSpan) {
        if (!estaAbierta) {
          btn.dataset.textoCerrado = textoSpan.textContent;
          textoSpan.textContent = 'Ocultar detalles';
        } else {
          textoSpan.textContent = btn.dataset.textoCerrado || 'Ver más detalles';
        }
      }
    });
  });

  observarPlanoConstruccion();
}


/* ---------- 5. Perfil del Egresado ---------- */

function pintarPerfil(perfil) {
  const contenido = $('#perfil-contenido');
  if (!contenido) return;

  const camposAccion = [
    { rol: 'PROYECTO Y DISEÑO ESPACIAL', icono: 'proyectos' },
    { rol: 'ORDENAMIENTO, HÁBITAT Y CIUDAD', icono: 'habitat' },
    { rol: 'BIOCLIMÁTICA Y SOSTENIBILIDAD', icono: 'sostenible' },
    { rol: 'PATRIMONIO, BIM Y CONSTRUCCIÓN', icono: 'bim' }
  ];

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 04 · COMPETENCIAS -->
    <div class="cota-eje plano-construir">
      <span class="cota-eje__marca">04</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +14.00m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE D</span>
    </div>

    <div class="seccion-titulo plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>CAMPO OCUPACIONAL · TÍTULO DE ARQUITECTO(A) · UNAL MEDELLÍN</span>
      </div>
      <h2 id="perfil-titulo">${esc(perfil.titulo)}</h2>
      <p class="seccion-titulo__intro">${esc(perfil.intro)}</p>
    </div>

    <div class="perfil__rejilla-profesional">
      ${perfil.rasgos.map((r, idx) => {
        const campo = camposAccion[idx] || { rol: 'COMPETENCIA PROFESIONAL', icono: 'estructura' };
        return `
          <div class="rasgo-profesional plano-bloque plano-construir">
            <div class="rasgo-profesional__cabecera">
              <span class="rasgo-profesional__tag">${esc(campo.rol)}</span>
              <span class="rasgo-profesional__icono">${svgIcono(campo.icono, 24)}</span>
            </div>
            <h3 class="rasgo-profesional__titulo">${esc(r.titulo)}</h3>
            <p class="rasgo-profesional__texto">${esc(r.texto)}</p>
            <div class="rasgo-profesional__cota">
              <span class="rasgo-profesional__cota-linea"></span>
              <span class="rasgo-profesional__cota-punto"></span>
            </div>
          </div>`;
      }).join('')}
    </div>
    <p class="perfil__fuente plano-construir">${esc(perfil.fuente)}</p>`;

  observarPlanoConstruccion();
}


/* ---------- 6. Grupos de Investigación y Semilleros ---------- */

function pintarGrupos(grupos) {
  const contenido = $('#grupos-contenido');
  if (!contenido) return;

  const semilleros = grupos.filter(g => !g.id.includes('representacion'));

  const ICONOS_GRUPO = {
    'grupos-capitulos-arquitectura': 'obra',
    'semillero-estudios-espaciales': 'ciudad',
    'semillero-geo-clima': 'ambiente',
    'semillero-chagra': 'comunidad',
    'semillero-formacion-arquitectura': 'investigacion',
    'sigcon': 'interventoria',
    'grinco': 'laboratorio',
    'sicc': 'circular'
  };

  const semillerosCards = semilleros.map((grupo) => {
    const ico = ICONOS_GRUPO[grupo.id] || 'materiales';
    return `
      <article class="grupo-card plano-bloque plano-construir" id="grupo-${esc(grupo.id)}" style="--color-grupo: ${esc(grupo.color)}">
        <div class="grupo-card__header">
          <div class="grupo-card__emblema">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true">
              ${ICONOS_ARQ[ico] || ICONOS_ARQ.materiales}
            </svg>
          </div>
          <div class="grupo-card__titulos">
            <div class="grupo-card__tags-top">
              <span class="grupo-card__tipo">${esc(grupo.tipo)}</span>
              ${grupo.subtipo ? `<span class="grupo-card__subtipo">${esc(grupo.subtipo)}</span>` : ''}
            </div>
            <h3 class="grupo-card__nombre">${esc(grupo.nombre)}</h3>
          </div>
        </div>

        ${grupo.director ? `
          <div class="grupo-card__director">
            ${svgIcono('usuario', 15)}
            <span><strong>Director:</strong> ${esc(grupo.director)}</span>
          </div>` : ''}

        <p class="grupo-card__descripcion">${esc(grupo.descripcion)}</p>

        ${grupo.lineas && grupo.lineas.length ? `
          <div class="grupo-card__lineas-box">
            <span class="grupo-card__lineas-label">Líneas y temas de trabajo:</span>
            <ul class="grupo-card__lineas">
              ${grupo.lineas.map(l => `
                <li class="grupo-card__linea-item">
                  <span class="grupo-card__bullet" aria-hidden="true">${svgIcono('check', 12)}</span>
                  <span>${esc(l)}</span>
                </li>`).join('')}
            </ul>
          </div>` : ''}

        <div class="grupo-card__acciones">
          ${grupo.email ? `
            <a href="mailto:${esc(grupo.email)}" class="grupo-card__btn grupo-card__btn--correo" title="Enviar correo de contacto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Contacto</span>
            </a>` : ''}
          ${grupo.enlace ? `
            <a href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer" class="grupo-card__btn grupo-card__btn--enlace" title="Abrir ficha en Hermes o sitio web">
              <span>${esc(grupo.enlaceTexto || 'Consultar')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>` : ''}
        </div>
      </article>`;
  }).join('');

  contenido.innerHTML = `
    <!-- EJE ESTRUCTURAL 05 · LÍNEAS EXPERIMENTALES -->
    <div class="cota-eje cota-eje--oscuro plano-construir">
      <span class="cota-eje__marca">05</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__nivel">▲ N.P.T. +17.50m</span>
      <span class="cota-eje__linea"></span>
      <span class="cota-eje__marca">EJE E</span>
    </div>

    <div class="seccion-titulo seccion-titulo--comunidad plano-construir">
      <div class="cajetin-proyecto cajetin-proyecto--sub">
        <span>INVESTIGACIÓN Y DESARROLLO · FACULTAD DE ARQUITECTURA</span>
      </div>
      <h2 id="grupos-titulo">Grupos de Investigación y Semilleros</h2>
      <p class="seccion-titulo__intro">
        Líneas de investigación en morfología espacial, bioclimática, patrimonio, producción social del hábitat y diseño proyectual.
      </p>
    </div>

    <!-- SEMILLEROS Y GRUPOS DE INVESTIGACIÓN -->
    <div class="semilleros-grid">
      ${semillerosCards}
    </div>`;

  observarPlanoConstruccion();
}


/* ---------- 7. Inicialización y Carga Modular ---------- */

const SECCIONES = {
  perfil: () => cargarDatos('perfil').then(pintarPerfil),
  grupos: () => cargarDatos('grupos').then(pintarGrupos),
};

function cargarSeccion(seccion) {
  const cargar = SECCIONES[seccion.dataset.carga];
  if (cargar) {
    cargar().catch((error) => mostrarErrorDeCarga(seccion.querySelector('.contenedor'), error));
  }
}

// Cargar programa y fortalezas inmediatamente con manejo robusto de excepciones
cargarDatos('programa')
  .then((p) => {
    try {
      pintarPrograma(p);
    } catch (errP) {
      console.error('Error al pintar programa:', errP);
      mostrarErrorDeCarga($('#programa-contenido'), errP);
    }

    try {
      setupHeroActions();
    } catch (errS) {
      console.error('Error al inicializar scroll 3D:', errS);
    }

    if (p && p.fortalezas) {
      try {
        pintarFortalezas(p.fortalezas);
      } catch (errF) {
        console.error('Error al pintar fortalezas:', errF);
        mostrarErrorDeCarga($('#fortalezas-contenido'), errF);
      }
    }
  })
  .catch((error) => {
    console.error('Error al cargar datos de data/programa.json:', error);
    mostrarErrorDeCarga($('#programa-contenido'), error);
    mostrarErrorDeCarga($('#fortalezas-contenido'), error);
  });

// Carga perezosa con IntersectionObserver
const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '300px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}

