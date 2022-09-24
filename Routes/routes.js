const express = require("express")
const router = express.Router()
    //const conn = require('../Config/database')

const db = require("../Config/db.config")

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const Student = require("../Models/portal.model")
const bcrypt = require("bcrypt")




router.get("/all", (req, res) => {
    Student.findAll()
        .then((students) => {
            console.log(students)
            res.send(students)
        })
        .catch((err) => {
            console.log("there is an error" + err.message)
            res.sendStatus(404)
        })

})





router.get("/login", (req, res) => {
    res.render("login")


})

router.post('/login', async(req, res) => {
    console.log(req.body)
    const student = await Student.findOne({ where: { email: req.body.email } })
    if (student) {


        const verified = await bcrypt.compare(req.body.password, student.pass)
        if (verified) {


            req.session.user = student;
            res.send(req.session)

        } else {
            res.json({ message: " the password is incorrect" })
        }


    } else {
        res.json({ message: "The use provided does no exist" })

    }






})


// This is a delete request

router.delete("/student", (req, res) => {
    Student.destroy({ where: { id: req.body.id } })
        .then((success) => {
            console.log("Sucessfully deleted")
            res.json({ message: "The student data has been successfully deleted" })
        })
        .catch((err) => res.json({ message: "There was an error in the deletion of the data" }))


})

// this is an update the student password


router.post('/reset', (req, res) => {
    Student.findOne({ where: { email: req.body.email } })
        .then((student) => {
            if (student != null) {
                console.log(student.email)
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log(hash)
                    Student.update({ pass: hash }, { where: { email: req.body.email } })
                        .then((response) => {
                            console.log(hash)
                            res.json({ message: "The Students Password has been updated sucessfullly" })
                            console.log("student data updated suceessfully")


                        })
                        .catch((err) => {
                            console.log("there was an error" + err.message)

                        })

                })
            } else {
                res.json({ message: "The student does not exist" })
                console.log("The student does not exist")

            }

        })


})








module.exports = router;