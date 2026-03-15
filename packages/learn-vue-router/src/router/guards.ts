import type { Router } from 'vue-router'

const APP_TITLE = 'Learn Vue Router'

interface AuthFacade {
  ensureAuthState: () => Promise<boolean>
}

function createDemoAuthFacade(): AuthFacade {
  function readAuthStatus() {
    // 这里是教学用最小实现：从 localStorage 读取登录态。
    return localStorage.getItem('demo-token') === 'logged-in'
  }

  return {
    async ensureAuthState() {
      // 用异步函数模拟真实项目中的鉴权 API 校验。
      await Promise.resolve()
      return readAuthStatus()
    },
  }
}

function getAuthFacade(): AuthFacade {
  // 推荐工程实践：把登录态放在 Pinia，路由守卫只消费状态并做准入控制。
  // 下面是 Pinia 伪代码（示例，不在本教学项目直接执行）：
  //
  // const authStore = useAuthStore()
  // await authStore.ensureSession()
  // return {
  //   ensureAuthState: async () => authStore.isAuthenticated,
  // }
  //
  // 当前教学项目仍返回可运行的本地实现，方便开箱演示。
  return createDemoAuthFacade()
}

export function setupRouterGuards(router: Router) {
  const auth = getAuthFacade()

  // beforeEach: 在每次导航前做准入判断（是否允许访问目标路由）。
  router.beforeEach(async (to) => {
    const isLoggedIn = await auth.ensureAuthState()

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
