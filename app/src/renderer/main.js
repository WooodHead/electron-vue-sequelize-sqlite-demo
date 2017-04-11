import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(ElementUI)
Vue.config.debug = true
//test
const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

require('./style/style.css')



Promise.resolve().then(() => {
  var fs = require('fs')
  if (!fs.existsSync("db")) {
    fs.mkdirSync("db")
    return Promise.all([
      require('./db/init').default(),
      require('./db/init_app').default()
    ])
  }
}).then(() => {
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    ...App
  }).$mount('#app')
})
