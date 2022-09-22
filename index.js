const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kamau"
});

conn.connect(function(err) {
    //if (err) throw err;
    console.log("connection successfull")
})



app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());



app.get("/register", function(req, res) {
    res.render("index")

});

app.post("/refister", function(req, res) {
    // res.send("information saved successfully")
    const person = req.body;
    console.log(person);
    //console.log(name);
    let age = person.age;
    let school = person.school;
    let name = person.username;
    console.log(name, age, school)


    conn.query(sql, function(err, result, fields) {
        if (err) {
            console.log("Some error occurred ", err);
        } else {

            console.log("Successfully inserted into db")
        }
        //res.render("details")


    });

});

app.get('/login', function(req, res) {
    res.render("login")

});


app.post('/login', function(req, res) {
    res.send("information successfully received");



});




app.listen(4000)