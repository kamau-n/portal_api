const conn = require("../Config/database")
const bcrypt = require("bcrypt")


const hashes = (raw) => {
    bcrypt.hash(raw, 10, (err, result) => {
        return (result)
    })

}

const register = (a, b, c, d, e) => {

    conn.query(`insert into Users (Name,email,county,gender,pass Values('${a}',${b}',${c}',${d}',${e}'))`, (err, results) => {
        if (err) {
            return (" there was an error")
            console.log(err.message)
        } else {
            return ("Data successfully inserted into the table")
            console.log("we have successfully inserted data into the table")
        }
    })



}


exports.register = register;
exports.hash = hashes;