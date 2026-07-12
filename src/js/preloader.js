import gsap from 'gsap';
import { prefersReducedMotion } from './motion-state.js';
import { getLenis } from './lenis.js';

// Il preloader maschera il caricamento di font/asset e introduce il marchio
// con un piccolo rituale: evita il flash-of-unstyled-content e imposta il tono
// "premium" fin dal primo frame.
export function initPreloader() {
  return new Promise((resolve) => {
    const root = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const count = document.getElementById('preloader-count');

    if (!root) return resolve();

    if (prefersReducedMotion) {
      root.style.display = 'none';
      return resolve();
    }

    // Blocca lo scroll (nativo e Lenis) finché il preloader copre lo schermo:
    // evita che la pagina si sposti sotto l'overlay durante il caricamento.
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
    const unlockScroll = () => {
      document.body.style.overflow = '';
      getLenis()?.start();
    };

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    // Attende solo la foto hero (quella visibile subito dopo il preloader),
    // non l'intero window 'load': quest'ultimo include anche immagini più
    // pesanti e fuori schermo (Territorio, Chi siamo, ecc.), la cui
    // decodifica può ancora essere in corso proprio nel momento in cui parte
    // lo scivolamento del preloader, causando uno scatto visibile.
    const heroImg = document.querySelector('[data-hero-image] img');
    const pageReady = heroImg
      ? (heroImg.decode ? heroImg.decode().catch(() => {}) : new Promise((r) => {
          if (heroImg.complete) return r();
          heroImg.addEventListener('load', r, { once: true });
          heroImg.addEventListener('error', r, { once: true });
        }))
      : Promise.resolve();

    const counter = { value: 0 };
    const progressTween = gsap.to(counter, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counter.value);
        if (bar) bar.style.width = `${v}%`;
        if (count) count.textContent = `${v}%`;
      }
    });

    // Attende sia il tween minimo (percezione di cura) sia il reale caricamento
    Promise.all([fontsReady, pageReady, progressTween]).then(() => {
      const tl = gsap.timeline({ onComplete: () => { unlockScroll(); resolve(); } });
      tl.to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.15
      });
    });
  });
}
