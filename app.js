const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

const sequelize = require('./utils/database')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./utils/path')
const { notFound } = require('./controllers/404')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(e => console.log(e))
})

app.use(express.static(path.join(rootDir, 'public')))
app.use(adminRoutes)
app.use(shopRoutes)
app.use(notFound)

const server = http.createServer(app)
const PORT = 3000

Product.belongsTo(User, {
  constrains: true,
  onDelete: 'CASCADE'
})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Dan',
        email: 'test@mail.com'
      })
    }
    return user
  })
  .then(user => {
    return user.createCart()
  })
  .then(server.listen(PORT, () => console.log(`listening on port: ${PORT}`)))
  .catch(e => console.log(e))
