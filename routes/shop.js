const path = require('path')
const express = require('express')
const router = express.Router()

const { products } = require('./admin')
const rootDir = require('../utils/path')

router.get('/', (req, res, next) => {
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' })
})

module.exports = router