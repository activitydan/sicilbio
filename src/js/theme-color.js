// Su mobile il browser colora la barra di stato/URL con <meta name="theme-color">.
// Il sito alterna sezioni chiare e scure: un colore fisso crea una cucitura
// visibile al confine tra la barra di sistema e il contenuto quando si scorre
// su una sezione con sfondo diverso. Qui si aggiorna il meta tag in tempo
// reale in base a cosa si trova effettivamente sotto il bordo superiore
// dello schermo — elementFromPoint dà una risposta univoca, senza le
// ambiguità di soglia di un IntersectionObserver su un'area quasi nulla.
export function initThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta || !document.querySelector('[data-theme-color]')) return;

  let current = null;
  let ticking = false;

  const update = () => {
    ticking = false;
    // elementsFromPoint (non elementFromPoint) perché il primo elemento in
    // quel punto è quasi sempre la nav fissa in alto: bisogna scavalcarla
    // per arrivare alla sezione di pagina effettivamente sotto di essa.
    const stack = document.elementsFromPoint(window.innerWidth / 2, 1);
    const section = stack.map((el) => el.closest('[data-theme-color]')).find(Boolean);
    if (!section) return;
    const color = section.dataset.themeColor;
    if (color !== current) {
      current = color;
      meta.setAttribute('content', color);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}
