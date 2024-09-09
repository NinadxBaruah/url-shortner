const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/handleUserRegister")
const handleGetUserLinks = require("../controllers/handleGetUserLinks")
const {userLogin , userLoginPage} = require('../controllers/handleUserLogin')
const isAuthenticated = require("../middlewares/isAuthenticated")
const handleAuthCheck = require("../controllers/handleAuthCheck")
router.post("/register", registerUser);
router.get('/login',userLoginPage)
router.post('/login' ,userLogin)
router.post('/get-links',isAuthenticated,handleGetUserLinks)
router.post('/auth/check',isAuthenticated,handleAuthCheck)
module.exports = router;
