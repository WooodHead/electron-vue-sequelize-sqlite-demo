var exec = {
  login(params) {
    try {
      var account = params.account
      var password = params.password

      var user = require('../db/models/user')

      return user.findOne({
        attributes: ['account', 'password'],
        where: {
          account: account
        }
      }).then(function(result) {
        if (result == null) {
          return Promise.reject("account not exists")
        } else {
          if (result.password != password) {
            return Promise.reject("password incorrect")
          } else {
            var user_role = require('../db/models/user_role')
            var role_permission = require('../db/models/role_permission')

            role_permission.belongsTo(user_role, {
              foreignKey: 'role_code',
              targetKey: 'role_code',
              constraints: false
            })
            return role_permission.findAll({
              include: [{
                model: user_role,
                where: {
                  user_account: result.account
                }
              }]
            })
          }
        }
      }).then(function(result) {
        if (result != null) {
          var userInfo = {}
          userInfo.name = account
          userInfo.permissions = result.map(o => o.permission_code)
          return userInfo
        }
      })
    } catch (e) {
      return Promise.reject(e.message)
    } finally {

    }

  },
  logout(params) {},
  getUser(params) {},
  changePassword(params) {
    var userInfo = params.userInfo
    if (userInfo) {
      var user = require('../db/models/user')
      return user.findOne({
        where: {
          account: userInfo.name,
          password: params.password
        }
      }).then((result) => {
        if (result == null) {
          return Promise.reject("account or password incorrect")
        } else {
          result.password = params.newPassword
          return result.save()
        }
      })
    } else {
      return Promise.reject("not login")
    }
  }
}
export default exec
