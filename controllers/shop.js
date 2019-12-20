const Product = require('../models/product')
const Cart = require('../models/cart')

const getIndex = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(e => console.log(e))
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []

      products.forEach(product => {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      })

      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
    })
  })
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
