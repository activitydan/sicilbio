import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Le statistiche prendono peso percettivo solo quando entrano in vista:
// il conteggio comunica un dato reale, non è decorazione.
export function initCounters() {
  const counters = gsap.utils.toArray('[data-counter]');

  counters.forEach((el) => {
    const target = parseFloat(el.dataset.target || '0');

    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const proxy = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(proxy.value);
          }
        });
      }
    });
  });
}
