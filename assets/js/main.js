(function () {
  'use strict';

  /* ─────────────────────────────────────────
     UTILIDADES DE SEGURIDAD
  ───────────────────────────────────────── */

  function sanitize(str) {
    return DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /* ─────────────────────────────────────────
     MÓDULO: NAVEGACIÓN SPA
  ───────────────────────────────────────── */

  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const panels   = document.querySelectorAll('.section-panel');

    function showSection(targetName) {
      panels.forEach(function (panel) {
        panel.setAttribute('hidden', '');
      });

      navLinks.forEach(function (link) {
        link.classList.remove('is-active');
      });

      const targetPanel = document.getElementById('section-' + targetName);
      if (!targetPanel) return;
      targetPanel.removeAttribute('hidden');

      const targetLink = document.getElementById('nav-link-' + targetName);
      if (!targetLink) return;
      targetLink.classList.add('is-active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '#' + targetName);
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        if (!target) return;
        showSection(target);
      });
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash === 'historias') {
      showSection('historias');
    } else if (initialHash === 'noticias') {
      showSection('noticias');
    } else {
      showSection('home');
    }

    window.addEventListener('popstate', function () {
      const hash   = window.location.hash.replace('#', '') || 'home';
      const validos = ['home', 'historias', 'noticias'];
      if (validos.indexOf(hash) !== -1) {
        showSection(hash);
      } else {
        showSection('home');
      }
    });
  }

  /* ─────────────────────────────────────────
     MÓDULO: ACORDEÓN FAQ
  ───────────────────────────────────────── */

  function initFaq() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    function toggleFaqItem(item, answer, question) {
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        item.classList.add('is-closed');
        answer.setAttribute('hidden', '');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.remove('is-closed');
        item.classList.add('is-open');
        answer.removeAttribute('hidden');
        question.setAttribute('aria-expanded', 'true');
      }
    }

    faqList.addEventListener('click', function (e) {
      const question = e.target.closest('.faq-question');
      if (!question) return;

      const item   = question.closest('.faq-item');
      const answer = item ? item.querySelector('.faq-answer') : null;
      if (!item || !answer) return;

      toggleFaqItem(item, answer, question);
    });
  }

  /* ─────────────────────────────────────────
     MÓDULO: BANNER DE COOKIES
  ───────────────────────────────────────── */

  function initCookieBanner() {
    const banner    = document.getElementById('banner-cookies');
    const btnAccept = document.getElementById('btn-accept-cookies');
    const btnReject = document.getElementById('btn-reject-cookies');
    if (!banner || !btnAccept || !btnReject) return;

    function handleConsent(decision) {
      localStorage.setItem('cookie-consent', decision);
      banner.classList.add('is-hidden');

      if (decision === 'accepted') {
        document.body.classList.add('has-consent');
      } else {
        document.body.classList.remove('has-consent');
      }
    }

    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted' || consent === 'rejected') {
      banner.classList.add('is-hidden');
      if (consent === 'accepted') {
        document.body.classList.add('has-consent');
      }
      return;
    }

    banner.classList.remove('is-hidden');

    btnAccept.addEventListener('click', function () { handleConsent('accepted'); });
    btnReject.addEventListener('click', function () { handleConsent('rejected'); });
  }

  /* ─────────────────────────────────────────
     MÓDULO: BÚSQUEDA
  ───────────────────────────────────────── */

  function initSearch() {
    const form        = document.getElementById('form-search');
    const input       = document.getElementById('input-search');
    const errorMsg    = document.getElementById('search-error-msg');
    const resultsArea = document.getElementById('search-results');
    if (!form || !input || !errorMsg || !resultsArea) return;

    function clearError() {
      input.classList.remove('has-error');
      errorMsg.classList.remove('is-visible');
    }

    function showError(msg) {
      input.classList.add('has-error');
      errorMsg.textContent = msg;
      errorMsg.classList.add('is-visible');
    }

    function renderResults(query) {
      const safeQuery = escapeHtml(sanitize(query));
      resultsArea.textContent = '';

      const heading = document.createElement('p');
      heading.textContent = 'Resultados para: ' + safeQuery;
      resultsArea.appendChild(heading);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      const rawValue = input.value.trim();

      if (!rawValue) {
        showError('Por favor, introduce un término de búsqueda.');
        return;
      }

      if (rawValue.length < 3) {
        showError('El término de búsqueda debe tener al menos 3 caracteres.');
        return;
      }

      renderResults(rawValue);
    });

    input.addEventListener('input', function () {
      if (input.classList.contains('has-error')) {
        clearError();
      }
    });
  }

  /* ─────────────────────────────────────────
     INICIALIZACIÓN
  ───────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initFaq();
    initCookieBanner();
    initSearch();
  });

})();