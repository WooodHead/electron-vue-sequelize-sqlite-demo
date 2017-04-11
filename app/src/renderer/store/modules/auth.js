import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    loginAccount: "",
    loginPermission: []
}

// getters
const getters = {
    loginAccount: state => state.loginAccount,
    loginPermission: state => state.loginPermission
}

// actions
const actions = {
    login({
        commit,
        state
    }, info) {
        commit(types.LOGIN, info)
    },
    logout({
        commit,
        state
    }) {
        commit(types.LOGOUT)
    }
}

// mutations
const mutations = {
    [types.LOGIN](state, {
        account,
        permission
    }) {
        state.loginAccount = account
        state.loginPermission = permission
    },
    [types.LOGOUT](state) {
        state.loginAccount = ""
        state.loginPermission = []
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
