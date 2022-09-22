const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const mysql = require("mysql")
const bcrypt = require("bcrypt");
const Routers = require('../Routes/routes')


const app = express();

//middleware
app.use(cookieParser());
app.use(express.static('static'));
app.set('view engine', "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






//app.use(cookieParser())
app.use(session({
    key: "userID",
    secret: "this is my sectet",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 5,
        sameSite: true,




    }



}));



app.use('/', Routers)

app.use("/register", Routers)












app.listen(8000, () => {
    console.log("listening to port 8000")
})