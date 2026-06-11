require('dotenv').config()

const express = require('express')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const appConfig = require('./src/config/app.config.js')
const { configureHelmet, configureCsrf, configureRateLimit } = require('./src/middleware/security.middleware.js')
const { requestLogger } = require('./src/middleware/logger.middleware.js')
const webRoutes = require('./src/routes/web.routes.js')

const port = process.env.PORT || appConfig.server.port || 3000

function createApp() {
  const app = express()

  app.use(configureHelmet())
  app.use(configureRateLimit())

  const { doubleCsrfProtection, generateToken } = configureCsrf()
  app.use(doubleCsrfProtection)
  app.use((req, res, next) => {
    req.csrfToken = () => generateToken(req, res)
    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(express.static(path.join(__dirname, 'public')))

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'src/views'))
  app.use(expressLayouts)
  app.set('layout', 'layouts/main')

  app.use(requestLogger)

  app.use('/', webRoutes)

  return app
}

const app = createApp()

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
  console.log(`Entorno activo: ${process.env.NODE_ENV || 'development'}`)
})

process.on('uncaughtException', (err) => {
  console.error('Error fatal en arranque:', err.message)
  process.exit(1)
})