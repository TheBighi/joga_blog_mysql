const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Sander
    password: 'qwerty',
    database: 'joga_mysql'
})

module.exports = db;