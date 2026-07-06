import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// La filiera si legge come un percorso: lo scroll verticale si traduce in
// avanzamento orizzontale lungo gli step del processo produttivo.
// Su mobile lo scroll orizzontale pinnato è una cattiva UX (conflitti touch),
// quindi la track torna a un elenco verticale con reveal semplice.
export function initFiliera() {
  const pinWrap = document.querySelector('[data-filiera-pin]');
  const track = document.querySelector('[data-filiera-track]');
  const cards = gsap.utils.toArray('.filiera-card');
  if (!pinWrap || !track || !cards.length) return;

  if (prefersReducedMotion) {
    gsap.set(cards, { opacity: 1, y: 0 });
    return;
  }

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    gsap.set(cards, { opacity: 0.4, scale: 0.94 });

    const scrollTween = gsap.to(track, {
      x: () => -(track.scrollWidth - track.parentElement.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrap,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });

    cards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left 78%',
          end: 'left 30%',
          scrub: true
        }
      });
    });

    return () => scrollTween.scrollTrigger?.kill();
  });

  mm.add('(max-width: 767px)', () => {
    gsap.set(cards, { opacity: 0, y: 28 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    });
  });
}
