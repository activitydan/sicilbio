import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTarget } from './lenis.js';

gsap.registerPlugin(ScrollTrigger);

export function initNav() {
  const header = document.getElementById('site-nav');
  if (!header) return;

  // Solidifica la nav dopo l'hero (leggibilità su sezioni chiare)
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { targets: header, className: 'is-solid' }
  });

  // Nasconde la nav quando si scorre verso il basso, la mostra risalendo
  // (riduce l'ingombro visivo durante la lettura, senza perdere l'accesso al menu)
  let lastY = window.scrollY;
  ScrollTrigger.create({
    start: 0,
    end: 99999,
    onUpdate: (self) => {
      const y = window.scrollY;
      const goingDown = self.direction === 1;
      if (goingDown && y > 160) {
        header.style.transform = 'translateY(-110%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastY = y;
    }
  });

  // Smooth-scroll per i link ancora della nav (via Lenis)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return; // ignora i placeholder "#" (es. social non ancora collegati)
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      closeMobileMenu();
    });
  });

  initMobileMenu();
}

function initMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  if (!menu || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    menu.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.style.transform = 'translateY(-100%)';
  document.body.style.overflow = '';
}
