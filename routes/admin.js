const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/admin/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
})

router.post('/admin/add-product', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

module.exports = router