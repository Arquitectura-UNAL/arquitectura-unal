/* =========================================================
   CALMA · divulgación progresiva
   El contenido se carga por JS, así que observamos la página y, cuando
   aparecen bloques largos, los dejamos cerrados con un botón para abrirlos.
   No cambia datos ni textos: solo decide qué se ve primero.
   ========================================================= */
(function () {
  'use strict';

  const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  let contador = 0;

  /* Crea un botón que muestra/oculta un conjunto de elementos */
  function alternador(destinos, textoAbrir, textoCerrar, colocarDespuesDe) {
    const id = 'calma-' + (++contador);
    destinos.forEach((el) => { el.classList.add('calma-oculto'); el.dataset.calma = id; });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'calma-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `<span>${textoAbrir}</span>${FLECHA}`;
    btn.addEventListener('click', () => {
      const abierto = btn.getAttribute('aria-expanded') === 'true';
      destinos.forEach((el) => el.classList.toggle('calma-oculto', abierto));
      btn.setAttribute('aria-expanded', String(!abierto));
      btn.firstElementChild.textContent = abierto ? textoAbrir : textoCerrar;
    });
    colocarDespuesDe.insertAdjacentElement('afterend', btn);
  }

  /* Grupos y semilleros: primero quién es, luego el detalle */
  function calmarGrupos(raiz) {
    raiz.querySelectorAll('.grupo-card:not([data-calma-ok])').forEach((card) => {
      card.dataset.calmaOk = '1';
      const extra = [...card.querySelectorAll('.grupo-card__lineas-box, .grupo-card__acciones')];
      const ancla = card.querySelector('.grupo-card__descripcion');
      if (extra.length && ancla) {
        alternador(extra, 'Ver líneas de trabajo y contacto', 'Ver menos', ancla);
      }
    });
  }

  /* Fuentes oficiales: un renglón que se abre */
  function calmarFuentes(raiz) {
    raiz.querySelectorAll('p.fuentes:not([data-calma-ok])').forEach((p) => {
      p.dataset.calmaOk = '1';
      const det = document.createElement('details');
      det.className = 'calma-fuentes';
      const sum = document.createElement('summary');
      sum.textContent = 'Fuentes oficiales';
      p.parentNode.insertBefore(det, p);
      det.append(sum, p);
    });
  }

  function aplicar(raiz) {
    calmarGrupos(raiz);
    calmarFuentes(raiz);
  }

  function iniciar() {
    aplicar(document);
    let pendiente = false;
    new MutationObserver(() => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => { pendiente = false; aplicar(document); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
