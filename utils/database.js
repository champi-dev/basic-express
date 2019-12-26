const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'node-complete',
  'root',
  'Leantech.1qwe2asd',
  { dialect: 'mysql', host: 'localhost' }
)

module.exports = sequelize
