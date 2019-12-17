const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', (req, res, next) => {
  console.log('This always runs')
  next()
})

app.use('/add-product', (req, res, next) => {
  console.log('middleware')
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title"/>
      <button type="submit">Add product</button>
    </form>
  `)
})

app.post('/product', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.use('/', (req, res, next) => {
  console.log('Another middleware')
  res.send('<h1>Hello Express</h1>')
})

const server = http.createServer(app)

server.listen(3000)