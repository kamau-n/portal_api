const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const mysql = require("mysql")
const bcrypt = require("bcrypt");
const login = require('../Routes/login')
const register = require('../Routes/register')
const db = require('../Config/db.config')


const app = express();

//middleware
//app.use(cookieParser());
app.use(express.static('static'));
app.set('view engine', "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//test the database connection

db.authenticate()
    .then(() => { console.log("the connection is successfull") })
    .catch((err) => console.log("there is a problem in the connections" + err.message))





//app.use(cookieParser())
app.use(session({
    key: "userID",
    secret: "this is my secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 5,
        sameSite: true,




    }



}));



app.use('/login', login)

app.use('/register', register)













app.listen(8000, () => {
    console.log("listening to port 8000")
})