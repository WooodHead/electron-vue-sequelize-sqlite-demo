var Sequelize = require('sequelize')
var sequelize = require('../sequelize')

var weight = sequelize.define(
  'weight', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gross_weight: Sequelize.DECIMAL(10, 2),
    tare: Sequelize.DECIMAL(10, 2),
    status: Sequelize.STRING
  }, {
    underscored: true
  })

module.exports = weight
