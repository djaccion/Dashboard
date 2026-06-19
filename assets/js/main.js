/* === 1. NAV MÓVIL === */

function initNav() {
  var toggle = document.querySelector('#nav-toggle');
  var menu = document.querySelector('#nav-menu');
  var overlay = document.querySelector('.overlay');

  if (!toggle || !menu || !overlay) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-open');
  }

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-open');
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  var navLinks = menu.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', closeMenu);
  }
}

/* === 2. ACORDEÓN FAQ === */

function initFaq() {
  var faqList = document.querySelector('#faq-list');
  if (!faqList) return;

  var items = faqList.querySelectorAll('.faq-item');

  function closeAllItems() {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('is-open');
      var btn = items[i].querySelector('.faq-item__question');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  }

  faqList.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-item__question');
    if (!btn) return;
    var item = btn.closest('.faq-item');
    var yaEstaAbierto = item.classList.contains('is-open');
    closeAllItems();
    if (!yaEstaAbierto) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* === 3. COOKIES & GA4 === */

function initCookieBanner() {
  var banner = document.querySelector('#cookie-banner');
  var acceptBtn = document.querySelector('#cookie-accept-btn');
  var rejectBtn = document.querySelector('#cookie-reject-btn');

  if (!banner) return;

  function hideBanner() {
    banner.classList.remove('is-visible');
    banner.setAttribute('aria-hidden', 'true');
  }

  function enableGA4() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  var consent = localStorage.getItem('cookie_consent');
  if (consent === 'accepted' || consent === 'rejected') {
    if (consent === 'accepted') enableGA4();
    return;
  }

  banner.classList.add('is-visible');
  banner.removeAttribute('aria-hidden');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('cookie_consent', 'accepted');
      enableGA4();
      hideBanner();
      document.body.classList.add('is-accepted');
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      localStorage.setItem('cookie_consent', 'rejected');
      hideBanner();
    });
  }
}

/* === 4. UTILIDADES GLOBALES === */

function initFooterYear() {
  var yearEl = document.querySelector('#footer-year');
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

/* === 5. INIT === */

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initFaq();
  initCookieBanner();
  initFooterYear();
});