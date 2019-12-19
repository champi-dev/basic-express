const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0.0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id == id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct

      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.qty += 1
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = { id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }

      cart.totalPrice += parseFloat(productPrice)
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) console.log(err)
      })
    })
  }
}

module.exports = Cart