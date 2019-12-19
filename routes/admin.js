const express = require('express')
const { getAddProduct, postAddProduct, getEditProduct, postEditProduct, postDeleteProduct, getProducts } = require('../controllers/admin')

const router = express.Router()

router.get('/admin/add-product', getAddProduct)
router.get('/admin/products', getProducts)
router.post('/admin/add-product', postAddProduct)
router.get('/admin/edit-product/:productId', getEditProduct)
router.post('/admin/edit-product', postEditProduct)
router.post('/admin/delete-product', postDeleteProduct)

module.exports = router