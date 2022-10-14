const Sequelize = require("sequelize")
const db = require("../Config/db.config")


const Unit = db.define('Units', {
    Name: {
        type: Sequelize.STRING
    },

    Moderator: {
        type: Sequelize.STRING
    },

    Fee: {
        type: Sequelize.INTEGER
    },


})

module.exports = Unit