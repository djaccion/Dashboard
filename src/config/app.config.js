'use strict';

const server = {
  port:         parseInt(process.env.PORT, 10)     || 3000,
  nodeEnv:      process.env.NODE_ENV               || 'development',
  isProduction: process.env.NODE_ENV               === 'production',
};

const security = {
  csrfSecret:        process.env.CSRF_SECRET                              || '',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)      || 900000,
  rateLimitMax:      parseInt(process.env.RATE_LIMIT_MAX, 10)             || 100,
};

const email = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
  from: process.env.SMTP_FROM || '',
  to:   process.env.SMTP_TO   || '',
};

const logging = {
  level:    process.env.LOG_LEVEL || 'info',
  filePath: process.env.LOG_FILE  || 'logs/app.log',
};

if (!security.csrfSecret) {
  throw new Error(
    'FATAL: CSRF_SECRET no está definido en las variables de entorno. La aplicación no puede iniciar de forma segura.'
  );
}

module.exports = Object.freeze({ server, security, email, logging });