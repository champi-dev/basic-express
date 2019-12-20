const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'Leantech.1qwe2asd'
})

module.exports = pool.promise()
