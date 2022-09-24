const Sequelize = require("sequelize");
module.exports = new Sequelize("kamau", "root", "", {

    host: "localhost",
    dialect: "mysql",
    operationsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})