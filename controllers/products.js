const products = []

const getAddProduct = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' })
}

const postAddProduct = (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/')
}

const getProducts = (req, res, next) => {
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' })
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  products
}