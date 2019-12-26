const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./utils/database')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./utils/path')
const { notFound } = require('./controllers/404')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))
app.use(adminRoutes)
app.use(shopRoutes)
app.use(notFound)

const server = http.createServer(app)
const PORT = 3000

sequelize.sync()
  .then(() => {
    server.listen(PORT, () => console.log(`listening on port: ${PORT}`))
  })
  .catch(e => console.log(e))
