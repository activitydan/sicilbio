import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Reveal generico riutilizzabile su qualunque blocco marcato [data-reveal]:
// evita di duplicare la stessa timeline in ogni sezione.
export function initReveal() {
  const els = gsap.utils.toArray('[data-reveal]');
  if (!els.length) return;

  if (prefersReducedMotion) {
    gsap.set(els, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(els, { opacity: 0, y: 36 });

  ScrollTrigger.batch(els, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12
      })
  });
}
