const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { routes: adminRoutes, products } = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./utils/path')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))
app.use(adminRoutes)
app.use(shopRoutes)
app.use((req, res, next) => {
  res.status(404).render('404')
})

const server = http.createServer(app)

server.listen(3000)