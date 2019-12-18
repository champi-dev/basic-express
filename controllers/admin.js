const Product = require('../models/product')

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

const postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product(title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

const getProducts = (req, res) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}