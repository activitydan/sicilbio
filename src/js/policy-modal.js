export function initPolicyModal() {
  const modal = document.getElementById('policy-modal');
  const openBtn = document.getElementById('policy-open');
  const closeBtn = document.getElementById('policy-close');
  const clickArea = document.querySelector('[data-policy-click-area]');
  if (!modal || !openBtn || !closeBtn) return;

  const open = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  // Chiude solo se il click arriva esattamente su quest'area (il centratore
  // a piena pagina che sta sopra lo sfondo scuro), non su un suo discendente
  // come il pannello bianco: altrimenti cliccare dentro il pannello
  // chiuderebbe comunque il popup.
  clickArea?.addEventListener('click', (e) => {
    if (e.target === clickArea) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });
}
