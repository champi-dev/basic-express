const Product = require('../models/product')

const getAddProduct = (req, res) => {
  res.render('admin/form-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}

const postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

const getEditProduct = (req, res) => {
  const editingMode = req.query.edit === 'true' ? true : false
  if (!editingMode) return res.redirect('/')

  const { productId } = req.params
  Product.findById(productId, (product) => {
    if (!product) return res.redirect('/')
    res.render('admin/form-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editingMode,
      product
    })
  })
}

const postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body
  const product = new Product(
    productId,
    title,
    imageUrl,
    description,
    price
  )

  product.save()
  res.redirect('/admin/products')
}

const postDeleteProduct = () => {
  // const { productId } = req.body
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
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts
}