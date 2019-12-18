const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const dirName = require('../utils/path')
const filePath = path.join(dirName, 'data', 'products.json')

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    this.id = uuidv1()
    fs.readFile(filePath, (err, fileContent) => {
      let products = []

      if (!err) {
        products = JSON.parse(fileContent)
      }

      products.push(this)
      fs.writeFile(filePath, JSON.stringify(products), (e) => {
        if (e) console.log(e)
      })
    })
  }

  static fetchAll(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return cb([])
      cb(JSON.parse(fileContent))
    })
  }
}

module.exports = Product