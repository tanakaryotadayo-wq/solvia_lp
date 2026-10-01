(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const menuClose = document.querySelector('[data-menu-close]');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });

  const setMenu = (open) => {
    menuPanel?.classList.toggle('is-open', open);
    menuPanel?.setAttribute('aria-hidden', String(!open));
    menuButton?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuButton?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  menuPanel?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  const reveal = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    reveal.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .17, rootMargin: '0px 0px -8% 0px' });
    reveal.forEach((el) => observer.observe(el));
  }

  const signal = document.querySelector('[data-signal]');
  if (signal) {
    const heights = [22,34,18,48,61,28,77,46,32,68,92,45,74,36,55,88,41,69,28,62,97,53,31,72,44,83,38,65,24,58,79,42,67,36,89,51,29,73,47,93,39,64,27,56,81,43,70,35,86,49,26,76,45,68,33,91,52,30,72,40,62,25,57,84,44,66,37,78];
    const frag = document.createDocumentFragment();
    heights.forEach((height, index) => {
      const bar = document.createElement('i');
      bar.style.height = `${height}%`;
      bar.style.opacity = String(.45 + ((index % 7) / 12));
      frag.appendChild(bar);
    });
    signal.appendChild(frag);
  }

  const invitation = document.querySelector('.invitation');
  if (invitation && 'IntersectionObserver' in window) {
    const ctaObserver = new IntersectionObserver((entries) => {
      document.body.classList.toggle('hide-mobile-talk', entries[0]?.isIntersecting ?? false);
    }, { threshold: .22 });
    ctaObserver.observe(invitation);
  }

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      try {
        const key = 'solvia_c_events';
        const list = JSON.parse(sessionStorage.getItem(key) || '[]');
        list.push({ event: el.dataset.track, at: Date.now() });
        sessionStorage.setItem(key, JSON.stringify(list.slice(-20)));
      } catch { /* analytics must never block navigation */ }
    });
  });
})();
