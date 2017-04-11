<template>
<div>
  <el-dialog title="用户登录" v-model="showDialog" :show-close="false" :close-on-click-modal="false">
    <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="60px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginInfo.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginInfo.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import auth from '../functions/auth.js'
export default {
  data() {
    return {
      loginInfo: {
        account: "",
        password: ""
      },
      rules: {
        account: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    showDialog() {
      return !this.$store.getters.loginAccount
    }
  },
  methods: {
    submitForm(formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.login()
        } else {
          this.$message.error('error submit!!')
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginStore(info) {
      this.$store.dispatch('login', {
        account: info.account,
        permission: ["admin"]
      })
    },
    login() {
      try {
        auth.login(this.loginInfo).then((result) => {
          this.loginStore({
            account: result.name,
            permission: result.permissions
          })
        }).catch((e) => {
          this.$message.error(e)
        })
      } catch (e) {
        this.$message.error(e)
      } finally {

      }
    }
  }
}
</script>
