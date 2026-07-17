const STORAGE_KEY = 'sicilbio-cookie-consent';

// Il banner compare solo quando l'utente arriva alla sezione "Chi siamo"
// scorrendo (non subito all'apertura del sito, per non disturbare la
// prima impressione sull'hero), e solo se non ha già scelto in passato.
export function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  if (!banner || !acceptBtn || !rejectBtn) return;

  if (localStorage.getItem(STORAGE_KEY)) return;

  const hide = () => banner.classList.remove('is-visible');

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    hide();
  });

  rejectBtn.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    hide();
  });

  const chiSiamo = document.getElementById('chi-siamo');
  if (!chiSiamo) {
    banner.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          banner.classList.add('is-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(chiSiamo);
}
