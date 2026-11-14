const fs = require('fs');

let js = fs.readFileSync('js/comun.js', 'utf8');

const oldCortinaStart = '    <!-- CORTINA DE REPLANTEO Y TRANSICIÓN CONSTRUCTIVA -->';
const oldCortinaEnd = '    </div>`;\n\n  configurarMenuMovil();';

const idxStart = js.indexOf(oldCortinaStart);
const idxEnd = js.indexOf(oldCortinaEnd);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Could not find cortina block in js/comun.js', { idxStart, idxEnd });
  process.exit(1);
}

const newCortinaHtml = `    <!-- CORTINA DE TRANSICIÓN: CASA ARQUITECTÓNICA 3D ARMÁNDOSE EN VIVO -->
    <div class="cortina-plano cortina-obra" id="cortina-obra" aria-hidden="true">
      <div class="cortina-plano__grid"></div>
      
      <div class="cortina-plano__viewport">
        <!-- MAQUETA 3D WIREFRAME DE LA CASA PROYECTUAL ARMÁNDOSE -->
        <div class="cortina-plano__dibujo-wrap">
          <svg class="casa-transicion-svg" viewBox="0 0 540 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Retícula milimétrica de replanteo -->
            <g stroke="#015E97" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.45">
              <line x1="30" y1="260" x2="510" y2="260" />
              <line x1="60" y1="290" x2="270" y2="180" />
              <line x1="480" y1="290" x2="270" y2="180" />
            </g>

            <!-- 1. Platea de Cimentación en Isometría 3D -->
            <polygon class="casa-anim__platea" points="270,290 460,200 270,110 80,200" fill="rgba(19, 42, 73, 0.75)" stroke="#015E97" stroke-width="2" />
            
            <!-- 2. Columnas y Pórticos Estructurales en Naranja -->
            <line class="casa-anim__columna" x1="140" y1="210" x2="140" y2="110" stroke="#F09A23" stroke-width="3.5" stroke-linecap="round" />
            <line class="casa-anim__columna" x1="270" y1="275" x2="270" y2="165" stroke="#F09A23" stroke-width="4" stroke-linecap="round" />
            <line class="casa-anim__columna" x1="400" y1="210" x2="400" y2="110" stroke="#F09A23" stroke-width="3.5" stroke-linecap="round" />

            <!-- 3. Muros de Planta Baja en Amarillo Claro y Celeste -->
            <polygon class="casa-anim__pared-izq1" points="140,210 270,275 270,175 140,110" fill="rgba(1, 94, 151, 0.25)" stroke="#F1ECD6" stroke-width="2.5" />
            <polygon class="casa-anim__pared-der1" points="270,275 400,210 400,110 270,175" fill="rgba(19, 42, 73, 0.7)" stroke="#F1ECD6" stroke-width="2.5" />

            <!-- Puerta de Acceso Principal -->
            <polygon points="290,265 330,245 330,195 290,215" fill="rgba(240, 154, 35, 0.35)" stroke="#F09A23" stroke-width="1.8" />

            <!-- 4. Losa de Entrepiso en Voladizo Moderno -->
            <polygon class="casa-anim__losa" points="270,165 435,80 265,0 100,80" fill="rgba(240, 154, 35, 0.3)" stroke="#F09A23" stroke-width="3" />

            <!-- 5. Volumen Superior Flotante (Planta Alta) -->
            <polygon class="casa-anim__vol-izq2" points="120,90 265,165 265,75 120,5" fill="rgba(1, 94, 151, 0.4)" stroke="#F1ECD6" stroke-width="2.5" />
            <polygon class="casa-anim__vol-der2" points="265,165 410,90 410,10 265,75" fill="rgba(19, 42, 73, 0.6)" stroke="#F1ECD6" stroke-width="2.5" />

            <!-- Ventanal Panorámico de Piso a Techo con Parteluces -->
            <polygon class="casa-anim__vidrio" points="135,82 250,142 250,88 135,28" fill="rgba(1, 94, 151, 0.55)" stroke="#015E97" stroke-width="2" />
            <line class="casa-anim__vidrio-parteluz" x1="192" y1="112" x2="192" y2="58" stroke="#015E97" stroke-width="1.5" />

            <!-- 6. Cubierta Inclinada Volada (Techo Modernista Escultórico) -->
            <polygon class="casa-anim__techo" points="265,60 440,-25 265,-95 90,-15" fill="rgba(241, 236, 214, 0.35)" stroke="#F09A23" stroke-width="3.5" />

            <!-- 7. Árbol Arquitectónico en Alzado -->
            <g class="casa-anim__arbol">
              <line x1="80" y1="200" x2="80" y2="135" stroke="#F09A23" stroke-width="2.2" stroke-linecap="round" />
              <circle cx="80" cy="125" r="20" fill="rgba(1, 94, 151, 0.35)" stroke="#015E97" stroke-width="2" />
              <circle cx="80" cy="125" r="13" fill="none" stroke="#F1ECD6" stroke-width="1" stroke-dasharray="3 3" />
            </g>

            <!-- 8. Cotas de Nivel y Acotamiento en Rojo -->
            <g class="casa-anim__cotas">
              <line x1="45" y1="200" x2="45" y2="15" stroke="#E1432A" stroke-width="1.2" />
              <line x1="38" y1="200" x2="52" y2="200" stroke="#E1432A" stroke-width="1.5" />
              <line x1="38" y1="15" x2="52" y2="15" stroke="#E1432A" stroke-width="1.5" />
              <text x="32" y="110" fill="#E1432A" font-size="11" font-family="'Plus Jakarta Sans', monospace" font-weight="700" text-anchor="end">H: 7.20m</text>

              <polygon points="270,300 262,312 278,312" fill="#E1432A" />
              <text x="270" y="325" fill="#E1432A" font-size="10.5" font-family="'Plus Jakarta Sans', monospace" font-weight="700" text-anchor="middle">N.P.T. ±0.00m</text>
            </g>
          </svg>
        </div>

        <!-- CAJETÍN TÉCNICO INFORMATIVO DE TRANSICIÓN -->
        <div class="cortina-plano__cajetin">
          <div class="cortina-plano__cabecera">
            <span class="cortina-plano__badge">ARQUITECTURA UNAL · BLOQUE 24</span>
            <span class="cortina-plano__escala">ISOMETRÍA 3D · ESC 1:50 · <span id="cortina-cota">N.P.T. ±0.00m</span></span>
          </div>
          <h2 class="cortina-plano__titulo" id="cortina-titulo">TRAZANDO PROYECTO...</h2>
          <div class="cortina-plano__subtitulo">
            <span>CASA TALLER PROYECTUAL · VALLE DE ABURRÁ</span>
          </div>
          <div class="cortina-plano__progreso">
            <span class="cortina-plano__barra"></span>
          </div>
        </div>
      </div>
    </div>\`;\n\n  configurarMenuMovil();`;

js = js.substring(0, idxStart) + newCortinaHtml + js.substring(idxEnd + oldCortinaEnd.length);

// Also verify navigation interception
js = js.replace(
  `        const cortinaTitulo = $('#cortina-titulo');
        const cortinaCota = $('#cortina-cota');

        if (cortinaTitulo) cortinaTitulo.textContent = \`REPLANTEANDO · \${titulo.toUpperCase()}\`;
        if (cortinaCota) cortinaCota.textContent = \`N.P.T. \${cota}\`;`,
  `        const cortinaTitulo = $('#cortina-titulo');
        const cortinaCota = $('#cortina-cota');

        if (cortinaTitulo) cortinaTitulo.textContent = \`PROYECTANDO · \${titulo.toUpperCase()}\`;
        if (cortinaCota) cortinaCota.textContent = \`N.P.T. \${cota}\`;`
);

fs.writeFileSync('js/comun.js', js, 'utf8');
console.log('Successfully updated js/comun.js with 3D House Wireframe Transition.');
