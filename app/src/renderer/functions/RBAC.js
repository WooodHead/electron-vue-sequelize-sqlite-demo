module.exports = {
    getUsers(params) {
        var user = require('../db/models/user')

        var filterKey = params.filterKey == undefined ? "" : params.filterKey
        var count = params.count == undefined ? 5 : parseInt(params.count)
        var page = params.page == undefined ? 0 : parseInt(params.page)

        return Promise.all([
            user.findAll({
                where: {
                    account: {
                        $and: {
                            $not: "admin",
                            $like: "%" + filterKey + "%"
                        }
                    }
                },
                offset: page * count,
                limit: count
            }),
            user.count({
                where: {
                    account: {
                        $and: {
                            $not: "admin",
                            $like: "%" + filterKey + "%"
                        }
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    addUser(params) {
        var user = require('../../db/models/user')
        var account = params.account
        if (account) {
            return user.findOne({
                where: {
                    account: account
                }
            }).then(function(result) {
                if (result != null) {
                    return Promise.reject({
                        "code": "error",
                        "msg": 'account already exists'
                    })
                } else {
                    return user.create({
                        account: account,
                        password: "123"
                    })
                }
            })
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'account require'
            })
        }
    },
    resetPassword(params) {
        var user = require('../../db/models/user')
        var account = params.account
        if (account) {
            return user.findOne({
                where: {
                    account: account
                }
            }).then(function(result) {
                if (result == null) {
                    return Promise.reject({
                        "code": "error",
                        "msg": 'account not exists'
                    })
                } else {
                    result.password = "123"
                    return result.save()
                }
            }).then(function(result) {
                return 'success'
            })
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'account require'
            })
        }
    },
    deleteUser(params) {
        var user = require('../../db/models/user')
        var user_role = require('../../db/models/user_role')

        var account = params.account
        if (account && account != "admin") {
            return Promise.all([
                user_role.destroy({
                    where: {
                        user_account: account
                    }
                }),
                user.destroy({
                    where: {
                        account: account
                    }
                })
            ])
        } else {
            return "do nothing"
        }
    },
    getRoles(params) {
        var role = require('../../db/models/role')

        var filterKey = params.filterKey == undefined ? "" : params.filterKey
        var count = params.count == undefined ? 5 : parseInt(params.count)
        var page = params.page == undefined ? 0 : parseInt(params.page)

        return Promise.all([
            role.findAll({
                where: {
                    $and: {
                        code: {
                            $not: "admin"
                        },
                        $or: {
                            code: {
                                $like: "%" + filterKey + "%"
                            },
                            name: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                },
                offset: page * count,
                limit: count
            }),
            role.count({
                where: {
                    $and: {
                        code: {
                            $not: "admin"
                        },
                        $or: {
                            code: {
                                $like: "%" + filterKey + "%"
                            },
                            name: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    submitRole(params) {
        var code = params.code
        var name = params.name ? params.name : ""
        if (code) {
            var role = require('../../db/models/role')
            var user_role = require('../../db/models/user_role')
            var role_permission = require('../../db/models/role_permission')
            return role.upsert({
                code: code,
                name: name
            }).then(function() {
                return Promise.all([
                    user_role.update({
                        role_code: code
                    }, {
                        where: {
                            role_code: code
                        }
                    }),
                    role_permission.update({
                        role_code: code
                    }, {
                        where: {
                            role_code: code
                        }
                    })
                ])
            })
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'role code require'
            })
        }
    },
    deleteRole(params) {
        var role = require('../../db/models/role')
        var user_role = require('../../db/models/user_role')
        var role_permission = require('../../db/models/role_permission')
        var code = params.code
        if (code && code != "admin") {
            return Promise.all([
                user_role.destroy({
                    where: {
                        role_code: code
                    }
                }),
                role.destroy({
                    where: {
                        code: code
                    }
                }),
                role_permission.destroy({
                    where: {
                        role_code: code
                    }
                })
            ])
        } else {
            return "do noting"
        }
    },
    getPermissions(params) {
        var permission = require('../../db/models/permission')

        var filterKey = params.filterKey == undefined ? "" : params.filterKey
        var count = params.count == undefined ? 5 : parseInt(params.count)
        var page = params.page == undefined ? 0 : parseInt(params.page)

        return Promise.all([
            permission.findAll({
                where: {
                    $and: {
                        code: {
                            $not: "admin"
                        },
                        $or: {
                            code: {
                                $like: "%" + filterKey + "%"
                            },
                            name: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                },
                offset: page * count,
                limit: count
            }),
            permission.count({
                where: {
                    $and: {
                        code: {
                            $not: "admin"
                        },
                        $or: {
                            code: {
                                $like: "%" + filterKey + "%"
                            },
                            name: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    submitPermission(params) {
        var code = params.code
        var name = params.name ? params.name : ""
        if (code) {
            var permission = require('../../db/models/permission')
            var role_permission = require('../../db/models/role_permission')
            return permission.upsert({
                code: code,
                name: name
            }).then(function() {
                return role_permission.update({
                    permission_code: code
                }, {
                    where: {
                        permission_code: code
                    }
                })
            })
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'permission code require'
            })
        }
    },
    deletePermission(params) {
        var permission = require('../../db/models/permission')
        var role_permission = require('../../db/models/role_permission')
        var code = params.code
        if (code && code != "admin") {
            return Promise.all([
                permission.destroy({
                    where: {
                        code: code
                    }
                }),
                role_permission.destroy({
                    where: {
                        permission_code: code
                    }
                })
            ])
        } else {
            return "do noting"
        }
    },
    getUserRoles(params) {
        var user_role = require('../../db/models/user_role')
        var role = require('../../db/models/role')
        user_role.belongsTo(role, {
            foreignKey: 'role_code',
            targetKey: 'code',
            constraints: false
        })

        var user = params.user
        var filterKey = params.filterKey == undefined ? "" : params.filterKey
        var count = params.count == undefined ? 5 : parseInt(params.count)
        var page = params.page == undefined ? 0 : parseInt(params.page)

        return Promise.all([
            user_role.findAll({
                include: [{
                    model: role
                }],
                where: {
                    $and: {
                        user_account: {
                            $and: {
                                $not: "admin",
                                $eq: user
                            }
                        },
                        role_code: {
                            $not: "admin"
                        },
                        role_code: {
                            $like: "%" + filterKey + "%"
                        }
                    }
                },
                offset: page * count,
                limit: count
            }),
            user_role.count({
                include: [{
                    model: role
                }],
                where: {
                    $and: {
                        user_account: {
                            $and: {
                                $not: "admin",
                                $eq: user
                            }
                        },
                        role_code: {
                            $not: "admin"
                        },
                        role_code: {
                            $like: "%" + filterKey + "%"
                        }
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    submitUserRole(params) {
        var id = params.id
        var role_code = params.role_code ? params.role_code : ""
        var user_account = params.user_account
        if (role_code) {
            var user_role = require('../../db/models/user_role')
            if (id) {
                return user_role.update({
                    role_code: role_code
                }, {
                    where: {
                        id: id,
                        user_account: user_account
                    }
                })
            } else {
                return user_role.create({
                    user_account: user_account,
                    role_code: role_code
                })
            }
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'role require'
            })
        }
    },
    deleteUserRole(params) {
        var user_role = require('../../db/models/user_role')

        var id = params.id
        if (id) {
            return user_role.destroy({
                where: {
                    id: id
                }
            }).then(function() {
                return "success"
            })
        } else {
            return "do noting"
        }
    },
    getRolePermissions(params) {
        var role_permission = require('../../db/models/role_permission')
        var role = require('../../db/models/role')
        var permission = require('../../db/models/permission')

        role_permission.belongsTo(role, {
            foreignKey: 'role_code',
            targetKey: 'code',
            constraints: false
        })

        role_permission.belongsTo(permission, {
            foreignKey: 'permission_code',
            targetKey: 'code',
            constraints: false
        })
        var role_code = req.query.role
        var filterKey = req.query.filterKey == undefined ? "" : req.query.filterKey
        var count = req.query.count == undefined ? 5 : parseInt(req.query.count)
        var page = req.query.page == undefined ? 0 : parseInt(req.query.page)

        return Promise.all([
            role_permission.findAll({
                include: [role, permission],
                where: {
                    $and: {
                        role_code: {
                            $and: {
                                $not: "admin",
                                $eq: role_code
                            }
                        },
                        permission_code: {
                            $not: "admin"
                        },
                        $or: {
                            permission_code: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                },
                offset: page * count,
                limit: count
            }),
            role_permission.count({
                include: [role, permission],
                where: {
                    $and: {
                        role_code: {
                            $and: {
                                $not: "admin",
                                $eq: role_code
                            }
                        },
                        permission_code: {
                            $not: "admin"
                        },
                        $or: {
                            permission_code: {
                                $like: "%" + filterKey + "%"
                            }
                        }
                    }
                }
            })
        ]).then(function(result) {
            var list = result[0]
            var rowCount = result[1]
            return {
                end: (list.length + page * count) >= rowCount,
                list: list
            }
        })
    },
    submitRolePermission(params) {
        var id = params.id
        var permission_code = params.permission_code ? params.permission_code : ""
        var role_code = params.role_code
        if (permission_code) {
            var role_permission = require('../../db/models/role_permission')
            if (id) {
                return role_permission.update({
                    permission_code: permission_code
                }, {
                    where: {
                        id: id,
                        role_code: role_code
                    }
                })
            } else {
                return role_permission.create({
                    permission_code: permission_code,
                    role_code: role_code
                })
            }
        } else {
            return Promise.reject({
                "code": "error",
                "msg": 'permission require'
            })
        }
    },
    deleteRolePermission(params) {
        var role_permission = require('../../db/models/role_permission')

        var id = params.id
        if (id) {
            return role_permission.destroy({
                where: {
                    id: id
                }
            }).then(function() {
                return "success"
            })
        } else {
            return "do nothing"
        }
    }
}
