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

const articleRoutes = require('./routes/article.js')

app.use('/', articleRoutes)
app.use('/article', articleRoutes)

const authorRoutes = require('./routes/author.js')

app.use('/author', authorRoutes)

app.listen(3001, () =>{
    console.log('app is at http://localhost:3001')
}) 