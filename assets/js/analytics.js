// assets/js/analytics.js
// Módulo de consentimiento de cookies y carga condicional de Google Analytics.
// Sin módulos ES6, sin clases, sin librerías externas.

function _hideBanner() {
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.setAttribute('hidden', '');
    banner.classList.add('is-hidden');
  }
}

function _loadGA() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
}

function _onAccept() {
  localStorage.setItem('cookie_consent', 'accepted');
  _hideBanner();
  document.body.classList.add('is-accepted');
  _loadGA();
}

function _onReject() {
  localStorage.setItem('cookie_consent', 'rejected');
  _hideBanner();
}

function initAnalytics() {
  var consent = localStorage.getItem('cookie_consent');

  if (consent === 'accepted') {
    _hideBanner();
    document.body.classList.add('is-accepted');
    _loadGA();
    return;
  }

  if (consent === 'rejected') {
    _hideBanner();
    return;
  }

  var acceptBtn = document.getElementById('cookie-accept-btn');
  var rejectBtn = document.getElementById('cookie-reject-btn');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', _onAccept);
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', _onReject);
  }
}