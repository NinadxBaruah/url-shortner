const express = require('express')
const router = express.Router()
const handleCheckUserApi = require("../controllers/HandleCheckUserApi")

router.post('/check-username' , handleCheckUserApi)



module.exports = router