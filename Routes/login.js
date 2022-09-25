const express = require("express")
const login = express.Router()
    //const conn = require('../Config/database')

const db = require("../Config/db.config")

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const Student = require("../Models/portal.model")
const bcrypt = require("bcrypt")





module.exports = login;