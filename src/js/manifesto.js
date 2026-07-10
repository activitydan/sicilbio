import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Il manifesto va letto al ritmo dello scroll, non a colpo d'occhio:
// ogni riga si "accende" mentre l'utente avanza, imponendo una pausa
// percettiva sul valore (pazienza, tempo naturale) prima di proseguire.
export function initManifesto() {
  const section = document.getElementById('manifesto');
  const lines = gsap.utils.toArray('[data-manifesto-text] [data-line]');
  if (!section || !lines.length) return;

  if (prefersReducedMotion) {
    gsap.set(lines, { opacity: 1 });
    return;
  }

  gsap.set(lines, { opacity: 0.15 });

  gsap.to(lines, {
    opacity: 1,
    stagger: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=120%',
      scrub: 0.4,
      pin: true
    }
  });
}
