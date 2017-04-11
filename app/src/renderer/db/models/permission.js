var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var permission = sequelize.define(
    'permission', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true },
        code: { type: Sequelize.STRING, primaryKey: true },
        name: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = permission
