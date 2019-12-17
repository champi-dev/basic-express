const path = require('path')
const express = require('express')
const router = express.Router()
const rootDir = require('../utils/path')

const products = []

router.get('/admin/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

router.post('/admin/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})

module.exports = {
  routes: router,
  products
}