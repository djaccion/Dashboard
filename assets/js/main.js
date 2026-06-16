const SECTIONS = ['home', 'historias', 'noticias'];
const DEFAULT_SECTION = 'home';

function _getSectionFromHash() {
  var hash = window.location.hash.replace('#', '');
  if (SECTIONS.indexOf(hash) !== -1) {
    return hash;
  }
  return DEFAULT_SECTION;
}

function _hideAllSections() {
  var elements = document.querySelectorAll('[data-section]');
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('hidden', '');
    elements[i].classList.add('is-hidden');
  }
}

function _deactivateAllNavLinks() {
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove('is-active');
  }
}

function _closeMobileMenu() {
  var navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.add('is-hidden');
  }
}

function _showSection(sectionName) {
  _hideAllSections();
  _deactivateAllNavLinks();

  var sectionEl = document.querySelector('[data-section="' + sectionName + '"]');
  if (!sectionEl) {
    return;
  }

  sectionEl.removeAttribute('hidden');
  sectionEl.classList.remove('is-hidden');

  var navLink = document.querySelector('.nav-link[data-section="' + sectionName + '"]');
  if (navLink) {
    navLink.classList.add('is-active');
  }

  _closeMobileMenu();
}

function _initMobileMenu() {
  var toggle = document.getElementById('nav-toggle');
  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', function () {
    var navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('is-hidden');
    }
  });

  document.addEventListener('click', function (event) {
    var mainNav = document.getElementById('main-nav');
    if (mainNav && !mainNav.contains(event.target)) {
      _closeMobileMenu();
    }
  });
}

function _initNavLinks() {
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (event) {
      event.preventDefault();
      var sectionName = this.getAttribute('data-section');
      if (sectionName) {
        window.location.hash = '#' + sectionName;
        _showSection(sectionName);
      }
    });
  }
}

function _initRouter() {
  window.addEventListener('hashchange', function () {
    _showSection(_getSectionFromHash());
  });

  _showSection(_getSectionFromHash());
}

function init() {
  _initMobileMenu();
  _initNavLinks();
  _initRouter();
  initAnalytics();
}

document.addEventListener('DOMContentLoaded', init);