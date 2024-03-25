import userStore from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = userStore()
  // 如果登录成功后，不允许再次访问登录页面，返回到当前页面
  console.log(to.path, from.path)
  if (to.path === '/login' && store.isAuthenticated()) {
    return {
      path: '/docs',
    }
  }
})
