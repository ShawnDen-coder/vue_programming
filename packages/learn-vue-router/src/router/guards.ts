import type { Router } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

const APP_TITLE = 'Learn Vue Router'

async function ensureAuthState() {
  // 教学最小实现：从 localStorage 读取登录态。
  // 生产环境建议替换为 Pinia store 或后端鉴权 API。
  await Promise.resolve()
  return localStorage.getItem('demo-token') === 'logged-in'
}

export function setupRouterGuards(router: Router) {
  // beforeEach: 在每次导航前做准入判断（是否允许访问目标路由）。
  router.beforeEach(async (to: RouteLocationNormalized) => {
    const isLoggedIn = await ensureAuthState()

    // 受保护页面：未登录时跳转到登录页。
    if (to.meta.requiresAuth && !isLoggedIn) {
      // 防止死循环：如果目标已经是登录页，就不要继续重定向。
      if (to.name !== 'login') {
        return {
          // 记录原目标地址，登录成功后可以跳回去。
          name: 'login',
          query: { redirect: to.fullPath },
        }
      }
      return true
    }

    // 游客页：已登录用户不应停留在登录页，直接去控制台。
    if (to.meta.guestOnly && isLoggedIn) {
      return { name: 'dashboard' }
    }

    // 其余场景正常放行。
    return true
  })

  // afterEach: 处理与页面展示相关的副作用（如标题、埋点）。
  router.afterEach((to) => {
    document.title = `${to.meta.title} | ${APP_TITLE}`
  })
}
