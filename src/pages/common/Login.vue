// 登录
<template>
  <div class="tm-login-page">
    <!-- <div class="logo"><img src="/static/img/logo.png" /></div> -->
    <div class="login-form">
      <div class="top">
        后台管理系统
        <span class="bg1"></span>
        <span class="bg2"></span>
      </div>
      <el-form
        :model="condition"
        :show-message="$store.state.showMessage"
        :rules="rules"
        class="bottom"
        ref="form"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="condition.username"
            placeholder="请输入员工账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="condition.password"
            show-password
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="bottom-box">
          <el-checkbox v-model="condition.isRemember">两周内自动登录</el-checkbox>
          <!-- <router-link :to="{name:$RouterURL.forgetPassword.name}">忘记密码？</router-link> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEvent">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* eslint-disable camelcase */
import tmCommon from '@/common/common'
import { Constants } from '@/common/env'
// eslint-disable-next-line no-undef
const { mapActions, mapMutations, mapGetters } = Vuex
export default {
  name: 'tm-login-page',
  data () {
    return {
      condition: {
        username: '',
        password: '',
        isRemember: false
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters()
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'setUserInfo',
      setAdminMenuData: 'admin/setMenuData',
      setBusinessesMenuData: 'businesses/setMenuData'
    }),
    ...mapActions({
      loginIndexAction: 'loginIndex',
      sysmenuListAction: 'sysmenuList'
    }),
    submitEvent () {
      this.$refs.form.validate((valid, msg) => {
        if (valid) {
          this.loginIndexFunc()
        } else {
          if (msg) {
            for (const key in msg) {
              const item = msg[key]
              const message = item[0].message
              message && this.$$msgError(message)
              return false
            }
          }
          return false
        }
      })
    },
    loginIndexFunc () {
      const { condition } = this
      const { username = '', password = '', isRemember = false } = condition
      this.loginIndexAction({ user_name: username, user_password: password })
        .then(({ data }) => {
          const { code = '', result = {}, message = '' } = data || {}
          if (code === Constants.CODES.SUCCESS) {
            const { token = '', user_info: userInfo = {} } = result || {}
            const { type = '', hotel_ids = '' } = userInfo || {}
            const hotelIds =
                hotel_ids === -1 ? [hotel_ids] : hotel_ids.split(',') || []
            const hotel_id = hotelIds[0] || ''
            console.log('默认第一个', hotel_id) // 默认第一个
            this.setUserInfo({ ...userInfo, token, hotel_id, isRemember })
            // if (type === 'platform') {
            //   this.$jumpPage(this.$RouterURL.adminIndex.name)
            // } else {
            //   this.$jumpPage(this.$RouterURL.realTime.name)
            // }
            this.sysmenuListFunc(type, (menuList = []) => {
              const [menu = {}] = menuList || []
              const { path_name: pathName = '' } = menu || {}
              this.$jumpPage(pathName)
            })
          } else {
            this.$$msgError(message || '登录失败')
          }
        })
        .catch((err) => {
          tmCommon.error('[Login][loginIndexAction]', err)
        })
    },
    setMenuData (type = '', value = []) {
      if (type === 'platform') {
        this.setAdminMenuData(value || [])
      } else {
        this.setBusinessesMenuData(value || [])
      }
    },
    sysmenuListFunc (type, callback) {
      let value = []
      this.sysmenuListAction({ type })
        .then(({ data }) => {
          const { code = '', result = [] } = data || {}
          if (code === Constants.CODES.SUCCESS) {
            value = tmCommon.recursiveTree(result || [], 'top_id')
            value.sort((a, b) => {
              return Number(a.by_sort || 0) - Number(b.by_sort || 0)
            })
          }
          this.setMenuData(type, value || [])
          callback && callback(value || [])
        })
        .catch((err) => {
          this.setMenuData(type, value || [])
          callback && callback(value || [])
          tmCommon.error('[menu][setting][sysmenuListFunc]', err)
        })
    }
  }
}
</script>
<style lang="less">
  @import "../../assets/less/pages/common/login.less";
</style>
