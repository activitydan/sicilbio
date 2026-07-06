import gsap from 'gsap';
import { prefersReducedMotion } from './motion-state.js';

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

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const pageReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener('load', r, { once: true }));

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
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.15
      });
    });
  });
}
