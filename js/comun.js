/* =============================================
   FUNCIONES COMUNES A TODOS LOS MÓDULOS
   - Carga de datos modular (cada módulo pide solo lo que necesita)
   - Barra superior interactiva ("La Viga de Replanteo") con Carro Deslizante (Glider)
   - Transición de página constructiva ("Escaneo de Obra / Replanteo Láser")
   - Pie de página oficial y mensaje de autor
   ============================================= */

const $ = (selector, raiz = document) => raiz.querySelector(selector);
const $$ = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];

// Escapa texto antes de meterlo en HTML
const esc = (texto) => String(texto ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);


/* ---------- Carga de datos ---------- */

const memoriaDatos = new Map();

function cargarDatos(ruta) {
  if (!memoriaDatos.has(ruta)) {
    const peticion = fetch(`data/${ruta}.json`).then((respuesta) => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar data/${ruta}.json (${respuesta.status})`);
      return respuesta.json();
    });
    memoriaDatos.set(ruta, peticion);
  }
  return memoriaDatos.get(ruta);
}

function mostrarErrorDeCarga(contenedor, error) {
  console.error(error);
  contenedor.innerHTML = `
    <div class="aviso">
      <p><strong>No se pudo cargar la información.</strong></p>
      <p>Si abriste el archivo con doble clic, sírvelo con un servidor local:
        <code>python -m http.server</code> y entra a <code>http://localhost:8000</code>.</p>
    </div>`;
}


/* ---------- Barra superior interactiva y navegación ---------- */

const PAGINAS = [
  {
    id: 'inicio',
    texto: 'Inicio',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    tituloCompleto: 'Inicio',
    url: 'index.html',
    cota: '±0.00m',
    badge: null
  },
  {
    id: 'avance',
    texto: 'Mi Avance',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    tituloCompleto: 'Mi Avance en la Carrera',
    url: 'avance.html',
    cota: '+1.75m',
    badge: null
  },
  {
    id: 'malla',
    texto: 'Malla',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9M15 21V9M3 15h18"/></svg>',
    tituloCompleto: 'Malla Curricular',
    url: 'malla.html',
    cota: '+3.50m',
    badge: null
  },
  {
    id: 'intercampus',
    texto: 'Intercampus',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M7 18v3M17 18v3M3 10h18"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
    tituloCompleto: 'Rutas Intercampus y Metro',
    url: 'intercampus.html',
    cota: '+7.00m',
    badge: null
  },
  {
    id: 'convenios',
    texto: 'Convenios',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/></svg>',
    tituloCompleto: 'Convenios y Beneficios',
    url: 'convenios.html',
    cota: '+10.50m',
    badge: null
  },
  {
    id: 'info',
    texto: 'Información',
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    tituloCompleto: 'Información General y Trámites',
    url: 'info.html',
    cota: '+14.00m',
    badge: null
  }
];

function pintarBarra() {
  const actual = document.body.dataset.pagina;
  const contenedorBarra = $('#barra');
  if (!contenedorBarra) return;

  const pActual = PAGINAS.find(p => p.id === actual);
  const cotaActual = pActual ? pActual.cota : '±0.00m';

  contenedorBarra.outerHTML = `
    <header class="barra barra--arquitectura" id="encabezado-barra">
      <div class="contenedor barra__contenido">
        
        <!-- ZONA IZQUIERDA: MARCA + COTA DINÁMICA DE NIVEL -->
        <div class="barra__izq">
          <a class="barra__marca" href="index.html" aria-label="Arquitectura UNAL, volver al inicio" data-id="inicio" data-cota="±0.00m" data-titulo="Inicio">
            <div class="barra__escudo-wrap">
              <span class="barra__mira barra__mira--tl" aria-hidden="true"></span>
              <span class="barra__mira barra__mira--tr" aria-hidden="true"></span>
              <span class="barra__mira barra__mira--bl" aria-hidden="true"></span>
              <span class="barra__mira barra__mira--br" aria-hidden="true"></span>
              <img src="img/logo-arquitectura.svg" alt="Escudo de Arquitectura" class="barra__escudo-img" width="40" height="40">
            </div>
            <div class="barra__texto">
              <div class="barra__carrera-row">
                <span class="barra__carrera">Arquitectura</span>
                <span class="barra__acuerdo-pill">UNAL</span>
              </div>
              <span class="barra__facultad">Facultad de Arquitectura · Sede Medellín</span>
            </div>
          </a>

          </div>

        <!-- ZONA CENTRAL: DOCK DE NAVEGACIÓN MODULAR CON GLIDER -->
        <nav class="nav nav--dock" id="menu-navegacion" aria-label="Módulos del sitio">
          <div class="nav__glider" id="nav-glider" aria-hidden="true">
            <span class="nav__glider-laser"></span>
            <span class="nav__glider-burbuja"></span>
          </div>

          ${PAGINAS.map((p) => {
            const esActivo = p.id === actual;
            return `
              <a class="nav__enlace ${esActivo ? 'is-activo' : ''}" href="${p.url}" ${esActivo ? 'aria-current="page"' : ''} data-id="${p.id}" data-cota="${p.cota}" data-titulo="${p.tituloCompleto}">
                <span class="nav__icono">${p.icono}</span>
                <span class="nav__texto">${p.texto}</span>
              </a>`;
          }).join('')}
        </nav>

        <!-- ZONA DERECHA: HERRAMIENTAS INTERACTIVAS ARQUITECTÓNICAS (ALTO UX/UI) -->
        <div class="barra__der">
          <!-- sofIA flotante disponible en esquina inferior -->

          <!-- BOTÓN MENÚ MÓVIL (TIPO CAJETÍN TÉCNICO) -->
          <button class="barra__boton-menu" id="btn-menu" type="button" aria-expanded="false" aria-controls="menu-navegacion" aria-label="Abrir menú de planos">
            <span class="barra__icono barra__icono--abrir" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </span>
            <span class="barra__icono barra__icono--cerrar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
          </button>
        </div>

      </div>

      <!-- REGLA / ESCALÍMETRO TÉCNICO CON LÁSER DINÁMICO DE SCROLL -->
      <div class="barra__escalimetro" id="barra-escalimetro" aria-hidden="true">
        <div class="escalimetro__marcas">
          <span class="escalimetro__marca">0.00m</span>
          <span class="escalimetro__tick"></span>
          <span class="escalimetro__marca">5.00m</span>
          <span class="escalimetro__tick"></span>
          <span class="escalimetro__marca">10.00m</span>
          <span class="escalimetro__tick"></span>
          <span class="escalimetro__marca">15.00m</span>
          <span class="escalimetro__tick"></span>
          <span class="escalimetro__marca">20.00m</span>
          <span class="escalimetro__tick"></span>
          <span class="escalimetro__marca">25.00m</span>
        </div>
        <div class="escalimetro__laser" id="escalimetro-laser"></div>
      </div>
    </header>

    <!-- CORTINA DE TRANSICIÓN: SHUTTER CAD ARQUITECTÓNICO & ESCANEO LÁSER -->
    <div class="cortina-plano cortina-obra" id="cortina-obra" aria-hidden="true">
      <div class="cortina-shutter__grid"></div>
      
      <!-- LÍNEA LÁSER DE ESCANEO HORIZONTAL -->
      <div class="cortina-shutter__laser">
        <span class="cortina-shutter__laser-haz"></span>
        <span class="cortina-shutter__laser-punto"></span>
      </div>

      <!-- HUD CENTRAL DE TELEMETRÍA TÉCNICA -->
      <div class="cortina-hud">
        <div class="cortina-hud__visor">
          <!-- RETÍCULA ÓPTICA DE PRECISIÓN CAD CON BRÚJULA -->
          <div class="cortina-hud__mira">
            <svg viewBox="0 0 100 100" fill="none" class="cortina-hud__svg-mira" aria-hidden="true">
              <circle cx="50" cy="50" r="44" stroke="rgba(1, 94, 151, 0.4)" stroke-width="1.2" stroke-dasharray="4 4" class="mira-rotar"/>
              <circle cx="50" cy="50" r="30" stroke="rgba(240, 154, 35, 0.6)" stroke-width="1.5"/>
              <line x1="50" y1="8" x2="50" y2="92" stroke="#015E97" stroke-width="1.5"/>
              <line x1="8" y1="50" x2="92" y2="50" stroke="#015E97" stroke-width="1.5"/>
              <circle cx="50" cy="50" r="4" fill="#F09A23"/>
              <!-- Marcas esquineras CAD -->
              <path d="M16 26 V16 H26 M74 16 H84 V26 M84 74 V84 H74 M26 84 H16 V74" stroke="#F1ECD6" stroke-width="1.8"/>
            </svg>
          </div>

          <!-- DATOS TÉCNICOS Y COTA -->
          <div class="cortina-hud__info">
            <div class="cortina-hud__tags">
              <span class="cortina-hud__badge">UNAL · FACULTAD DE ARQUITECTURA</span>
              <span class="cortina-hud__cota" id="cortina-cota">N.P.T. ±0.00m</span>
            </div>
            <h2 class="cortina-hud__titulo" id="cortina-titulo">REPLANTEANDO MÓDULO...</h2>
            <div class="cortina-hud__meta">
              <span>BLOQUE 24 · CAMPUS EL VOLADOR</span>
              <span class="cortina-hud__coords">06°15'44"N 75°34'38"W · ESC 1:50</span>
            </div>
          </div>
        </div>

        <!-- BARRA DE PROGRESO LÁSER RÁPIDA -->
        <div class="cortina-hud__barra-wrap">
          <div class="cortina-hud__barra" id="cortina-progreso"></div>
        </div>
      </div>
    </div>`;

  configurarMenuMovil();
  configurarNavegacionInteractiva();
}

function configurarMenuMovil() {
  const barra = $('#encabezado-barra');
  const btn = $('#btn-menu');
  const nav = $('#menu-navegacion');
  if (!barra || !btn || !nav) return;

  function toggleMenu(abrir) {
    const estaAbierto = abrir !== undefined ? abrir : !barra.classList.contains('is-menu-abierto');
    barra.classList.toggle('is-menu-abierto', estaAbierto);
    btn.setAttribute('aria-expanded', String(estaAbierto));
    btn.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (barra.classList.contains('is-menu-abierto') && !barra.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && barra.classList.contains('is-menu-abierto')) {
      toggleMenu(false);
      btn.focus();
    }
  });
}

function configurarNavegacionInteractiva() {
  const nav = $('#menu-navegacion');
  const glider = $('#nav-glider');
  const cortina = $('#cortina-obra');
  const cotaVal = $('#barra-cota-val');
  const actual = document.body.dataset.pagina;
  const pActual = PAGINAS.find(p => p.id === actual);
  const cotaPredeterminada = pActual ? 'N.P.T. ' + pActual.cota : 'N.P.T. ±0.00m';

  if (!nav || !glider) return;

  const enlaces = $$('.nav__enlace', nav);
  const enlaceActivo = nav.querySelector('.nav__enlace[aria-current="page"]');

  function moverGlider(enlace, animar = true) {
    if (!enlace || window.innerWidth <= 1040) {
      glider.style.opacity = '0';
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const linkRect = enlace.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    if (!animar) {
      glider.style.transition = 'none';
    } else {
      glider.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), width 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
    }

    glider.style.transform = `translate3d(${left}px, 0, 0)`;
    glider.style.width = `${width}px`;
    glider.style.opacity = '1';
  }

  // Posicionar glider inicialmente sobre la pestaña activa
  if (enlaceActivo) {
    setTimeout(() => moverGlider(enlaceActivo, false), 40);
  }

  enlaces.forEach((enlace) => {
    enlace.addEventListener('mouseenter', () => {
      moverGlider(enlace, true);
      if (cotaVal && enlace.dataset.cota) {
        cotaVal.textContent = 'N.P.T. ' + enlace.dataset.cota;
      }
    });
  });

  nav.addEventListener('mouseleave', () => {
    if (enlaceActivo) moverGlider(enlaceActivo, true);
    if (cotaVal) cotaVal.textContent = cotaPredeterminada;
  });

  window.addEventListener('resize', () => {
    if (enlaceActivo) moverGlider(enlaceActivo, false);
  }, { passive: true });

  // 1. Herramienta CAD: Alternar Grilla Milimétrica
  const btnToggleGrilla = $('#btn-toggle-grilla');
  if (btnToggleGrilla) {
    const estadoGuardado = localStorage.getItem('modo_grilla_cad');
    if (estadoGuardado === 'oculta') {
      document.body.classList.add('sin-grilla');
      btnToggleGrilla.classList.add('is-inactivo');
    }

    btnToggleGrilla.addEventListener('click', () => {
      const estaOculta = document.body.classList.toggle('sin-grilla');
      btnToggleGrilla.classList.toggle('is-inactivo', estaOculta);
      localStorage.setItem('modo_grilla_cad', estaOculta ? 'oculta' : 'visible');
    });
  }

  // 2. Herramienta CAD: Ciclo de Escalas Técnicas
  const btnEscala = $('#btn-escala-cad');
  const valEscala = $('#val-escala-cad');
  const ESCALAS = ['ESC 1:50', 'ESC 1:100', 'ESC 1:200', 'ESC 1:20'];
  let escalaIdx = 0;
  if (btnEscala && valEscala) {
    btnEscala.addEventListener('click', () => {
      escalaIdx = (escalaIdx + 1) % ESCALAS.length;
      valEscala.textContent = ESCALAS[escalaIdx];
      valEscala.classList.add('is-animando');
      setTimeout(() => valEscala.classList.remove('is-animando'), 200);
    });
  }

  // 3. Herramienta: Acceso Directo a sofIA
  const btnNavSofia = $('#btn-nav-sofia');
  if (btnNavSofia) {
    btnNavSofia.addEventListener('click', () => {
      if (window.sofIA && window.sofIA.abrir) {
        window.sofIA.abrir();
      } else {
        const burbuja = $('#sofia-burbuja') || $('#btn-hero-sofia');
        if (burbuja) burbuja.click();
      }
    });
  }

  // 4. Escalímetro Dinámico en Scroll
  const laserEscalimetro = $('#escalimetro-laser');
  if (laserEscalimetro) {
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        laserEscalimetro.style.transform = `scaleX(${pct})`;
      }
    }, { passive: true });
  }

  // 5. Atajos de Teclado Profesionales (1-6 para navegación, G para grilla, S para sofia)
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    const key = e.key.toLowerCase();

    if (key >= '1' && key <= '6') {
      const idx = parseInt(key, 10) - 1;
      if (PAGINAS[idx] && PAGINAS[idx].url !== window.location.pathname.split('/').pop()) {
        const link = nav.querySelector(`[data-id="${PAGINAS[idx].id}"]`);
        if (link) link.click();
      }
    } else if (key === 'g' && btnToggleGrilla) {
      btnToggleGrilla.click();
    } else if (key === 's' && btnNavSofia) {
      btnNavSofia.click();
    }
  });

  // 6. Transición constructiva de cambio de página (Sleek CAD Shutter)
  if (cortina) {
    // Failsafe de seguridad: Si la cortina queda visible por alguna razón, ocultarla a los 400ms
    setTimeout(() => {
      cortina.classList.remove('is-entrando');
    }, 400);

    // Si venimos de una transición previa, animar salida fluida
    if (sessionStorage.getItem('transicion_obra_activa')) {
      sessionStorage.removeItem('transicion_obra_activa');
      cortina.classList.add('is-revelando');
      setTimeout(() => {
        cortina.classList.remove('is-revelando');
      }, 260);
    }

    // Interceptar clics de navegación
    const todosEnlaces = [...enlaces, $('.barra__marca')].filter(Boolean);
    todosEnlaces.forEach((enlace) => {
      enlace.addEventListener('click', (e) => {
        // Permitir modificadores (abrir en pestaña nueva)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

        const href = enlace.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        // Si ya estamos en la página actual
        if (enlace.getAttribute('aria-current') === 'page') {
          e.preventDefault();
          enlace.classList.add('is-pulsando');
          setTimeout(() => enlace.classList.remove('is-pulsando'), 200);
          return;
        }

        e.preventDefault();

        // Actualizar textos técnicos de la cortina
        const titulo = enlace.dataset.titulo || 'MÓDULO';
        const cota = enlace.dataset.cota || '±0.00m';
        const cortinaTitulo = $('#cortina-titulo');
        const cortinaCota = $('#cortina-cota');

        if (cortinaTitulo) cortinaTitulo.textContent = `REPLANTEANDO · ${titulo.toUpperCase()}`;
        if (cortinaCota) cortinaCota.textContent = `N.P.T. ${cota}`;

        // Activar transición visual (ultra rápida y precisa)
        cortina.classList.add('is-entrando');
        sessionStorage.setItem('transicion_obra_activa', '1');

        moverGlider(enlace, true);

        // Navegación instantánea a los 190ms (cero lag, cero frustración)
        setTimeout(() => {
          window.location.href = href;
        }, 190);
      });
    });

    // Soporte para bfcache
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        cortina.classList.remove('is-entrando', 'is-revelando');
      }
    });
  }
}

/* ---------- Pie de página oficial ---------- */

function pintarPie() {
  const contenedorPie = $('#pie');
  if (!contenedorPie) return;

  contenedorPie.outerHTML = `
    <footer class="pie">
      <div class="pie__marca-central">
        <div class="pie__escudo">
          <img src="img/logo-arquitectura.svg" alt="Logo de Arquitectura" class="pie__escudo-img" width="70" height="70">
        </div>

        <div class="pie__pildoras-carrera">
          <a class="pie__pildora pie__pildora--wpp" href="https://whatsapp.com/channel/0029VbBtoCFBvvscToG1Yn0u" target="_blank" rel="noopener noreferrer" title="Canal Oficial de WhatsApp de Arquitectura">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
            <span>Canal Oficial WhatsApp</span>
          </a>
          <a class="pie__pildora pie__pildora--drive" href="https://drive.google.com/drive/folders/1VGnbVtYyd9x-ul9btdpgqwR2juEgQ9sO?usp=sharing" target="_blank" rel="noopener noreferrer" title="Carpeta de Recursos de Arquitectura en Google Drive">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M7.71 3.5L1.15 15l3.43 6 6.55-11.5M9.73 15L6.3 21h13.12l3.43-6M22.85 15l-6.57-11.5H9.71L16.27 15"/></svg>
            <span>Drive de Recursos</span>
          </a>
          <a class="pie__pildora pie__pildora--grupos" href="https://chat.whatsapp.com/LPBgvaI49rU6ep6v5ycufZ" target="_blank" rel="noopener noreferrer" title="Grupos y Capítulos Estudiantiles de Arquitectura">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>Grupos y Capítulos</span>
          </a>
        </div>

        <p class="pie__titulo-carrera"><strong>Arquitectura</strong> · Facultad de Arquitectura · Universidad Nacional de Colombia, Sede Medellín</p>
      </div>

      <!-- TRES TARJETICAS OFICIALES: REPRESENTACIÓN CARRERA, REPRESENTACIÓN FACULTAD Y DESARROLLO -->
      <div class="pie__tarjetas-grid pie__tarjetas-grid--tres">
        <!-- TARJETA 1: REPRESENTACIÓN ESTUDIANTIL DE ARQUITECTURA -->
        <div class="pie__tarjeta pie__tarjeta--representacion">
          <span class="pie__tarjeta-sub">REPRESENTACIÓN ESTUDIANTIL · ARQUITECTURA</span>
          <p class="pie__tarjeta-nombre"><strong>Juan Manuel Zapata Usma</strong> (Principal)<br><strong>Samuel Trejos Betancurt</strong> (Suplente)</p>
          <div class="pie__tarjeta-enlaces">
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573023268027" target="_blank" rel="noopener noreferrer" title="WhatsApp Juan Manuel Zapata">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>+57 302 326 8027</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573127430226" target="_blank" rel="noopener noreferrer" title="WhatsApp Samuel Trejos">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>+57 312 743 0226</span>
            </a>
          </div>
          <div class="pie__tarjeta-enlaces pie__tarjeta-enlaces--segunda">
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/aguacate._sideral/" target="_blank" rel="noopener noreferrer" title="Instagram Juan Manuel Zapata">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@aguacate._sideral</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/sambetancurt/" target="_blank" rel="noopener noreferrer" title="Instagram Samuel Trejos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@sambetancurt</span>
            </a>
          </div>
        </div>

        <!-- TARJETA 2: REPRESENTACIÓN ESTUDIANTIL DE FACULTAD -->
        <div class="pie__tarjeta pie__tarjeta--facultad">
          <span class="pie__tarjeta-sub">REPRESENTACIÓN · FACULTAD DE ARQUITECTURA</span>
          <p class="pie__tarjeta-nombre"><strong>Angélica Díaz López</strong> (Principal)<br><strong>Juan Pablo Marín Calderón</strong> (Suplente)</p>
          <div class="pie__tarjeta-enlaces">
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573193867283" target="_blank" rel="noopener noreferrer" title="WhatsApp Angélica Díaz">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>+57 319 386 7283</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573045680511" target="_blank" rel="noopener noreferrer" title="WhatsApp Juan Pablo Marín">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>+57 304 568 0511</span>
            </a>
          </div>
          <div class="pie__tarjeta-enlaces pie__tarjeta-enlaces--segunda">
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/dl_ang/" target="_blank" rel="noopener noreferrer" title="Instagram Angélica Díaz">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@dl_ang</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/troublep1/" target="_blank" rel="noopener noreferrer" title="Instagram Juan Pablo Marín">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@troublep1</span>
            </a>
          </div>
        </div>

        <!-- TARJETA 3: CREACIÓN Y DESARROLLO WEB -->
        <div class="pie__tarjeta pie__tarjeta--desarrollo">
          <span class="pie__tarjeta-sub">CREACIÓN Y DESARROLLO WEB</span>
          <p class="pie__tarjeta-nombre">Iniciativa y plataforma desarrollada por <strong>Santiago Escobar Arias</strong> · Representante de Sistemas</p>
          <div class="pie__tarjeta-enlaces">
            <a class="pie__enlace-contacto pie__enlace-contacto--wpp" href="https://wa.me/573123772091" target="_blank" rel="noopener noreferrer" title="WhatsApp Santiago Escobar">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              <span>(+57) 312 377 2091</span>
            </a>
            <a class="pie__enlace-contacto pie__enlace-contacto--correo" href="mailto:saescobara@unal.edu.co" title="Correo institucional Santiago Escobar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>saescobara@unal.edu.co</span>
            </a>
          </div>
          <div class="pie__tarjeta-enlaces pie__tarjeta-enlaces--segunda">
            <a class="pie__enlace-contacto pie__enlace-contacto--ig" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" title="Instagram Santiago Escobar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@s_escobar__</span>
            </a>
          </div>
        </div>
      </div>

      <div class="pie__legal">
        <p class="pie__legal-texto">Proyecto estudiantil sin ánimo de lucro · Iniciativa académica e informativa para la comunidad universitaria de la Universidad Nacional de Colombia — Sede Medellín.</p>
        <p class="pie__legal-aviso"><strong>Aviso de Propiedad Intelectual y Seguridad:</strong> El diseño, arquitectura de software, código fuente, experiencia de usuario (UX/UI), herramientas interactivas e imágenes de vista previa están protegidos por la Ley 23 de 1982, Decisión Andina 351 y Arts. 270 y 271 del Código Penal Colombiano. Queda prohibida la reproducción parcial o total, plagio, copia de funcionalidades o ingeniería inversa sin autorización previa y por escrito del autor. Los logotipos e identidad visual son obra de la representación estudiantil y su uso requiere autorización expresa de la misma. Cualquier intento de vulneración o alteración informática será sancionado conforme a la Ley 1273 de 2009 (Delitos Informáticos).</p>
        <p class="pie__copyright">© 2026 · Todos los derechos reservados.</p>
      </div>
    </footer>`;
}

/* ---------- Mensaje oficial de autor / Representación estudiantil ---------- */

function mostrarMensajeAutor() {
  if (sessionStorage.getItem('mensaje_representacion_cerrado') === '1') return;

  const toast = document.createElement('aside');
  toast.className = 'toast-autor';
  toast.id = 'toast-autor';
  toast.setAttribute('aria-label', 'Mensaje del creador del portal y representante estudiantil');

  toast.innerHTML = `
    <div class="toast-autor__tarjeta">
      <button class="toast-autor__cerrar" id="toast-autor-cerrar" type="button" aria-label="Cerrar mensaje">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="toast-autor__cabecera">
        <div class="toast-autor__avatar" aria-hidden="true">
          <img src="img/logo-arquitectura.svg" alt="Logo de Arquitectura" class="toast-autor__avatar-img">
        </div>
        <div class="toast-autor__titulos">
          <span class="toast-autor__nombre">Santiago Escobar Arias</span>
          <span class="toast-autor__cargo">REPRESENTANTE DE SISTEMAS · CREADOR DE LA WEB</span>
        </div>
      </div>

      <p class="toast-autor__mensaje">
        ¡Hola! Desarrollé este portal con el propósito de apoyar, guiar y facilitar la vida universitaria de todos los estudiantes de <strong>Arquitectura</strong>. Cuentan con mi total respaldo desde la representación estudiantil de Sistemas para seguir construyendo herramientas digitales que fortalezcan nuestra vida académica en la Facultad de Arquitectura y en la Sede Medellín.
      </p>

      <div class="toast-autor__pildoras">
        <a class="toast-autor__pildora toast-autor__pildora--wpp" href="https://wa.me/573123772091" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Santiago Escobar">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
          <span>(+57) 312 377 2091</span>
        </a>
        <a class="toast-autor__pildora toast-autor__pildora--ig" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Santiago Escobar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          <span>@s_escobar__</span>
        </a>
        <a class="toast-autor__pildora toast-autor__pildora--correo" href="mailto:saescobara@unal.edu.co" aria-label="Correo de Santiago Escobar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>saescobara@unal.edu.co</span>
        </a>
      </div>

      <button class="toast-autor__btn-ok" id="toast-autor-ok" type="button">¡ENTENDIDO!</button>
    </div>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('is-visible');
  }, 700);

  function cerrarToast() {
    toast.classList.remove('is-visible');
    toast.classList.add('is-hiding');
    sessionStorage.setItem('mensaje_representacion_cerrado', '1');
    sessionStorage.setItem('mensaje_autor_cerrado', '1');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }

  $('#toast-autor-cerrar', toast)?.addEventListener('click', cerrarToast);
  $('#toast-autor-ok', toast)?.addEventListener('click', cerrarToast);
}

// Inicialización única
pintarBarra();
pintarPie();
mostrarMensajeAutor();
