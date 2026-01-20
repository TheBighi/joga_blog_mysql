const Express = require("express")
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = Express()

app.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect((err) =>{
    if (err) throw err
    console.log('connected to mysql db')
})

app.listen(3001, () =>{
    console.log('app is at http://localhost:3001')
})