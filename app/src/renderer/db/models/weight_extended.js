var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var weight_extended = sequelize.define(
    'weight_extended', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        key: {
            type: Sequelize.STRING,
            unique: true
        },
        value: Sequelize.STRING,
        weight_id: Sequelize.INTEGER
    }, {
        underscored: true
    })


module.exports = weight_extended
