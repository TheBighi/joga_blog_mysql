const connection = require('../utils/db.js')

const getArticlesByAuthor = (req, res) => {
    console.log(req)
    let query = `SELECT * FROM article WHERE author_id = ${req.params.author_id}`

    connection.query(query, (err, result) => {
        if (err) throw err
        let articles = result

        let query2 = `SELECT name FROM author WHERE id = '${articles[0].author_id}'`

        connection.query(query2, (err, result2) => {
            if (err) throw err
            let AuthorName = result2[0].name
            console.log(AuthorName)
            res.render('author', {articles:articles, AuthorName:AuthorName})
        })
        
    })
}

module.exports =  { getArticlesByAuthor }