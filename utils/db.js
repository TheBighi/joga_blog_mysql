const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Sander
    password: 'qwerty',
    database: 'joga_mysql'
})

db.connect((err) =>{
    if (err) throw err
    console.log('connected to mysql db')
})

module.exports = db;