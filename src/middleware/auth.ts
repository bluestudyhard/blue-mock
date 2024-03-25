import userStore from '~/stores/user'

const store = userStore()
export default defineNuxtRouteMiddleware((to, from) => {
  // 如果没有登录，跳转到登录页面
  if (!store.isAuthenticated()) {
    return {
      path: '/login',
    }
  }
  
})
