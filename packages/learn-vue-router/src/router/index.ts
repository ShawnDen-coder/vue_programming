import type { App } from 'vue'

import { setupRouterGuards } from './guards'
import { router } from './router'

export { router }

export function setupRouter(app: App) {
  setupRouterGuards(router)
  app.use(router)
}
