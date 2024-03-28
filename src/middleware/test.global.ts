import userStore from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = userStore()
  // console.log('To', to)
  // console.log('From', from)
  // console.log('to path ', to.path, 'to fullPath', to.fullPath)
  // console.log('from path ', from.path, 'from fullPath', from.fullPath)
  // 如果登录成功后，不允许再次访问登录页面，返回到
  if (store.isAuthenticated() && to.fullPath === '/login') {
    return {
      path: '/docs',
    }
  }
})
