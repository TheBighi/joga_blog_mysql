const Express = require("express")
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const app = Express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/"
}))

app.use(Express.static("public"))

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

app.get('/', (req, res) => {
    let query = 'SELECT * FROM article'
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        console.log(articles)
        res.render('index', { articles:articles })
    })
})

app.listen(3001, () =>{
    console.log('app is at http://localhost:3001')
})