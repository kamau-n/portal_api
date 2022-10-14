const Sequelize = require("sequelize")
const db = require("../Config/db.config")

const Enrolled = db.define('Enrolled', {
    Unit_id: {
        type: Sequelize.INTEGER
    },
    Student_id: {
        type: Sequelize.INTEGER
    }



})


module.exports = Enrolled