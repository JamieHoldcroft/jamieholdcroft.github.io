// Theme toggle, mobile nav, writing tabs, and photo lightbox.
// Must load AFTER components.js so the header/footer exist in the DOM.

(function themeInit() {
  // Apply saved/default theme as early as possible to avoid a flash.
  const saved = localStorage.getItem('theme');
  const theme = saved || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  // ---- Theme toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // ---- Writing page: essays / poetry tabs ----
  const writingButtons = document.querySelectorAll('.writing-toggle button');
  if (writingButtons.length) {
    writingButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        writingButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.target;
        document.querySelectorAll('.writing-group').forEach((group) => {
          group.classList.toggle('active', group.id === target);
        });
      });
    });
  }

  // ---- Photography lightbox ----
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item[data-full]').forEach((item) => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.full;
        lightboxImg.alt = item.dataset.caption || '';
        lightbox.classList.add('open');
      });
    });

    const close = () => {
      lightbox.classList.remove('open');
      lightboxImg.src = '';
    };
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
});
