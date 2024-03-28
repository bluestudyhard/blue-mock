import userStore from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  // 如果没有登录，跳转到登录页面
  const store = userStore()
  console.log(store.isAuthenticated())
  if (!store.isAuthenticated()) {
    return {
      path: '/login',
    }
  }
})
