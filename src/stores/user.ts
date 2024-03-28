import { _login, _register } from '~/service/userService'
import type { loginWithToken, tokenType, user, userDisplay, userRegister, userResponse, userWithToken } from '~/types'

const userStore = defineStore('user', {
  state: () => ({
    token: '' as tokenType,
    userInfo: {} as userDisplay,
    authenticated: false,
    logoutTimer: null as NodeJS.Timeout | null,
  }),
  actions: {

    async register(data: userRegister) {
      const res = await _register(data) as userResponse
      // console.log(res.data.token)
      this.token = res.data.token
      // console.log(this.token)
      this.userInfo = res.data.user
      this.authenticated = true
      return res
    },
    async login(data: loginWithToken) {
      // console.log(this.token)
      data.token = this.token as string
      const res = await _login(data) as userResponse
      this.token = res.data.token
      this.authenticated = true
      this.userInfo = res.data.user
      this.logoutTimer = setTimeout(() => {
        this.logout()
      }, 1000 * 60 * 60 * 24 * 2)
      return res
    },
    async logout() {
      this.$reset()
      localStorage.removeItem('token')
      navigateTo('/login')
    },
    // 得到token
    getToken() {
      return this.token
    },
    // 得到用户信息
    getUserInfo() {
      return this.userInfo
    },
    // 是否已经登录
    isAuthenticated() {
      if (this.token !== '' && this.authenticated)
        return true
      return false
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
export default userStore
