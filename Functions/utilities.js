const conn = require("../Config/database")
const bcrypt = require("bcrypt")


const hashes = (raw) => {
    bcrypt.hash(raw, 10, (err, result) => {
        return (result)
    })

}

const register = (a, b, c, d, e) => {

    conn.query(`Insert into Users (Name,email,county,gender,pass) values(?,?,?,?,?)`, a, b, c, d, hashes(e), (err, result) => {
        console.log(result)
    })

}

module.exports = { register }