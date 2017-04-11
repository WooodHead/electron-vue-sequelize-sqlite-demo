var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var role = sequelize.define(
    'role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true
        },
        code: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = role
