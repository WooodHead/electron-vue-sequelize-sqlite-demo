var Sequelize = require('sequelize')
export default function() {
  return Promise.all([
    require('./models/weight'),
    require('./models/weight_extended')
  ].map((o) => o.sync({
    force: true
  }))).then(() => {

  }).then(() => {
    console.log('OK')
  })
}
