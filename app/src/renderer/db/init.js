var Sequelize = require('sequelize')

export default function() {
  return Promise.all([
    require('./models/user'),
    require('./models/role'),
    require('./models/permission'),
    require('./models/user_role'),
    require('./models/role_permission'),
    require('./models/attachment'),
    require('./models/file')
  ].map((o) => o.sync({
    force: true
  }))).then(function() {
    return require('./init_data').default()
  }).then(function() {
    console.log("ok")
  }).catch(function(err) {
    console.log(err)
  })
}
