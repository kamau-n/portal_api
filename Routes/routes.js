const express = require("express")
const login = express.Router()
    //const conn = require('../Config/database')

const Student = require("../Models/portal.model")




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



module.exports = router;