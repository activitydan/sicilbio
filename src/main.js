import './css/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createIcons,
  Menu, X, ArrowUpRight, ArrowDown, ChevronDown, Sun, Wind, Droplets,
  Mountain, Sprout, HandHeart, ScanLine, Instagram, Facebook, MapPin, Mail, Phone, ArrowUp
} from 'lucide';

import { initLenis, scrollToTarget } from './js/lenis.js';
import { initPreloader } from './js/preloader.js';
import { initNav } from './js/nav.js';
import { prepareHeroIntro, playHeroIntro, initHeroScroll } from './js/hero.js';
import { initMarquee } from './js/marquee.js';
import { initReveal } from './js/reveal.js';
import { initCounters } from './js/counters.js';
import { initMagnetic } from './js/magnetic.js';
import { initManifesto } from './js/manifesto.js';
import { initTerritorio } from './js/territorio.js';
import { initVarietaTilt } from './js/varieta.js';
import { initFreschezza } from './js/freschezza.js';
import { initThemeColor } from './js/theme-color.js';

gsap.registerPlugin(ScrollTrigger);

createIcons({
  icons: {
    Menu, X, ArrowUpRight, ArrowDown, ChevronDown, Sun, Wind, Droplets,
    Mountain, Sprout, HandHeart, ScanLine, Instagram, Facebook, MapPin, Mail, Phone, ArrowUp
  }
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const backToTop = document.getElementById('back-to-top');
backToTop?.addEventListener('click', () => scrollToTarget(0));

initLenis();

// Nasconde subito il testo hero, prima che il preloader inizi a scorrere via:
// evita che resti visibile "fermo" durante lo scivolamento e poi scatti
// indietro per rifare l'animazione (vedi commento in hero.js).
prepareHeroIntro();

initPreloader().then(() => {
  playHeroIntro();
  initNav();
  initHeroScroll();
  initReveal();
  initCounters();
  initMarquee();
  initMagnetic();
  initManifesto();
  initTerritorio();
  initVarietaTilt();
  initFreschezza();
  initThemeColor();

  ScrollTrigger.refresh();
});
