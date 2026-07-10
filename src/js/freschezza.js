import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Il claim si compone parola per parola: enfatizza "24 ore" come
// climax della sezione dedicata alla freschezza del prodotto.
export function initFreschezza() {
  const words = gsap.utils.toArray('[data-freschezza-claim] [data-word]');
  const bg = document.querySelector('[data-freschezza-bg] .asset-placeholder, [data-freschezza-bg] img, [data-freschezza-bg] video');
  if (!words.length) return;

  if (prefersReducedMotion) {
    gsap.set(words, { opacity: 1, y: 0 });
    return;
  }

  gsap.set(words, { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: '#freschezza',
    start: 'top 60%',
    once: true,
    onEnter: () => gsap.to(words, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
  });

  if (bg) {
    gsap.fromTo(
      bg,
      { scale: 1.15 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#freschezza', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  }
}
