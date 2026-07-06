import gsap from 'gsap';
import { prefersReducedMotion } from './motion-state.js';

// Micro-interazione (hover.dev style): il bottone segue leggermente il cursore,
// rinforzando l'invito a cliccare sui due CTA principali del sito.
export function initMagnetic() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const strength = 0.35;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
  });
}
