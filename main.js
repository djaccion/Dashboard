(function () {
  'use strict';

  var sectionIds = ['home', 'historias', 'noticias', 'faq'];

  function updateNavState(targetId) {
    var links = document.querySelectorAll('.nav-main__link');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('is-active');
    }
    var activeLink = document.querySelector('.nav-main__link[data-target="' + targetId + '"]');
    if (activeLink) {
      activeLink.classList.add('is-active');
    }
  }

  function showSection(targetId) {
    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById('section-' + sectionIds[i]);
      if (el) {
        el.classList.add('is-hidden');
        el.classList.remove('is-active');
      }
    }
    var target = document.getElementById('section-' + targetId);
    if (target) {
      target.classList.remove('is-hidden');
      target.classList.add('is-active');
      updateNavState(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function initNavigation() {
    var links = document.querySelectorAll('.nav-main__link');
    for (var i = 0; i < links.length; i++) {
      (function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var target = link.getAttribute('data-target');
          var valid = false;
          for (var j = 0; j < sectionIds.length; j++) {
            if (sectionIds[j] === target) {
              valid = true;
              break;
            }
          }
          if (!valid) return;
          showSection(target);
        });
      })(links[i]);
    }
    showSection('home');
  }

  function initFaq() {
    var faqList = document.getElementById('faq-list');
    if (!faqList) return;
    faqList.addEventListener('click', function (e) {
      if (!e.target.classList.contains('faq__question')) return;
      var parentItem = e.target.closest('.faq__item');
      if (!parentItem) return;
      var isAlreadyOpen = parentItem.classList.contains('is-open');
      var items = faqList.querySelectorAll('.faq__item');
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('is-open');
      }
      if (!isAlreadyOpen) {
        parentItem.classList.add('is-open');
      }
    });
  }

  function activateGA4() {
    if (window.GA4_INITIALIZED) return;
    window.GA4_INITIALIZED = true;
    var GA_ID = 'G-XXXXXXXXXX';
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    var overlay = document.getElementById('cookie-overlay');
    var btnAccept = document.getElementById('btn-accept-cookies');
    var btnReject = document.getElementById('btn-reject-cookies');

    if (!banner || !overlay) return;

    var cookieStatus = localStorage.getItem('cookiesAccepted');

    if (cookieStatus === null) {
      banner.classList.remove('is-hidden');
      overlay.classList.remove('is-hidden');
    } else if (cookieStatus === 'true') {
      banner.classList.add('is-hidden');
      overlay.classList.add('is-hidden');
      document.body.classList.add('is-accepted');
      activateGA4();
    } else if (cookieStatus === 'false') {
      banner.classList.add('is-hidden');
      overlay.classList.add('is-hidden');
    }

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        document.body.classList.add('is-accepted');
        banner.classList.add('is-hidden');
        overlay.classList.add('is-hidden');
        activateGA4();
      });
    }

    if (btnReject) {
      btnReject.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'false');
        banner.classList.add('is-hidden');
        overlay.classList.add('is-hidden');
      });
    }
  }

  function sanitizeInput(value) {
    if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
      return window.DOMPurify.sanitize(value);
    }
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function initSearch() {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    var errorMsg = document.querySelector('.search__error-msg');

    if (!form || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = input.value.trim();
      var clean = sanitizeInput(raw);

      if (!clean || clean.length === 0) {
        input.classList.add('has-error');
        if (errorMsg) errorMsg.classList.remove('is-hidden');
        return;
      }

      input.classList.remove('has-error');
      if (errorMsg) errorMsg.classList.add('is-hidden');
    });

    input.addEventListener('input', function () {
      if (input.classList.contains('has-error')) {
        input.classList.remove('has-error');
        if (errorMsg) errorMsg.classList.add('is-hidden');
      }
    });
  }

  function init() {
    initNavigation();
    initFaq();
    initCookieBanner();
    initSearch();
  }

  document.addEventListener('DOMContentLoaded', init);
})();