'use strict'

const helmet = require('helmet')
const { doubleCsrf } = require('csrf-csrf')
const rateLimit = require('express-rate-limit')

function configureHelmet() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'"],
        styleSrc:   ["'self'"],
        imgSrc:     ["'self'", "data:", "https://placehold.co"],
        fontSrc:    ["'self'"],
        connectSrc: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
}

function configureCsrf() {
  const { doubleCsrfProtection, generateToken } = doubleCsrf({
    getSecret:     () => process.env.CSRF_SECRET,
    cookieName:    'x-csrf-token',
    cookieOptions: {
      httpOnly: true,
      sameSite: 'strict',
      secure:   process.env.NODE_ENV === 'production'
    },
    size:           64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS']
  })

  return { doubleCsrfProtection, generateToken }
}

function configureRateLimit() {
  return rateLimit({
    windowMs:        15 * 60 * 1000,
    max:             100,
    standardHeaders: true,
    legacyHeaders:   false,
    message: {
      status:  429,
      message: 'Demasiadas peticiones. Intenta de nuevo en 15 minutos.'
    }
  })
}

module.exports = { configureHelmet, configureCsrf, configureRateLimit }