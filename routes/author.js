const express = require('express')

const router = express.Router()

const authorController = require('../controllers/author.js')

router.get('/:author_id', authorController.getArticlesByAuthor)

module.exports = router