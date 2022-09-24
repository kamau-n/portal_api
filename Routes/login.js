const express = require("express")
const login = express.Router()
    //const conn = require('../Config/database')

const db = require("../Config/db.config")

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const Student = require("../Models/portal.model")
const bcrypt = require("bcrypt")




login.get("/login", (req, res) => {
    res.render("login")


})

login.post('/login', async(req, res) => {
    const student = await Student.findOne({ where: { email: req.body.email } })
    if (student) {


        const verified = await bcrypt.compare(req.body.password, student.pass)
        if (verified) {


            req.session.user = student;
            res.send(req.session)
            z
        } else {
            res.json({ message: " the password is incorrect" })
        }


    } else {
        res.json({ message: "The use provided does no exist" })

    }






})

module.exports = login;