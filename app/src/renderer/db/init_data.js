var user = require('./models/user')
var role = require('./models/role')
var permission = require('./models/permission')
var user_role = require('./models/user_role')
var role_permission = require('./models/role_permission')

export default function() {
  return Promise.all([
    user.create({
      account: 'admin',
      password: "admin"
    }),
    role.create({
      code: "admin",
      name: "admin"
    }),
    user_role.create({
      user_account: "admin",
      role_code: "admin"
    }),
    permission.create({
      code: "admin",
      name: "admin"
    }),
    role_permission.create({
      role_code: "admin",
      permission_code: "admin"
    })
  ])
}
