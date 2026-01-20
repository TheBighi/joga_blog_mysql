const connection = require('../utils/db.js')

const getAllArticles = (req, res) => {
    let query = 'SELECT * FROM article'
    let articles = []
    connection.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', { articles:articles })
    })
}

const getArticleBySlug = (req, res) => {
    let query1 = `SELECT * FROM article WHERE slug = '${req.params.slug}'`
    connection.query(query1, (err, result1) => {
        if (err) throw err
        let article = result1[0]

        let query2 = `SELECT name FROM author WHERE id = '${article.author_id}'`

        connection.query(query2, (err, result2) => {
            if (err) throw err
            article.author_name = result2[0].name
            console.log(result2)
            res.render('article', {article:article})
        })
    })
}

module.exports = { getAllArticles, getArticleBySlug }