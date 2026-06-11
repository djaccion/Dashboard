'use strict'

const nodemailer = require('nodemailer')
const { logger } = require('../middleware/logger.middleware.js')

function _sanitizePayload(payload) {
  return {
    nombre:  String(payload.nombre  !== undefined ? payload.nombre  : '').trim(),
    email:   String(payload.email   !== undefined ? payload.email   : '').trim(),
    mensaje: String(payload.mensaje !== undefined ? payload.mensaje : '').trim()
  }
}

function _buildEmailOptions(payload) {
  return {
    from:    process.env.SMTP_FROM,
    to:      process.env.SMTP_TO,
    subject: `Nuevo contacto de ${payload.nombre}`,
    text:    `Nombre: ${payload.nombre}\nEmail: ${payload.email}\nMensaje:\n${payload.mensaje}`,
    html:    `<p><strong>Nombre:</strong> ${payload.nombre}</p><p><strong>Email:</strong> ${payload.email}</p><p><strong>Mensaje:</strong></p><p>${payload.mensaje}</p>`
  }
}

function _logContactSubmission(payload, reason) {
  logger.warn('contact_form_fallback', {
    event:     'contact_form_fallback',
    reason:    reason,
    nombre:    payload.nombre,
    email:     payload.email,
    mensaje:   payload.mensaje,
    timestamp: new Date().toISOString()
  })
}

function _createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

async function processContactForm(payload) {
  const sanitizedPayload = _sanitizePayload(payload)

  const transporter = _createTransporter()
  const options     = _buildEmailOptions(sanitizedPayload)

  try {
    await transporter.sendMail(options)
    logger.info('contact_form_email_sent', { email: sanitizedPayload.email })
    return { success: true, method: 'email', error: null }
  } catch (smtpError) {
    try {
      _logContactSubmission(sanitizedPayload, 'SMTP_FAILURE')
      return { success: true, method: 'log_fallback', error: null }
    } catch (logError) {
      return { success: false, method: 'log_fallback', error: logError.message }
    }
  }
}

module.exports = { processContactForm }