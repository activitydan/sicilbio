import { translations, languages } from '../i18n/index.js';

const STORAGE_KEY = 'sicilbio-lang';
const DEFAULT_LANG = 'it';

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) return saved;
  return DEFAULT_LANG;
}

// Applica il dizionario della lingua a tutti gli elementi marcati in HTML.
// data-i18n: sostituisce il testo (textContent) — usato ovunque tranne le
// eccezioni sotto, così le strutture create da GSAP (span annidati per le
// animazioni riga-per-riga/parola-per-parola) restano intatte: cambia solo
// il contenuto testuale del nodo, mai i wrapper attorno.
// data-i18n-attr="attr:chiave,attr2:chiave2": sostituisce attributi
// (es. aria-label) invece del testo.
function applyLanguage(lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = getByPath(dict, el.getAttribute('data-i18n'));
    if (typeof value === 'string') el.textContent = value;
  });

  // Come data-i18n, ma sostituisce l'innerHTML invece del solo testo:
  // serve per i blocchi con formattazione ricca (titoli, elenchi, grassetti)
  // come le pagine Privacy/Cookie Policy, dove tradurre riga per riga con
  // data-i18n non è praticabile.
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = getByPath(dict, el.getAttribute('data-i18n-html'));
    if (typeof value === 'string') el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const value = getByPath(dict, key);
      if (attr && typeof value === 'string') el.setAttribute(attr, value);
    });
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-lang-current]').forEach((el) => {
    el.textContent = lang.toUpperCase();
  });
  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang-option') === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

export function initI18n() {
  let currentLang = getInitialLang();
  applyLanguage(currentLang);

  const toggle = document.querySelector('[data-lang-toggle]');
  const menu = document.querySelector('[data-lang-menu]');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    menu.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('hidden')) openMenu(); else closeMenu();
  });

  document.querySelectorAll('[data-lang-option]').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang-option');
      if (!translations[currentLang]) return;
      localStorage.setItem(STORAGE_KEY, currentLang);
      applyLanguage(currentLang);
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== toggle) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Sanity check in sviluppo: nessuna lingua elencata in UI dovrebbe mancare
  // dal dizionario (evita un pulsante "morto" se si aggiunge una lingua
  // all'elenco senza il relativo file di traduzione).
  languages.forEach(({ code }) => {
    if (!translations[code]) console.warn(`[i18n] Traduzione mancante per la lingua "${code}"`);
  });
}
