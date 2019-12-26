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
  Product.create({
    title,
    imageUrl,
    description,
    price
  })
    .then(() => console.log(`${title} product was created`))
    .catch(e => console.log(e))
}

const getEditProduct = (req, res) => {
  const editingMode = req.query.edit === 'true'
  if (!editingMode) return res.redirect('/')

  const { productId } = req.params
  Product.findByPk(productId)
    .then(product => {
      if (!product) return res.redirect('/')
      res.render('admin/form-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editingMode,
        product
      })
    })
    .catch(e => console.log(e))
}

const postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body

  Product.findByPk(productId)
    .then(product => {
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      return product.save()
    })
    .then(() => res.redirect('/admin/products'))
    .catch(e => console.log(e))
}

const getProducts = (req, res) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(e => console.log(e))
}

const postDeleteProduct = (req, res) => {
  const { productId } = req.body
  Product.deleteById(productId)
  res.redirect('/admin/products')
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts
}
