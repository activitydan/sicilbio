import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Sezione "sticky" via CSS: qui gestiamo solo il parallax dello sfondo
// e la comparsa progressiva delle card clima, sincronizzati con lo
// scroll reale della sezione (non con un pin GSAP, per restare leggeri).
export function initTerritorio() {
  const section = document.getElementById('territorio');
  const bg = document.querySelector('[data-territorio-bg] .asset-placeholder, [data-territorio-bg] img, [data-territorio-bg] video');
  const cards = gsap.utils.toArray('[data-territorio-card]');
  if (!section) return;

  if (prefersReducedMotion) {
    gsap.set(cards, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 28 });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6
      }
    });

    if (bg) tl.fromTo(bg, { scale: 1.18 }, { scale: 1, ease: 'none' }, 0);
    tl.to(cards, { opacity: 1, y: 0, stagger: 0.5, ease: 'none' }, 0);
  });

  mm.add('(max-width: 767px)', () => {
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    });
  });
}
