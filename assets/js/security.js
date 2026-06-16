(function () {
  'use strict';

  if (typeof window.DOMPurify === 'undefined') {
    throw new Error('security.js: DOMPurify no está disponible. Verifica la carga del CDN.');
  }

  var PURIFY_CONFIG = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'h2', 'h3', 'h4'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    FORCE_BODY: false
  };

  function sanitize(dirtyHTML) {
    if (typeof dirtyHTML !== 'string' || dirtyHTML === '') {
      return '';
    }
    return window.DOMPurify.sanitize(dirtyHTML, PURIFY_CONFIG);
  }

  function setHTML(element, dirtyHTML) {
    if (element === null || !(element instanceof Element)) {
      console.warn('security.js: setHTML recibió un elemento inválido.');
      return;
    }
    element.innerHTML = sanitize(dirtyHTML);
  }

  function escapeText(text) {
    if (typeof text !== 'string') {
      return '';
    }
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  window.Security = {
    setHTML: setHTML,
    escapeText: escapeText
  };

}());