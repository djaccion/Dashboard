'use strict'

const { createLogger, transports, format } = require('winston')
const appConfig = require('../config/app.config.js')

const activeTransports = [
  new transports.File({
    filename: appConfig.logging.filePath,
    maxsize:  5242880,
    maxFiles: 3,
  }),
]

if (!appConfig.server.isProduction) {
  activeTransports.push(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  )
}

const logger = createLogger({
  level:      appConfig.logging.level,
  format:     format.combine(format.timestamp(), format.json()),
  transports: activeTransports,
})

function requestLogger(req, res, next) {
  const startTime = Date.now()

  next()

  res.on('finish', function () {
    const responseMs = Date.now() - startTime

    logger.info('HTTP Request', {
      method:     req.method,
      url:        req.url,
      status:     res.statusCode,
      ip:         req.ip,
      responseMs: responseMs,
    })
  })
}

module.exports = { logger, requestLogger }