const Product = require('../models/product')
const Cart = require('../models/cart')

const getIndex = (req, res) => {
  Product.fetchAll((products = []) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
}

const getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
}

const getProduct = (req, res) => {
  const { productId } = req.params
  Product.findById(productId, product => {
    res.render('shop/product-detail', { product, pageTitle: product.title, path: '/products' })
  })
}

const getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  })
}

const postCart = (req, res) => {
  const { productId } = req.body
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
}

const getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
}

const getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

module.exports = {
  getIndex,
  getProducts,
  getProduct,
  getCart,
  postCart,
  getOrders,
  getCheckout
}