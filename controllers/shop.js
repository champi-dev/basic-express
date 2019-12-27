const Product = require('../models/product')
const Cart = require('../models/cart')

const getIndex = (req, res) => {
  Product.findAll()
    .then(prods => {
      res.render('shop/index', {
        prods,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(e => console.log(e))
}

const getProducts = (req, res) => {
  Product.findAll()
    .then(prods => {
      res.render('shop/product-list', {
        prods,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(e => console.log(e))
}

const getProduct = (req, res) => {
  const { productId } = req.params
  Product.findByPk(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(e => console.log(e))
}

const getCart = (req, res) => {
  req.user.getCart()
    .then(cart => cart.getProducts()
      .then(products => res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products
      }))
      .catch(e => console.log(e)))
    .catch(e => console.log(e))
}

const postCart = (req, res) => {
  const { productId } = req.body
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
}

const postCartDeleteProduct = (req, res) => {
  const { productId } = req.body
  Product.findById(productId, (product) => {
    console.log('**product**', product)
    Cart.deleteProduct(productId, product.price)
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
  postCartDeleteProduct,
  getOrders,
  getCheckout
}
