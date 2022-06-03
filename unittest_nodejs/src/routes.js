
  const express = require('express')
  const { homeController } = require('./controllers/homeController')
  
  const routes = express.Router()
  routes.get('/', homeController)
  routes.post('/', homeController)
  
  module.exports = routes