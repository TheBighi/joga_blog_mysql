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

app.get('/article/:slug', (req, res) => {
    let query1 = `SELECT * FROM article WHERE slug = '${req.params.slug}'`
    con.query(query1, (err, result1) => {
        if (err) throw err
        let article = result1[0]

        let query2 = `SELECT name FROM author WHERE id = '${article.author_id}'`

        con.query(query2, (err, result2) => {
            if (err) throw err
            article.author_name = result2.name
            res.render('article', {article:article})
        })
    })
})

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT * FROM articles WHERE author_id = ${req.params.author_id}`

    con.query(query, (err, result) => {
        if (err) throw err
        let articles = result

        res.render
    })
})

app.listen(3001, () =>{
    console.log('app is at http://localhost:3001')
})