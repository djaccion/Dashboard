document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.querySelector('#contact-form');
  const feedbackBanner = document.querySelector('.feedback-banner');
  const csrfTokenField = document.querySelector('#csrf-token-field');

  // ─── NAVEGACIÓN ───────────────────────────────────────────────────────────

  function _setActiveLink(activeElement) {
    navLinks.forEach((link) => link.classList.remove('is-active'));
    activeElement.classList.add('is-active');
  }

  function initNavigation() {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        _setActiveLink(link);
        const href = link.getAttribute('href');
        const sectionTarget = document.querySelector(href);
        if (sectionTarget) {
          sectionTarget.scrollIntoView({ behavior: 'smooth' });
        }
        history.pushState(null, '', href);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const matchingLink = Array.from(navLinks).find(
              (link) => link.getAttribute('href') === '#' + targetId
            );
            if (matchingLink) {
              _setActiveLink(matchingLink);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    ['#section-home', '#section-servicios', '#section-contacto'].forEach((selector) => {
      const section = document.querySelector(selector);
      if (section) {
        observer.observe(section);
      }
    });
  }

  // ─── FORMULARIO — AUXILIARES PRIVADAS ────────────────────────────────────

  function _clearFormErrors() {
    document.querySelectorAll('.form-field').forEach((field) => {
      field.classList.remove('has-error');
    });
    document.querySelectorAll('.field-error-msg').forEach((msg) => {
      msg.classList.remove('is-visible');
    });
  }

  function _validateForm() {
    const errors = [];

    const nombreInput = contactForm.querySelector('[name="nombre"]');
    if (nombreInput.value.trim() === '') {
      errors.push({ field: 'nombre', message: 'El nombre es obligatorio.' });
    }

    const emailInput = contactForm.querySelector('[name="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      errors.push({ field: 'email', message: 'El email es obligatorio.' });
    } else if (!emailRegex.test(emailInput.value.trim())) {
      errors.push({ field: 'email', message: 'Ingresa un email válido.' });
    }

    const mensajeInput = contactForm.querySelector('[name="mensaje"]');
    if (mensajeInput.value.trim() === '') {
      errors.push({ field: 'mensaje', message: 'El mensaje es obligatorio.' });
    } else if (mensajeInput.value.trim().length < 10) {
      errors.push({ field: 'mensaje', message: 'El mensaje debe tener al menos 10 caracteres.' });
    }

    return errors;
  }

  function _displayFormErrors(errors) {
    errors.forEach((error) => {
      const inputEl = contactForm.querySelector(`[name="${error.field}"]`);
      const field = inputEl.closest('.form-field');
      field.classList.add('has-error');
      const errorMsg = field.querySelector('.field-error-msg');
      errorMsg.textContent = error.message;
      errorMsg.classList.add('is-visible');
    });

    contactForm.querySelector(`[name="${errors[0].field}"]`).focus();
  }

  function _setSubmitLoading(isLoading) {
    const submitBtn = contactForm.querySelector('.btn-primary');
    if (isLoading) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  }

  function _hideFeedbackBanner() {
    feedbackBanner.classList.remove('is-visible');
    feedbackBanner.classList.remove('is-success');
    feedbackBanner.classList.remove('has-error');
  }

  function _showFeedbackBanner(type) {
    if (type === 'success') {
      feedbackBanner.classList.add('is-visible');
      feedbackBanner.classList.add('is-success');
    } else if (type === 'error') {
      feedbackBanner.classList.add('is-visible');
      feedbackBanner.classList.add('has-error');
    }
    feedbackBanner.scrollIntoView({ behavior: 'smooth' });
  }

  async function _sendFormData() {
    const formData = new FormData(contactForm);
    const csrfToken = csrfTokenField ? csrfTokenField.value : '';

    const response = await fetch('/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify({
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        mensaje: formData.get('mensaje'),
        _csrf: csrfToken,
      }),
    });

    return response;
  }

  // ─── FORMULARIO — INICIALIZACIÓN ─────────────────────────────────────────

  function initContactForm() {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      _clearFormErrors();

      const errors = _validateForm();
      if (errors.length > 0) {
        _displayFormErrors(errors);
        return;
      }

      _setSubmitLoading(true);
      _hideFeedbackBanner();

      try {
        const response = await _sendFormData();
        if (response.ok) {
          _setSubmitLoading(false);
          contactForm.reset();
          _showFeedbackBanner('success');
        } else {
          _setSubmitLoading(false);
          _showFeedbackBanner('error');
        }
      } catch (networkError) {
        _setSubmitLoading(false);
        _showFeedbackBanner('error');
      }
    });

    const closeBannerBtn = feedbackBanner
      ? feedbackBanner.querySelector('.feedback-banner-close')
      : null;

    if (closeBannerBtn) {
      closeBannerBtn.addEventListener('click', () => {
        _hideFeedbackBanner();
      });
    }
  }

  // ─── BOOTSTRAP ───────────────────────────────────────────────────────────

  initNavigation();

  if (contactForm !== null) {
    initContactForm();
  }
});