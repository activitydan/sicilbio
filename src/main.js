import './css/main.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createIcons,
  Menu, X, ArrowUpRight, Image, ArrowDown, ChevronDown, Sun, Wind, Droplets,
  Mountain, Sprout, Shovel, Leaf, Hand, PackageCheck, Video, BadgeCheck,
  HandHeart, ScanLine, Instagram, Facebook, MapPin, Mail, Phone, ArrowUp
} from 'lucide';

import { initLenis, scrollToTarget } from './js/lenis.js';
import { initPreloader } from './js/preloader.js';
import { initNav } from './js/nav.js';
import { playHeroIntro, initHeroScroll } from './js/hero.js';
import { initMarquee } from './js/marquee.js';
import { initReveal } from './js/reveal.js';
import { initCounters } from './js/counters.js';
import { initMagnetic } from './js/magnetic.js';
import { initManifesto } from './js/manifesto.js';
import { initTerritorio } from './js/territorio.js';
import { initFiliera } from './js/filiera.js';
import { initVarietaTilt } from './js/varieta.js';
import { initFreschezza } from './js/freschezza.js';

gsap.registerPlugin(ScrollTrigger);

createIcons({
  icons: {
    Menu, X, ArrowUpRight, Image, ArrowDown, ChevronDown, Sun, Wind, Droplets,
    Mountain, Sprout, Shovel, Leaf, Hand, PackageCheck, Video, BadgeCheck,
    HandHeart, ScanLine, Instagram, Facebook, MapPin, Mail, Phone, ArrowUp
  }
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const backToTop = document.getElementById('back-to-top');
backToTop?.addEventListener('click', () => scrollToTarget(0));

initLenis();

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
  initFiliera();
  initVarietaTilt();
  initFreschezza();

  ScrollTrigger.refresh();
});
