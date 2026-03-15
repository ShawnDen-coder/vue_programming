# learn-vue-router

一个用于演示 Vue Router 工程化实践的最小项目。  
目标不是做复杂 UI，而是把项目里最常见、最实用的路由结构和套路展示清楚。

## 1. 项目目标

- 使用 Vue 3 + TypeScript + Vite + Vue Router 4。
- 演示路由分层（定义、安装、守卫分离）。
- 演示 meta 驱动的鉴权与游客页面限制。
- 演示动态参数路由与同路由参数变化处理。
- 演示 404 兜底与基础导航体验（scrollBehavior、页面标题）。

## 2. 快速启动

在 workspace 根目录执行：

```bash
pnpm --filter learn-vue-router dev
```

构建验证：

```bash
pnpm --filter learn-vue-router build
```

## 3. 核心路由流程

1. 进入受保护页面（如 `/dashboard`）时，`beforeEach` 检查登录态。
2. 未登录则跳转到 `/login`，并附带 `redirect=原目标地址`。
3. 登录页成功后读取 `redirect`，再 `replace` 回原目标页。
4. 每次导航后由 `afterEach` 统一更新页面标题。

## 4. 目录结构

```text
learn-vue-router/
	src/
		main.ts
		App.vue
		style.css
		router/
			index.ts
			router.ts
			guards.ts
			route-meta.d.ts
		pages/
			HomePage.vue
			ArticlePage.vue
			LoginPage.vue
			DashboardPage.vue
			NotFoundPage.vue
```

## 5. 每个关键文件的作用

### 5.1 入口与应用壳

- `src/main.ts`  
  创建应用实例并统一安装路由（`setupRouter(app)`）。

- `src/App.vue`  
  应用壳组件：提供基础导航和 `<RouterView />` 渲染出口。

- `src/style.css`  
  全局基础样式，保持简洁，不和路由逻辑耦合。

### 5.2 路由层

- `src/router/router.ts`  
  只负责路由定义：`routes`、`history`、`scrollBehavior`。  
  这里包含首页、动态参数页、登录页、受保护页、404 页。

- `src/router/guards.ts`  
  只负责全局守卫：`beforeEach` 与 `afterEach`。  
  这里实现了：
  - `meta.requiresAuth`：未登录拦截
  - `meta.guestOnly`：已登录禁止访问游客页
  - 防重定向死循环
  - 页面标题更新
  - auth facade 结构（便于从 demo 迁移到 Pinia）

- `src/router/index.ts`  
  路由安装入口，负责把“守卫注册”和“app.use(router)”串起来。

- `src/router/route-meta.d.ts`  
  RouteMeta 类型扩展，统一声明 `title`、`requiresAuth`、`guestOnly`。

### 5.3 页面层

- `src/pages/HomePage.vue`  
  示例导航入口，集中展示可访问的路由场景。

- `src/pages/ArticlePage.vue`  
  动态参数页面（`/articles/:slug`），演示：
  - `props: true` 参数传递
  - `watch(..., { immediate: true })`
  - `onBeforeRouteUpdate` 处理同路由参数变化

- `src/pages/LoginPage.vue`  
  登录示例页，使用 `query.redirect` 回跳到原目标路由。

- `src/pages/DashboardPage.vue`  
  受保护页面，未登录不能直接访问。

- `src/pages/NotFoundPage.vue`  
  404 兜底页面。

## 6. guards 中 Pinia Auth 伪代码

本项目当前默认使用 localStorage 的可运行 demo 实现。  
如果迁移到工程实践，推荐在守卫中通过 Pinia store 读取登录态：

```ts
// guards.ts 里的伪代码思路
const authStore = useAuthStore()

await authStore.ensureSession()

if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  return {
    name: 'login',
    query: { redirect: to.fullPath },
  }
}

if (to.meta.guestOnly && authStore.isAuthenticated) {
  return { name: 'dashboard' }
}
```

建议分工：

- Pinia：持有认证状态、用户信息、登录/登出、会话恢复。
- Router Guards：只做准入控制和重定向，不直接管理业务状态。

## 7. 这个项目里的工程化路由实践经验

1. 路由分层优先  
   把“路由定义”和“守卫逻辑”分文件，避免一个文件承担全部职责。

2. 使用 meta 做规则配置，而不是写死 path 判断  
   如 `requiresAuth`、`guestOnly`，规则更易维护和扩展。

3. 守卫使用 return 风格（Vue Router 4 推荐）  
   不依赖 `next()`，可以减少漏调、重复调用等问题。

4. 所有鉴权守卫都要考虑重定向循环  
   重定向前先判断目标是否已经是登录页。

5. 动态参数页面不要只依赖 mounted  
   同一路由切参数时组件会复用，建议用 `watch` 或 `onBeforeRouteUpdate`。

6. 路由命名要统一且稳定  
   业务中优先用 `name + params/query` 跳转，减少硬编码路径。

7. 一定要有 404 兜底路由  
   防止线上错误链接直接白屏。

8. 标题、滚动行为统一在路由层处理  
   这些属于全局导航体验，不应散落在页面组件里。

## 8. 可继续扩展的方向

- 按业务模块拆分路由：`auth.routes.ts`、`content.routes.ts`、`admin.routes.ts`。
- 增加角色权限（`meta.roles`）和按钮级权限控制。
- 增加路由级数据预取与错误边界处理。
- 增加埋点（`afterEach`）统计真实页面访问路径。

## 9. 说明

当前鉴权状态使用 `localStorage` 中的 `demo-token` 模拟，仅用于教学示例。  
生产项目请接入真实鉴权服务与安全策略。
