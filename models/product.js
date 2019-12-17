const fs = require('fs')
const path = require('path')

const dirName = require('../utils/path')
const filePath = path.join(dirName, 'data', 'products.json')

class Product {
  constructor(title) {
    this.title = title
  }

  save() {
    fs.readFile(filePath, (err, fileContent) => {
      let products = []
      if (!err) {
        products = JSON.parse(fileContent)
      }
      products.push(this)
      fs.writeFile(filePath, JSON.stringify(products), (e) => console.log(e))
    })
  }

  static async fetchAll() {
    const products = await fs.readFile(filePath, (err, fileContent) => {
      if (err) return []
      return JSON.parse(fileContent)
    })

    return products
  }
}

module.exports = Product