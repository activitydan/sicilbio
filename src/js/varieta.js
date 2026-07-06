import gsap from 'gsap';
import { prefersReducedMotion } from './motion-state.js';

// Tilt 3D leggero (hover.dev style): la card segue il cursore per dare
// peso fisico al bento grid delle varietà, senza esagerare l'effetto.
// Il reveal in ingresso delle card è già gestito da [data-reveal] (reveal.js).
export function initVarietaTilt() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.variety-card').forEach((card) => {
    const strength = 8;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateX: -py * strength,
        rotateY: px * strength,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 1200
      });
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}
