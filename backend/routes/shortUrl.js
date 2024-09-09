const express = require('express')
const handleSubmitUrl = require('../controllers/handleSubmitUrl')
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const handleUrlRedirect = require("../controllers/handleUrlRedirect")
const handleShortUrlDelete = require("../controllers/handleShortUrlDelete")


router.post('/submit',isAuthenticated , handleSubmitUrl)


router.get('/:shortUrlId',handleUrlRedirect)

router.post('/delete/:shortUrlId',isAuthenticated, handleShortUrlDelete)

module.exports = router