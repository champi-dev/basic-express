const express = require('express')
const { getAddProduct, postAddProduct, getProducts } = require('../controllers/admin')

const router = express.Router()

router.get('/admin/add-product', getAddProduct)
router.get('/admin/products', getProducts)
router.post('/admin/add-product', postAddProduct)

module.exports = router