const fs = require('fs');

const orig = fs.readFileSync('../construcción/css/base.css', 'utf8');
const curr = fs.readFileSync('css/base.css', 'utf8');

// 1. Keep the variables and photos from current base.css (lines 1 to ~145)
const headerMarker = '/* ---------- 3. Barra Superior y Navegación Arquitectónica';
const currHeaderIndex = curr.indexOf('/* ---------- 3.');
const baseHeaderPart = curr.slice(0, currHeaderIndex);

// 2. The new streamlined, non-cluttered Navbar CSS (No icon overload, no overflow, clean typography)
const cleanNavbarCSS = `/* ---------- 3. Barra Superior y Navegación Arquitectónica (Dock Limpio y Elegante) ---------- */

.barra {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(19, 42, 73, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(1, 94, 151, 0.3);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
}

.barra__contenido {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 62px;
}

/* MARCA OFICIAL IZQUIERDA */
.barra__marca {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.barra__marca:hover {
  transform: translateY(-1px);
}

.barra__escudo-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.barra__escudo-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  padding: 0;
  background: #ffffff;
  border: 2px solid var(--naranja);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.barra__marca:hover .barra__escudo-img {
  transform: scale(1.06);
}

.barra__texto {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.barra__carrera-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.barra__carrera {
  font-family: var(--letra-titulo);
  font-size: 15.5px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.1;
}

.barra__acuerdo-pill {
  font-family: var(--letra-universidad);
  font-size: 9px;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(240, 154, 35, 0.2);
  border: 1px solid rgba(240, 154, 35, 0.5);
  color: var(--naranja);
  letter-spacing: .08em;
}

.barra__facultad {
  font-family: var(--letra-universidad);
  font-size: 10px;
  letter-spacing: .03em;
  color: rgba(241, 236, 214, 0.82);
  font-weight: 500;
}

/* NAVEGACIÓN CENTRAL: DOCK TIPOGRÁFICO LIMPIO (SIN SOBRECARGA DE ÍCONOS) */
.nav--dock {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  background: rgba(11, 26, 46, 0.7);
  border-radius: 999px;
  border: 1px solid rgba(1, 94, 151, 0.35);
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3);
}

.nav__glider {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 0;
  width: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--celeste-vivido) 0%, #004570 100%);
  border: 1px solid rgba(241, 236, 214, 0.5);
  box-shadow: 0 4px 14px -2px rgba(1, 94, 151, 0.7);
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}

.nav__enlace {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  text-decoration: none;
  color: rgba(241, 236, 214, 0.88);
  font-family: var(--letra-universidad);
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.15s ease, transform 0.12s ease;
  user-select: none;
}

.nav__enlace:hover {
  color: #ffffff;
}

.nav__enlace[aria-current="page"],
.nav__enlace.is-activo {
  color: #ffffff;
  font-weight: 700;
}

.nav__enlace:focus-visible {
  outline: 2px solid var(--naranja);
  outline-offset: 2px;
}

/* ZONA DERECHA: Botón sofIA + Menú Móvil */
.barra__der {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.barra__sofia-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--naranja) 0%, #d87c0a 100%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  font-family: var(--letra-universidad);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .05em;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(240, 154, 35, 0.4);
  transition: all 0.2s ease;
  user-select: none;
}

.barra__sofia-btn:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 6px 18px rgba(240, 154, 35, 0.6);
}

.barra__sofia-radar {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 6px #ffffff;
  animation: radarPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes radarPing {
  0% { transform: scale(0.8); opacity: 0.8; }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.8; }
}

.barra__boton-menu {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(241, 236, 214, 0.3);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.barra__boton-menu:hover {
  background: rgba(1, 94, 151, 0.4);
  border-color: var(--celeste-vivido);
}

.barra__icono {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.barra__icono svg { width: 18px; height: 18px; }
.barra__icono--cerrar { display: none; }

.barra.is-menu-abierto .barra__boton-menu {
  background: var(--rojo);
  border-color: var(--rojo);
  color: #ffffff;
}
.barra.is-menu-abierto .barra__icono--abrir { display: none; }
.barra.is-menu-abierto .barra__icono--cerrar { display: flex; }

/* REGLA LÁSER INFERIOR ELEGANTE */
.barra__escalimetro {
  position: relative;
  width: 100%;
  height: 2px;
  background: rgba(1, 94, 151, 0.2);
  overflow: hidden;
}

.escalimetro__laser {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--celeste-vivido) 40%, var(--naranja) 95%, #ffffff 100%);
  transform-origin: left;
  transform: scaleX(0);
  pointer-events: none;
  box-shadow: 0 0 6px var(--naranja);
  transition: transform 0.1s linear;
}

/* =========================================================
   CORTINA DE TRANSICIÓN: SHUTTER CAD ARQUITECTÓNICO & ESCANEO LÁSER
   ========================================================= */

.cortina-obra,
.cortina-plano {
  position: fixed;
  inset: 0;
  z-index: 99999;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  background: rgba(11, 26, 46, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.16s ease, visibility 0.16s ease;
}

.cortina-shutter__grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(1, 94, 151, 0.22) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(1, 94, 151, 0.22) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
  opacity: 0.8;
}

.cortina-shutter__laser {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  transform: translateY(-50%);
  pointer-events: none;
}

.cortina-shutter__laser-haz {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(1, 94, 151, 0.6) 30%, var(--naranja) 70%, #ffffff 90%, transparent 100%);
  box-shadow: 0 0 16px var(--naranja);
  transform: translateX(-100%);
}

.cortina-obra.is-entrando .cortina-shutter__laser-haz {
  animation: barridoLaserShutter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes barridoLaserShutter {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.cortina-hud {
  position: relative;
  z-index: 10;
  width: min(500px, 90vw);
  background: rgba(19, 42, 73, 0.96);
  border: 1.5px solid var(--celeste-vivido);
  border-radius: 20px;
  padding: 24px 28px 20px;
  box-shadow: 0 24px 60px -10px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease;
}

.cortina-obra.is-entrando .cortina-hud {
  transform: scale(1);
  opacity: 1;
}

.cortina-hud__visor {
  display: flex;
  align-items: center;
  gap: 18px;
}

.cortina-hud__mira {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}
.cortina-hud__svg-mira {
  width: 100%;
  height: 100%;
}
.mira-rotar {
  transform-origin: 50px 50px;
  animation: girarReticula 3s linear infinite;
}
@keyframes girarReticula {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cortina-hud__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.cortina-hud__tags {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.cortina-hud__badge {
  font-family: var(--letra-universidad);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--naranja);
}

.cortina-hud__cota {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--amarillo-claro);
  background: rgba(1, 94, 151, 0.25);
  border: 1px solid rgba(1, 94, 151, 0.5);
  padding: 2px 7px;
  border-radius: 6px;
}

.cortina-hud__titulo {
  font-family: var(--letra-titulo);
  font-size: clamp(16px, 3.2vw, 19px);
  font-weight: 800;
  color: #ffffff;
  margin: 2px 0 0;
  letter-spacing: -.01em;
}

.cortina-hud__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-family: var(--letra-universidad);
  font-size: 11px;
  color: rgba(241, 236, 214, 0.75);
}

.cortina-hud__coords {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 10px;
  color: var(--celeste-vivido);
}

.cortina-hud__barra-wrap {
  width: 100%;
  height: 4px;
  background: rgba(241, 236, 214, 0.12);
  border-radius: 999px;
  overflow: hidden;
}

.cortina-hud__barra {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, var(--celeste-vivido), var(--naranja), #ffffff);
  transform-origin: left;
  transform: scaleX(0);
}

.cortina-obra.is-entrando .cortina-hud__barra {
  animation: progresoShutter 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes progresoShutter {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

.cortina-obra.is-entrando {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.cortina-obra.is-revelando {
  opacity: 1;
  visibility: visible;
  animation: desvanecerShutter 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes desvanecerShutter {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.02); visibility: hidden; }
}
`;

