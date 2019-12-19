const express = require('express')
const router = express.Router()

const { getIndex, getProducts, getProduct, getCart, postCart, getOrders, getCheckout } = require('../controllers/shop')

router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/products/:productId', getProduct)
router.get('/cart', getCart)
router.post('/cart', postCart)
router.get('/orders', getOrders)
router.get('/checkout', getCheckout)

module.exports = router
