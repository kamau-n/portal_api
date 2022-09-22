const express = require("express")
const router = express.Router()
const conn = require('../Config/database')

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')

const register = require("../Functions/Functions")




router.get('/register', (req, res) => {
    res.render("register")

})

router.post("/register", (req, res) => {
    // checking is email is availabl
    conn.query('Select * from Users where email=?', req.body.email, (err, result, fields) => {
        if (err) {
            console.log(req.body.email)
            res.send("there was an error in connecting to the database" + err.message)
        } else if (result.length > 0) {
            res.send(" the use already exist in the portal")
        } else {
            register(req.body.username, req.body.email, req.body.county, req.body.gender, req.body.password)


        }


    })




})



module.exports = router;