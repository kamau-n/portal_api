const Sequelize = require("sequelize")
const db = require("../Config/db.config")

const Student = db.define('Users', {

    Name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },

    county: {
        type: Sequelize.STRING
    },

    gender: {
        type: Sequelize.STRING
    },

    pass: {
        type: Sequelize.STRING
    },



})

module.exports = Student;