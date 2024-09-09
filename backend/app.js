const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors')
const path = require("path");
const cookieParser = require('cookie-parser') 
const passport = require('passport')
require("dotenv").config();


const userModel = require("./model/user");
const db_connect = require("./database/db");
const handleUser = require("./routes/user");
const handleCheckUserApi = require('./routes/CheckUserApi')
const googleAuthRoute = require("./routes/googleAuth") 
const shortUrl = require("./routes/shortUrl")
const app = express();

app.use(cookieParser())
app.use(cors({
  origin: ['http://dev.example.com:4321'], // Allow requests from both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  credentials: true,
}));
app.use(passport.initialize());
db_connect();
app.use(body_parser.json());
app.use(body_parser.text({ type: "text/plain" }));
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname , 'public')))

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", handleUser);
app.use('/api',handleCheckUserApi)
app.use('/auth',googleAuthRoute)
app.use('/short-url',shortUrl)

app.listen(3000);
