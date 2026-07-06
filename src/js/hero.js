import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion-state.js';

gsap.registerPlugin(ScrollTrigger);

// Timeline d'ingresso dell'hero: eseguita una sola volta, subito dopo il preloader.
// Le righe del titolo entrano mascherate (clip via overflow-hidden sul parent),
// per un reveal tipografico pulito e non decorativo.
export function playHeroIntro() {
  const lines = gsap.utils.toArray('[data-hero-line] > span');
  const fadeEls = gsap.utils.toArray('[data-hero-fade]');
  const heroImage = document.querySelector('[data-hero-image] .asset-placeholder, [data-hero-image] img, [data-hero-image] video');
  const cue = document.querySelector('[data-scroll-cue]');

  if (prefersReducedMotion) {
    gsap.set([...lines, ...fadeEls], { opacity: 1, y: 0 });
    return;
  }

  gsap.set(lines, { yPercent: 110 });
  gsap.set(fadeEls, { opacity: 0, y: 24 });
  if (heroImage) gsap.set(heroImage, { scale: 1.12 });
  if (cue) gsap.set(cue, { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  if (heroImage) {
    tl.to(heroImage, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0);
  }

  tl.to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.15)
    .to(fadeEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.7);

  if (cue) {
    gsap.to(cue, { opacity: 1, duration: 0.6, delay: 1.4 });
    gsap.to(cue.querySelector('svg'), {
      y: 6,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.4
    });
  }
}

// Parallax + dissolvenza in uscita: rinforza la profondità cinematografica
// e libera lo sguardo verso la sezione successiva.
export function initHeroScroll() {
  const hero = document.getElementById('hero');
  const heroImage = document.querySelector('[data-hero-image] .asset-placeholder, [data-hero-image] img, [data-hero-image] video');
  const content = hero?.querySelector('.container-edit');
  if (!hero || prefersReducedMotion) return;

  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  if (content) {
    gsap.to(content, {
      opacity: 0,
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: '20% top', end: 'bottom top', scrub: true }
    });
  }
}
