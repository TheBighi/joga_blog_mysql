const Express = require("express")
const path = require('path')
const mysql = require('mysql2')
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

const bodyParser = require('body-parser')

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

const articleRoutes = require('./routes/article.js')

app.use('/', articleRoutes)
app.get('/article', articleRoutes)

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT * FROM article WHERE author_id = ${req.params.author_id}`

    con.query(query, (err, result) => {
        if (err) throw err
        let articles = result

        let query2 = `SELECT name FROM author WHERE id = '${articles[0].author_id}'`

        con.query(query2, (err, result2) => {
            if (err) throw err
            let AuthorName = result2[0].name
            console.log(AuthorName)
            res.render('author', {articles:articles, AuthorName:AuthorName})
        })
        
    })
})

app.listen(3001, () =>{
    console.log('app is at http://localhost:3001')
})