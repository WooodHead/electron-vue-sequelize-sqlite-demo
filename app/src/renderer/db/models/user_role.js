var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var user_role = sequelize.define(
    'user_role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_account: Sequelize.STRING,
        role_code: Sequelize.STRING
    }, {
        underscored: true
    })


module.exports = user_role
