'use strict'

const express = require('express')
const { processContactForm } = require('../services/contact.service.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', { title: 'Inicio', description: 'Bienvenido a NuestroServicio' })
})

router.get('/servicios', (req, res) => {
  res.render('servicios', { title: 'Servicios', description: 'Nuestros servicios profesionales' })
})

router.get('/contacto', (req, res) => {
  res.render('contacto', {
    title:       'Contacto',
    description: 'Ponte en contacto con nosotros',
    csrfToken:   req.csrfToken()
  })
})

router.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body

  const errors = []

  if (!nombre || String(nombre).trim().length < 2) {
    errors.push({ field: 'nombre', message: 'Ingresa tu nombre (mínimo 2 caracteres).' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(String(email).trim())) {
    errors.push({ field: 'email', message: 'Ingresa un correo electrónico válido.' })
  }

  if (!mensaje || String(mensaje).trim().length < 10) {
    errors.push({ field: 'mensaje', message: 'El mensaje debe tener al menos 10 caracteres.' })
  }

  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors })
  }

  try {
    const result = await processContactForm(req.body)
    if (result.success) {
      return res.status(200).json({ success: true })
    }
    return res.status(500).json({ success: false, message: 'Error interno. Intenta más tarde.' })
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error interno. Intenta más tarde.' })
  }
})

router.use((req, res) => {
  res.status(404).render('home', { title: 'Inicio', description: '' })
})

module.exports = router