const express = require("express")
const register = express.Router()
    //const conn = require('../Config/database')

const db = require("../Config/db.config")

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const Student = require("../Models/portal.model")
const bcrypt = require("bcrypt")






register.get('/register', (req, res) => {
    res.render("register")

})




register.post('/register', (req, res) => {

    Student.findOne({ where: { email: req.body.email } })
        .then((student) => {
            if (student == null) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    Student.create({
                            Name: req.body.username,
                            email: req.body.email,
                            gender: req.body.gender,
                            county: req.body.county,
                            pass: hash,
                            createdAt: Date.now(),
                            updatedAt: Date.now()


                        })
                        .then(() => {
                            res.json({ message: "Student has been registered Successfull" })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.json({ message: "there has been an error in the creation of the student" + err.message })
                        })
                })




            } else {

                res.json({ message: "The Student Already exists in the database" })

            }
        })
        .catch((err) => console.log("there was an error"))


})










module.exports = register;