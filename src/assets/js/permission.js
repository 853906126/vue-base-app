import router from '@/router'
import store from '@/store'
import watermark from './watermark'

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  store.dispatch('app/clearReqToken')

  const hasToken = sessionStorage.getItem('token')
  const hasGetUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  if (hasToken) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (!hasGetUserInfo) {
        await store.dispatch('app/getRoleInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((to, from) => {
  if (to && from && !whiteList.includes(to.path)) {
    const userInfo = store.getters.userInfo
    if (userInfo) {
      watermark.set(`${userInfo.sysUserCode}_${userInfo.staff?.staffName}`)
    }
  }
})
