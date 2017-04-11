var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var user = sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true
        },
        account: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = user