// 3. Take lines 733 to 1625 from original construction base.css and adapt to official Arquitectura palette
const origLines = orig.split('\n');
const origRest = origLines.slice(732).join('\n');

// Clean replacements from old terracotta / concrete colors to official Arquitectura colors
let cleanRest = origRest
  .replace(/rgba\(75, 64, 56, [^)]+\)/g, 'rgba(19, 42, 73, 0.92)')
  .replace(/rgba\(45, 30, 20, [^)]+\)/g, 'rgba(19, 42, 73, 0.4)')
  .replace(/var\(--madera\)/g, 'var(--celeste-vivido)')
  .replace(/var\(--tierra\)/g, 'var(--naranja)')
  .replace(/var\(--arcilla\)/g, 'var(--naranja)')
  .replace(/var\(--oliva\)/g, 'var(--celeste-vivido)')
  .replace(/var\(--carbon\)/g, 'var(--azul-oscuro)')
  .replace(/var\(--cafe-profundo\)/g, 'var(--azul-oscuro)')
  .replace(/var\(--arena\)/g, 'var(--naranja)')
  .replace(/var\(--arena-lino\)/g, 'var(--amarillo-claro)')
  .replace(/var\(--marfil\)/g, 'var(--amarillo-claro)')
  .replace(/var\(--verde-bosque\)/g, 'var(--azul-oscuro)')
  .replace(/var\(--turquesa\)/g, 'var(--celeste-vivido)');

// Ensure .pie cards have crisp, distinct borders
cleanRest = cleanRest.replace(
  '.pie__tarjeta--representacion {\\n  border-top: 4px solid var(--oliva);\\n}',
  '.pie__tarjeta--representacion {\\n  border-top: 4px solid var(--naranja);\\n}'
);

const fullNewCSS = baseHeaderPart + cleanNavbarCSS + '\n' + cleanRest;

fs.writeFileSync('css/base.css', fullNewCSS, 'utf8');
console.log('Successfully restored base.css with full Sections 4-9 and clean navbar!');
