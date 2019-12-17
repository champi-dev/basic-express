const express = require('express')
const { getAddProduct, postAddProduct } = require('../controllers/products')

const router = express.Router()

router.get('/admin/add-product', getAddProduct)
router.post('/admin/add-product', postAddProduct)

module.exports = router