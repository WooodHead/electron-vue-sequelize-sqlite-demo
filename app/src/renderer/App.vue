<template>
<div id="app">
  <div class="fixed-header">
    <el-menu :router="true" mode="horizontal" default-active="/">
      <el-menu-item index="/">称重</el-menu-item>
      <el-menu-item index="/setting">设置</el-menu-item>
    </el-menu>
  </div>
  <permission>
    <div class="main-content">
      <keep-alive include="Main">
        <router-view></router-view>
      </keep-alive>
    </div>
  </permission>
  <login></login>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import permission from "./components/Permission"
import login from "./components/Login"


export default {
  components: {
    permission,
    login
  },
  computed: {
    ...mapGetters({
      loginAccount: "loginAccount"
    })
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

#app {
  height: 100%
}

.main-content {
  padding: 65px 5px 5px 5px;
}
</style>
