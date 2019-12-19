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
        const file = JSON.parse(fileContent)
        if (Object.keys(file).length) {
          cart = file
        }
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

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, cart) => {
      if (err) return console.log(err)
      const updatedCart = { ...JSON.parse(cart) }

      const product = updatedCart.products.find(prod => prod.id === id)
      const { qty } = product
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice -= (productPrice * qty)

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (err) console.log(err)
      })
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return cb(null)
      const cart = JSON.parse(fileContent)
      cb(cart)
    })
  }
}

module.exports = Cart