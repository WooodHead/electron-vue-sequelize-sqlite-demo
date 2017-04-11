var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var role_permission = sequelize.define(
    'role_permission', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        role_code: Sequelize.STRING,
        permission_code: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = role_permission
