import gsap from 'gsap';
import { prefersReducedMotion } from './motion-state.js';

// Movimento costante = metafora di ritmo produttivo continuo (semina -> raccolta -> tavola).
// Il contenuto è duplicato nel markup per un loop perfetto a -50%.
export function initMarquee() {
  const track = document.querySelector('[data-marquee]');
  if (!track) return;

  if (prefersReducedMotion) return;

  const tween = gsap.to(track, {
    xPercent: -50,
    duration: 22,
    ease: 'none',
    repeat: -1
  });

  track.addEventListener('mouseenter', () => tween.timeScale(0.25));
  track.addEventListener('mouseleave', () => tween.timeScale(1));
}
